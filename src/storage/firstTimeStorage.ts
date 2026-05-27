import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@housely:first_time';

const readFirstTime = async (): Promise<boolean | null> => {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        return raw === null ? true : raw === 'true';
    } catch (error) {
        console.error('Error reading first time:', error);
        return null;
    };
};

const writeFiirstTime = async (isFirstTime: boolean) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, isFirstTime.toString());
    } catch (error) {
        console.error('Error writing filters:', error);
    }
};

export const getFirstTime = (): Promise<boolean | null> => readFirstTime();
export const setFirstTime = (isFirstTime: boolean) => writeFiirstTime(isFirstTime);