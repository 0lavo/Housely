import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Este código cria uma função chamada getCurrentLocation() que
// pede permissão de localização no Android;
// obtém a localização atual do utilizador;
// devolve latitude e longitude


export const getCurrentLocation = async (): Promise<{latitude: number, longitude: number}> => {
  return new Promise(async (resolve, reject) => {
    // Pedir permissões no Android popup
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'Precisamos da sua localização para procurar imóveis perto de si.',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permissão Negada', 'A permissão de localização é necessária.');
          return reject('Permissão negada');
        }
      } catch (err) {
        console.warn(err);
        return reject(err);
      }
    }

    // Obter a posição atual
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude }); // Devolvemos apenas as coordenadas
      },
      (error) => {
        Alert.alert('Erro', 'Não foi possível obter a sua localização.');
        reject(error);
      },
      { enableHighAccuracy: false, // precisão retirei porrque ativado dá mais erros se estiver por exemplo dentro de casa
        timeout: 15000, // esper 15 sec
        maximumAge: 10000 } // reutilizar localização
    );
  });
};