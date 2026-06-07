import { Filters, getFilters } from '../storage/filtersStorage';
import portoProperties from '../../data/portoProperties.json';
import lisboaProperties from '../../data/lisboaProperties.json';
import aveiroProperties from '../../data/aveiroProperties.json';
import { PropertyType } from '../components/IdealSpaceFilters';
import {MIN_BUDGET, MAX_BUDGET} from '../components/IdealSpaceFilters';
import { buildApiParams, fetchProperties } from '../services/api';


export type Property = typeof portoProperties[number];

export const filterProperties = async (): Promise<Property[]>  => {
    const filters = await getFilters();

    const properties = selectPropertiesByCity(filters?.locationString ?? 'Porto');
    if (!filters) return properties;
    

    const params = buildApiParams(filters);

    if (params) {
        try {
          const apiRes = await fetchProperties(params);
            
            
            if (filters.locationCoords && filters.distance != null) {
                return apiRes.filter((property: Property) => {
                    const d = haversineKm(
                        filters.locationCoords!,
                        { latitude: property.latitude, longitude: property.longitude }
                    );
                    return d <= filters.distance!;
                });
            };
            

            return apiRes;
        } catch {
            return properties.filter(property => filtering(property, filters));
        };
    };


    return properties.filter(property => filtering(property, filters));
}

const selectPropertiesByCity = (city: string): Property[] => {
    if (city === 'Lisboa') return lisboaProperties;
    if (city === 'Aveiro') return aveiroProperties;

    return portoProperties;
}

const filtering = (property: Property, filters: Filters): boolean => {
    
    if (property.price < (filters.minPrice ?? MIN_BUDGET) || property.price > (filters.maxPrice ?? MAX_BUDGET)) return false;
    if (filters.elevator === true && !property.hasLift) return false;
    if (filters.garage === true && !property.parkingSpace?.hasParkingSpace) return false;    

    if (filters.bedrooms && filters.bedrooms.length > 0) {
        const ok = filters.bedrooms.some(t => roomsFromType(t) === property.rooms);
        if (!ok) return false;
    };

    if (filters.locationCoords && filters.distance != null) {
        const d = haversineKm(filters.locationCoords, { latitude: property.latitude, longitude: property.longitude });
        if (d > filters.distance) return false;
    };

    return true;
};

const haversineKm = (
    a: { latitude: number; longitude: number },
    b: { latitude: number; longitude: number },
) => {
    const R = 6371; // raio da Terra em km
    const toRad = (d: number) => (d * Math.PI) / 180;

    const dLat = toRad(b.latitude - a.latitude);
    const dLon = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);

    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    return 2 * R * Math.asin(Math.sqrt(h));
};

const roomsFromType = (t: PropertyType) => {
    if (t === 'T0/Studio') return 0;
    if (t === 'T1') return 1;
    if (t === 'T2') return 2;
    if (t === 'T3') return 3;
    return null;
};