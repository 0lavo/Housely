import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, globalStyles } from "../styles/globalStyles";
import { propertyStyles } from '../styles/propertyDetailsStyles';
import AppFooter from "../components/AppFooter";


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

const PropertyDetails = ({ navigation }: any ) => {
    return (
        <View style={propertyStyles.container}>
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
                        source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' }} 
                        style={propertyStyles.mainImage} 
                    />
                    <View style={propertyStyles.imageBadge}>
                        <Icon name="camera-outline" size={14} color={COLORS.branco} />
                        <Text style={propertyStyles.badgeText}>1/12 Photos</Text>
                    </View>
                </View>

                {/* Detalhes da Propriedade */}
                <View style={propertyStyles.detailsContainer}>
                    <Text style={propertyStyles.priceText}>€4,850,000</Text>
                    <Text style={propertyStyles.propertyName}>The Azure Enclave Villa</Text>
                    
                    <View style={propertyStyles.locationRow}>
                        <Icon name="location-outline" size={16} color="#888" />
                        <Text style={propertyStyles.locationText}>1204 Sapphire Heights, Malibu Coastline, CA</Text>
                    </View>

                    {/* Grid de Características */}
                    <View style={propertyStyles.featuresGrid}>
                        <FeatureCard 
                            iconName="resize-outline" 
                            label="AREA" 
                            value="5,420 m2" 
                        />
                        <FeatureCard 
                            iconName="bed-outline" 
                            label="BEDS" 
                            value="5 Bedrooms" 
                        />
                        <FeatureCard 
                            iconName="water-outline" 
                            label="BATHS" 
                            value="6.5 Bathrooms" 
                        />
                        <FeatureCard 
                            iconName="car-outline" 
                            label="PARKING" 
                            value="3 Garages" 
                        />
                    </View>

                    {/* Secção "Sobre" */}
                    <Text style={propertyStyles.aboutTitle}>About this Property</Text>
                    <Text style={propertyStyles.aboutDescription}>
                        Redefining coastal luxury, The Azure Enclave is an architectural masterpiece perched above the Pacific. This meticulously crafted estate features floor-to-ceiling glass walls that disappear to create a seamless indoor-outdoor living experience.
                    </Text>
                    
                    <TouchableOpacity style={propertyStyles.readMoreRow}>
                        <Text style={propertyStyles.readMoreText}>Read More</Text>
                        <Icon name="chevron-down-outline" size={16} color={COLORS.corIconsTexto} />
                    </TouchableOpacity>

                    {/* Botão Contactar Agente */}
                    <TouchableOpacity style={globalStyles.primaryButton} activeOpacity={0.8}>
                        <Text style={{...globalStyles.primaryButtonText}}>
                            Contacte o Agente
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <AppFooter navigation={navigation} activeScreen="Favorite"/>

        </View>
    );
};

export default PropertyDetails;