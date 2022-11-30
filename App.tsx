import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import InitContainer from './app/common/components/InitContainer';
import { store } from './app/common/store';

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <StatusBar hidden={true} />
                <InitContainer />
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
