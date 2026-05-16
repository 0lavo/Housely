// src/storage/likedStorage.ts

/*  
Este arquivo usa o AsyncStorage para guardar os imóveis que o usuário "curtiu". 
Ele funciona como um MAP com chave e valor,
onde o valor vai ser o array LikedProperty[] e a chave é a string STORAGE_KEY 
As casas curtidas continuam mesmo depois de parar o APP
*/


import AsyncStorage from '@react-native-async-storage/async-storage';



export type LikedProperty = {
  propertyCode: string;   // id
  image: string;
  province: string;
  municipality: string;
  address: string;
  rooms: number;
  bathrooms: number;
  size: number;
  price: number;
  description:string;
  url: string;
};

// Prefixo @housely: evita colisões se outra lib usar a mesma key.
const STORAGE_KEY = '@housely:liked';

// Funcoes internas para ler e escrever os liked properties no AsyncStorage. Como se fosse get and set privados

const readLiked = async (): Promise<LikedProperty[]> => {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error('Error reading liked properties:', error);
        return [];
    };
};

const writeLiked = async (liked: LikedProperty[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(liked));
    } catch (error) {
        console.error('Error writing liked properties:', error);
    };
};


// Retorna todas as casas curtidas em um array
export const getLiked = (): Promise<LikedProperty[]> => readLiked();

// Adiciona uma casa nas curtidas
export const addLiked = async (property : LikedProperty): Promise<void> => {
    const current = await readLiked();
    const allready = current.some(p => p.propertyCode === property.propertyCode);
    if (allready) return; // Retornar caso ja tenha curtido

    await writeLiked([...current, property]);
}

// Remove uma casa nas curtidas
export const removedLiked = async (propertyCode: string): Promise<void> => {
    const current = await readLiked();
    await writeLiked(current.filter(p => p.propertyCode !== propertyCode));
}

// Limpa todas as curtidas
export const clearLiked = async (): Promise<void> => AsyncStorage.removeItem(STORAGE_KEY);

