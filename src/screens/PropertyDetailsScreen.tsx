import React, {useMemo, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, Alert, FlatList, useWindowDimensions } from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, globalStyles } from "../styles/globalStyles";
import { propertyStyles } from '../styles/propertyDetailsStyles';
import AppFooter from "../components/AppFooter";
import data from '../../data/portoProperties.json';
import imagesMap from '../../data/images.json';
import { SafeAreaView } from 'react-native-safe-area-context';


interface FeatureProps {
  iconName: string;
  label: string;
  value: string;
}
const FeatureCard = ({ iconName, label, value }: FeatureProps) => (
    <View style={propertyStyles.featureCard}>
        <Icon name={iconName} size={22} color={COLORS.corIconsTexto} />
        <Text style={propertyStyles.featureLabel}>{label}</Text>
        <Text style={propertyStyles.featureValue}>{value}</Text>
    </View>
);

const PropertyDetails = ({ route, navigation }: any ) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Buscar o propertyCode vindo do FavoriteScreen
    const { propertyCode } = route.params || {};

    // Procurar a propriedade correta no JSON usando o propertyCode
    const property = data.find((p: any) => p.propertyCode === propertyCode);

    const imagesList = useMemo(() => {
        let listFromJson: string[] = (imagesMap as any)?.[String(propertyCode)] ?? [];

        if (!listFromJson || listFromJson.length === 0) {
            listFromJson = (imagesMap as any)?.["50000001"] ?? [];
        }

        // Primeira imagem deve ser sempre a principal (thumbnail)
        const first = property?.thumbnail;
        if (!first) return listFromJson;


        // Remove duplicados mantendo ordem: thumbnail primeiro, depois o resto
        const merged = [first, ...listFromJson];
        return Array.from(new Set(merged));
    }, [propertyCode, property?.thumbnail]);

    const { width } = useWindowDimensions();
    const IMAGE_WIDTH = width - 40;



    // Se por acaso a propriedade não for encontrada (exemplo de fallback)
    if (!property) {

        return (
            <View style={[globalStyles.screen, globalStyles.centeredContainer]}>
                <Text>Propriedade não encontrada.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: COLORS.corIconsTexto, marginTop: 10 }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const openPropertyUrl = async (url: string | undefined) => {
        if (!url) {
            Alert.alert("Erro", "O link deste imóvel não está disponível.");
            return;
        }

        try {
            // Tenta abrir diretamente, ignorando o canOpenURL que pode dar falsos negativos
            await Linking.openURL(url);
        } catch (error) {
            console.error("Erro ao tentar abrir o URL:", error);
            Alert.alert("Erro", "Não foi possível abrir o link neste dispositivo.");
        }
    };


    return (
        <View style={propertyStyles.container}>
            <SafeAreaView style={[globalStyles.safeArea, { flex: 1 }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                
                {/*  Cabeçalho (Header) */}
                <View style={propertyStyles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color={COLORS.corIconsTexto} />
                    </TouchableOpacity>
                    <Text style={propertyStyles.headerTitle}>Detalhes do Imóvel</Text>
                    <TouchableOpacity>
                        <Icon name="share-social-outline" size={24} color={COLORS.corIconsTexto} />
                    </TouchableOpacity>
                </View>

                {/* Imagem Principal + restantes (carrossel) */}
                <View style={propertyStyles.imageContainer}>
                    <FlatList
                        data={imagesList}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}

                        onScroll={(event) => {
                            const slideSize = event.nativeEvent.layoutMeasurement.width;
                            const index = event.nativeEvent.contentOffset.x / slideSize;
                            setCurrentIndex(Math.round(index));
                        }}
                        scrollEventThrottle={16} // Ajuda a que o onScroll seja fluido

                        snapToInterval={IMAGE_WIDTH} 
                        decelerationRate="fast"
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={[
                                    propertyStyles.mainImage, 
                                    { width: IMAGE_WIDTH }
                                ]}
                            />
                        )}
                    />

                    <View style={propertyStyles.imageBadge}>
                        <Icon name="camera-outline" size={14} color={COLORS.branco} />
                        <Text style={propertyStyles.badgeText}>Fotos</Text>
                    </View>
                </View>
                 {/* ---> NOVOS PONTINHOS <--- */}
                    <View style={propertyStyles.paginationContainer}>
                        {imagesList.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    propertyStyles.paginationDot,
                                    currentIndex === index 
                                        ? propertyStyles.paginationDotActive 
                                        : propertyStyles.paginationDotInactive
                                ]}
                            />
                        ))}
                    </View>


                {/* Detalhes da Propriedade */}
                <View style={propertyStyles.detailsContainer}>
                    <Text style={propertyStyles.priceText}>€{property.price.toLocaleString()}</Text>
                    <Text style={propertyStyles.propertyName}>T{property.rooms} em {property.municipality}</Text>
                    
                    <View style={propertyStyles.locationRow}>
                        <Icon name="location-outline" size={16} color="#888" />
                        <Text style={propertyStyles.locationText}>{property.address}, {property.province}</Text>
                    </View>

                    {/* Grid de Características */}
                    <View style={propertyStyles.featuresGrid}>
                        <FeatureCard 
                            iconName="resize-outline" 
                            label="AREA" 
                            value={`${property.size} m²`} 
                        />
                        <FeatureCard 
                            iconName="bed-outline" 
                            label="QUARTOS" 
                            value={`${property.rooms} Quartos`} 
                        />
                        <FeatureCard 
                            iconName="water-outline" 
                            label="WC" 
                            value={`${property.bathrooms} WC`} 
                        />
                        {/* ver isto */}
                        <FeatureCard 
                            iconName="car-outline" 
                            label="GARAGENS" 
                            value="1 Garagens" 
                        />
                    </View>

                    {/* Secção "Sobre" */}
                    <Text style={propertyStyles.aboutTitle}>Sobre este imovel</Text>
    
                    <Text style={propertyStyles.aboutDescription}>
                        Excelente imóvel tipo T{property.rooms} situado na província de {property.province}, concelho de {property.municipality}. 
                        Possui {property.size} metros quadrados de área total e conta com {property.bathrooms} casa(s) de banho. 
                        Uma ótima oportunidade de negócio por €{property.price.toLocaleString()}.
                    </Text>
                    
                    {isExpanded && (
                        <Text style={[propertyStyles.aboutDescription, { marginTop: 10 }]}>
                            {property.description}
                        </Text>
                    )}

                    {/* O botão muda o nome e o ícone consoante esteja aberto ou fechado */}
                    <TouchableOpacity 
                        style={propertyStyles.readMoreRow} 
                        onPress={() => setIsExpanded(!isExpanded)}
                    >
                        <Text style={propertyStyles.readMoreText}>
                            {isExpanded ? "Ocultar descrição" : "Descrição detalhada"}
                        </Text>
                        <Icon 
                            name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"} 
                            size={16} 
                            color={COLORS.corIconsTexto} 
                        />
                    </TouchableOpacity>

                    {/* Botão Contactar Agente */}
                    <TouchableOpacity style={globalStyles.primaryButton} activeOpacity={0.8}
                    onPress={() => openPropertyUrl(property.url)}>
                        <Text style={{...globalStyles.primaryButtonText}}>
                            Ver no site
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            </SafeAreaView>
            <AppFooter navigation={navigation} activeScreen="Favorite"/>
        </View>
    );
};

export default PropertyDetails;