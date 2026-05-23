import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, globalStyles } from "../styles/globalStyles";
import { propertyStyles } from '../styles/propertyDetailsStyles';
import AppFooter from "../components/AppFooter";
import data from '../../data/portoProperties.json';
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

    // Buscar o propertyCode vindo do FavoriteScreen
    const { propertyCode } = route.params || {};

    // Procurar a propriedade correta no JSON usando o propertyCode
    const property = data.find((p: any) => p.propertyCode === propertyCode);

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
        // Verifica se o dispositivo suporta abrir o link (ex: tem browser instalado)
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Erro", "Não foi possível abrir o link neste dispositivo.");
        }
    } catch (error) {
        console.error("Erro ao tentar abrir o URL:", error);
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
                    <Text style={propertyStyles.headerTitle}>Home page</Text>
                    <TouchableOpacity>
                        <Icon name="share-social-outline" size={24} color={COLORS.corIconsTexto} />
                    </TouchableOpacity>
                </View>

                {/* Imagem Principal */}
                <View style={propertyStyles.imageContainer}>
                    <Image 
                        source={{ uri: property.thumbnail }} 
                        style={propertyStyles.mainImage} 
                    />
                    <View style={propertyStyles.imageBadge}>
                        <Icon name="camera-outline" size={14} color={COLORS.branco} />
                        <Text style={propertyStyles.badgeText}>Fotos</Text>
                    </View>
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
                            label="BEDS" 
                            value={`${property.rooms} Quartos`} 
                        />
                        <FeatureCard 
                            iconName="water-outline" 
                            label="BATHS" 
                            value={`${property.bathrooms} WC`} 
                        />
                        {/* ver isto */}
                        <FeatureCard 
                            iconName="car-outline" 
                            label="PARKING" 
                            value="3 Garages" 
                        />
                    </View>

                    {/* Secção "Sobre" */}
                    <Text style={propertyStyles.aboutTitle}>Sobre este imovel</Text>
    
                    <Text style={propertyStyles.aboutDescription}>
                        Excelente imóvel tipo T{property.rooms} situado na província de {property.province}, concelho de {property.municipality}. 
                        Possui {property.size} metros quadrados de área total e conta com {property.bathrooms} casa(s) de banho. 
                        Uma ótima oportunidade de negócio por €{property.price.toLocaleString()}.
                    </Text>
                    {/*
                    <TouchableOpacity style={propertyStyles.readMoreRow}>
                        <Text style={propertyStyles.readMoreText}>Descrição detalhada</Text>
                        <Icon name="chevron-down-outline" size={16} color={COLORS.corIconsTexto} />
                    </TouchableOpacity>*/}

                    {/* Aqui a descrição do JSON só aparece se clicarem no botão (isExpanded = true) */}
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