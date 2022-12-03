import { ThemeProvider } from '@rneui/themed';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import InitContainer from './app/common/components/InitContainer';
import { store } from './app/common/store';

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <SafeAreaProvider>
                    <ThemeProvider>
                        <StatusBar hidden={true} />
                        <InitContainer />
                    </ThemeProvider>
                </SafeAreaProvider>
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
