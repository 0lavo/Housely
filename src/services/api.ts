import { Filters } from '../storage/filtersStorage';
import { PropertyType } from '../components/IdealSpaceFilters';
import { DATABASE_URL } from '../config/env';
import { Property } from '../utils/filterProperties';

//Funcoes para deixar os filtros como os parametros da API
const cityToLocationId: Record<string, string> = {
    Aveiro: '0-EU-PT-13',  // <-- substituir
    Porto:  '0-EU-PT-13',
    Lisboa: '0-EU-PT-13',  // <-- substituir
};

const bedroomsToString = (types: PropertyType[] | null): string | null => {
    if (!types || types.length === 0) return null;

    const nums = types
        .map(type => {
        
            if (type === 'T0/Studio') return 0;
            if (type === 'T1') return 1;
            if (type === 'T2') return 2;
            if (type === 'T3') return 3;
            return null;
        })
        .filter((n) => n !== null);
    return nums.length ? nums.join(',') : null;
};

const genderToApi = (gender : string | null): string | null => {
    if (gender === 'Masculino') return 'male';
    if (gender === 'Feminino') return 'female';
    return null;
};



export const buildApiParams = (
    filters: Filters,
) : Record<string, string> | null => {
    
    const locationId = filters.locationString ? cityToLocationId[filters.locationString] : null;
    if (!locationId) return null;

    const params: Record<string, string> = {
        location_id: locationId,
        property_type: 'homes', //Aqui da pra colocar quartos
        max_items: '50',
        page: '1',
    };

    if (filters.minPrice !== null) params.min_price = String(filters.minPrice);
    if (filters.maxPrice !== null) params.max_price = String(filters.maxPrice);

    const beedroomsStr = bedroomsToString(filters.bedrooms);
    if (beedroomsStr) params.bedrooms = beedroomsStr;

    if (filters.elevator) params.elevator = 'true';
    if (filters.garage) params.garage = 'true';
    if (filters.swimmingPool) params.swimming_pool = 'true';

    if (filters.furnished) params.furnished = 'furnished';
    if (filters.smokePolicy === true) params.smoking_policy = 'allowed';
    if (filters.smokePolicy === false) params.smoking_policy = 'disallowed';
    if (filters.petPolicy != null) params.pets_policy = String(filters.petPolicy);

    const gender = genderToApi(filters.newGender);
    if (gender) params.new_gender = gender;

    if (filters.housemates) params.housemates = filters.housemates;

    return params;
};

// Aqui a onde realmente faz a chamada a API, usando os parametros construidos acima

const TIMEOUT_MS = 5000; // 5 segundos

export const fetchProperties = async (
    params: Record<string, string>
) : Promise<Property[]> => {
    const qs = new URLSearchParams(params).toString();
    const url = `${DATABASE_URL}/properties?${qs}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`API status: ${res.status}`);

        const json = await res.json();

        return json as Property[];
    } finally {
        clearTimeout(timer);
    }
};