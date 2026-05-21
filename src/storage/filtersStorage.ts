import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropertyType } from '../components/IdealSpaceFilters';

export type Filters = {
    // Filtro local
    locationCoords: {latitude: number, longitude: number} | null;
    distance: number | null;
    // Filtros ideal space
    minPrice: number | null;
    maxPrice: number | null;
    bedrooms: PropertyType[] | null;
    elevator: boolean | null;
    garage: boolean | null;
    swimmingPool: boolean | null;
    furnished: boolean | null;

    // Filtros pessoais
    petPolicy: boolean | null;
    smokePolicy: boolean | null;
    newGender: string | null;
    housemates: string | null;
};

const STORAGE_KEY = '@housely:filters';


const readFilters = async (): Promise<Filters | null> => {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error('Error reading liked properties:', error);
        return null;
    };
};

const writeFilters = async (filters: Filters) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
        console.error('Error writing filters:', error);
    }
};

export const getFilters = (): Promise<Filters | null> => readFilters();
export const saveFilters = (filters: Filters) => writeFilters(filters);
export const clearFilters = () => AsyncStorage.removeItem(STORAGE_KEY);
