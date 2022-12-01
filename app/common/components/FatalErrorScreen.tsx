import React from 'react';
import { Image, View } from 'react-native';

const FatalErrorScreen: React.FC = () => {
    return (
        <View>
            <Image source={require('../../resources/img/sad_panda.png')} />
        </View>
    );
};

export default FatalErrorScreen;
