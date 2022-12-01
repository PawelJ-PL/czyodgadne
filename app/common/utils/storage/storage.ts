import AsyncStorage from '@react-native-async-storage/async-storage';
import { ZodType } from 'zod';

export const getItem = async <T>(key: string, schema: ZodType<T>): Promise<T | null> => {
    const result = await AsyncStorage.getItem(key);
    if (result === null) {
        return null;
    }
    const json = JSON.parse(result);
    return schema.parse(json);
};

export const setItem = async <T>(key: string, value: T) => {
    const stringified = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringified);
};

export const removeItem = async (key: string) => {
    await AsyncStorage.removeItem(key);
};
