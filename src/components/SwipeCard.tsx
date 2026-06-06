// src/components/SwipeCard.tsx

import React, { useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { homeStyles } from '../styles/homeScreenStyles';
import { COLORS } from '../styles/globalStyles';
import { Property } from '../utils/filterProperties';

interface SwipeCardProps {
    property: Property;
    mostrarMorada?: boolean;
}

const SwipeCard = ({ property, mostrarMorada = false }: SwipeCardProps) => {
    const [imageError, setImageError] = useState(false);

    if (!property) return null;

    return (
        <>
            <Image 
                source={require('../../assets/placeholder.webp')}
                style={[homeStyles.cardImage, { position: 'absolute', width: '100%', height: '100%' }]}
            />

            <ImageBackground
                source={
                    property.thumbnail && !imageError
                        ? { uri: property.thumbnail }
                        : require('../../assets/placeholder.webp')
                }
                style={homeStyles.card}
                imageStyle={homeStyles.cardImage}
                onError={() => setImageError(true)}
            >
                <View style={homeStyles.overlay}>
                    <View>
                        <View style={homeStyles.locationBadge}>
                            <Icon name="location-on" size={16} color={COLORS.branco} />
                            <Text style={homeStyles.locationBadgeText}>{property.province}, Portugal</Text>
                        </View>
                        <Text style={homeStyles.title}>T{property.rooms} em {property.province}</Text>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, opacity: 0.8 }}>
                            <Text style={{ color: COLORS.branco, fontSize: 15 }}>
                                {property.municipality}
                            </Text>
                            {/* O ícone só deve animar no cartão ativo, mas para manter simples passamos false no cartão de trás */}
                            <Icon name={mostrarMorada ? "expand-less" : "expand-more"} size={20} color={COLORS.branco} />
                        </View>

                        {mostrarMorada && (
                            <View style={{ marginTop: 6 }}>
                                <View style={homeStyles.addressRow}>
                                    <Icon name="location-on" size={16} color={COLORS.branco} />
                                    <Text style={homeStyles.addressText}>{property.address}</Text>
                                </View>
                            </View>
                        )}
                    </View>

                    <View>
                        <View style={homeStyles.bottomContent}>
                            <View style={homeStyles.priceContainer}>
                                <Text style={homeStyles.price}>€{property.price}</Text>
                                <Text style={homeStyles.priceMonth}>por mês</Text>
                            </View>
                        </View>
                        <View style={homeStyles.infoRow}>
                            <View style={homeStyles.infoItem}>
                                <Icon name="bed" size={20} color={COLORS.branco} />
                                <Text style={homeStyles.infoText}>{property.rooms}</Text>
                            </View>
                            <View style={homeStyles.infoItem}>
                                <Icon name="bathtub" size={20} color={COLORS.branco} />
                                <Text style={homeStyles.infoText}>{property.bathrooms}</Text>
                            </View>
                            <View style={homeStyles.infoItem}>
                                <Icon name="square-foot" size={20} color={COLORS.branco} />
                                <Text style={homeStyles.infoText}>{property.size}m²</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};

export default SwipeCard;