import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../styles/globalStyles'; 

interface PropertyCardProps {
    imageUrl: any; 
    title: string;
    price: string;
    address: string;
    // beds e bath, ver como ajustar depois
    beds: number;
    baths: number;
    onPressFavorite?: () => void;
    onPressViewDetails?: () => void;
}

const PropertyCard = ({ imageUrl, title, price, address, beds, baths, onPressFavorite, onPressViewDetails }: PropertyCardProps) => {
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={onPressViewDetails}>
                {/* Secção Superior: Imagem e Coração */}
            <View style={styles.imageContainer}>
                <Image source={imageUrl} style={styles.image} resizeMode="cover" />
                
                {/* Botão de Favorito (Flutuante) */}
                <TouchableOpacity style={styles.heartButton} onPress={onPressFavorite}>
                    <Icon name="heart" size={22} color={COLORS.corBotoes} /> 
                </TouchableOpacity>
            </View>

            {/* Secção Inferior: Detalhes da Casa */}
            <View style={styles.detailsContainer}>
                <View style={styles.rowBetween}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>

                {/* Morada com Ícone */}
                <View style={styles.addressContainer}>
                    <Icon name="location-outline" size={14} color={COLORS.corIconsTexto} />
                    <Text style={styles.addressText}>{address}</Text>
                </View>

                {/* Linha das Camas/Casas de Banho e Botão */}
                <View style={[styles.rowBetween, styles.footerRow]}>
                    
                    <View style={styles.amenities}>
                        {/* Cama com Ícone */}
                        <View style={styles.amenityItem}>
                            <Icon name="bed-outline" size={16} color={COLORS.corIconsTexto} />
                            <Text style={styles.amenityText}>{beds} Bed</Text>
                        </View>
                        
                        {/* Casa de Banho com Ícone */}
                        <View style={styles.amenityItem}>
                            <MaterialCommunityIcons name="bathtub-outline" size={16} color = {COLORS.corIconsTexto} />
                            <Text style={styles.amenityText}>{baths} Bath</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.viewButton} onPress={onPressViewDetails}>
                    <Text style={styles.viewButtonText}>Ver Detalhes</Text>
                </TouchableOpacity>

                </View>
            </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 20,
        padding: 8, 
        elevation: 3, 
    },
    // --- IMAGEM ---
    imageContainer: {
        height: 180, 
        width: '100%',
        position: 'relative', 
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    heartButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#FFFFFF',
        width: 34,
        height: 34,
        borderRadius: 17, 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    // --- DETALHES ---
    detailsContainer: {
        paddingTop: 12,
        paddingHorizontal: 8,
        paddingBottom: 4,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: FONTS.size.h3, 
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
        flex: 1, 
        marginRight: 10,
    },
    price: {
        fontSize: FONTS.size.h3,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
    },
    // --- MORADA ---
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    addressText: {
        fontSize: FONTS.size.small,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
        marginLeft: 4,
    },
    // --- RODAPÉ (ÍCONES E BOTÃO) ---
    footerRow: {
        marginTop: 4,
    },
    amenities: {
        flexDirection: 'row',
        gap: 16, // Espaço entre os grupos (Cama vs Casa de banho)
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4, 
    },
    amenityText: {
        fontSize: FONTS.size.small,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
    },
    viewButton: {
        backgroundColor: COLORS.corBotoes,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    viewButtonText: {
        color: '#FFFFFF',
        fontFamily: FONTS.bold,
        fontSize: FONTS.size.small,
    }
});

export default PropertyCard;