import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const FullScreenLoader: React.FC = () => {
    const [rotateAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        startAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(rotateAnimation, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            }),
        ).start();
    };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [
            {
                rotate: interpolateRotating,
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Animated.View>
                <Animated.Image
                    source={require('../../resources/img/question_mark.png')}
                    style={{ ...styles.animatedImageStyle, ...animatedStyle }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    animatedImageStyle: {
        height: 100,
        width: 40,
    },
});

export default FullScreenLoader;
