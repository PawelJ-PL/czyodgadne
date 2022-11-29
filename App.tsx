import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import InitContainer from './app/common/components/InitContainer';
import { store } from './app/common/store';

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaView>
                <StatusBar hidden={true} />
                <InitContainer />
            </SafeAreaView>
        </Provider>
    );
};

export default App;
