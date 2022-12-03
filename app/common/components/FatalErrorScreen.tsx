import { CheckBox } from '@rneui/themed';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
    error: Error;
};

const FatalErrorScreen: React.FC<Props> = ({ error }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View>
            <Image source={require('../../resources/img/sad_panda.png')} />
            <Text style={styles.header}>Coś się nie udało</Text>
            <View>
                <CheckBox
                    title="Pokaż szczegóły"
                    checked={showDetails}
                    containerStyle={styles.checkboxContainer}
                    onPress={() => setShowDetails((prev) => !prev)}
                />
                {showDetails && <Text style={styles.errorMessage}>{error.message}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginVertical: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E53E3E',
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
    },
    errorMessage: {
        marginTop: 10,
        marginLeft: 25,
    },
});

export default FatalErrorScreen;
