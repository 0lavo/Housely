import { View, Text, ScrollView} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import { styles } from '../styles/favoriteScreenStyles';
import SummaryCard from '../components/SummaryCard';
import PropertyCard from "../components/PropertyCard";
import { clearLiked, getLiked, LikedProperty } from "../storage/likedStorage";
import { useCallback, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";



const FavoriteScreen = ({navigation}: any) => {

    const [likedProperties, setLikedProperties] = useState<LikedProperty[]>([]);

    /**
     * useFocusEffect é como se fosse um useEffect, mas ele roda toda a vez
     * que a screen ganha foco, ja o useEffect so quando carrega a screen pela primeira vez.
     * como getLiked retorna uma Promise, usamos o then para atualizar o estado likedProperties com os dados lidos do AsyncStorage
     */
    useFocusEffect(
        useCallback(() => {
            getLiked().then(setLikedProperties);
        }, [])
    );

    /**
     * Aqui o clearLiked é parecido com o getLiked, retorna uma Promise.
     * Entao para isso eu declaro uma constante que recebe uma funcao.
     * Ai a arrow function diz que essa funcao da constante vai ser o clearLiked.then,
     * ou seja, quandoa promise for comprida, e com isso ele seta o likedProperties como vazio.
     * Assim atualizando o AsyncStorage e a variavel local daqui.
     */
    const clearLikedProperties = () => clearLiked().then(() => setLikedProperties([]));

    return (
        <View style={globalStyles.screen}>
        <AppHeader navigation={navigation}/>


        <ScrollView style={styles.contentContainer}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.title}>Favoritos</Text>
                <Text style={styles.subtitle}>
                   Reveja as suas propriedades favoritas antes de dar o próximo passo
                </Text>
            </View>

            {/* Secção Cartões de Resumo */}
            <View style={styles.summaryContainer}>
                <SummaryCard 
                    title="Total Salvo"
                    value="12"
                    label="Propriedades"
                    onReset={() => clearLikedProperties()}
                />
            </View>


            <View style={{ paddingHorizontal: 20 }}>
                {likedProperties.map(p => (
                    <PropertyCard
                        key={p.propertyCode}
                        imageUrl={{ uri: p.image }}
                        title={`T${p.rooms} em ${p.municipality}`}
                        price={`€${p.price.toLocaleString()}`}
                        address={p.address}
                        beds={p.rooms}
                        baths={p.bathrooms}
                        onPressViewDetails={() => navigation.navigate('PropertyDetails', { propertyCode: p.propertyCode })}
                    />
                ))}
            </View> 
        </ScrollView>
        <AppFooter navigation={navigation} activeScreen="Favorite"/>
    </View>
    )
}

export default FavoriteScreen;