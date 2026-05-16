// src/screens/HomeScreen.tsx

import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles, COLORS } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import { homeStyles } from '../styles/homeScreenStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import data from '../../data/properties.json'
import { useState } from 'react';
import { addLiked } from '../storage/likedStorage';


const HomeScreen = ({navigation}: any) => {
    
    const [index, setIndex] = useState(0);

    const addToLiked = async () => {
        setIndex(i => i + 1);
        addLiked({
            propertyCode: data[index].propertyCode,
            image: data[index].thumbnail,
            province: data[index].province,
            municipality: data[index].municipality,
            address: data[index].address,
            rooms: data[index].rooms,
            bathrooms: data[index].bathrooms,
            size: data[index].size,
            price: data[index].price,
            description: data[index].description,
            url: data[index].url,
        })
    }
    
    return (
        <View style={globalStyles.screen}>
            <AppHeader navigation={navigation}/>
            <View style={[globalStyles.centeredContainer, {paddingVertical: 16}]}> 
                <View style={homeStyles.cardContainer}>
                    <ImageBackground
                        source={{uri: data[index].thumbnail}} // -- IMAGE -- 
                        style={homeStyles.card}
                        imageStyle={homeStyles.cardImage}
                    >
                        <View style={homeStyles.overlay}>


                            <View>
                                <View style={homeStyles.locationBadge}>
                                    <Icon name="location-on" size={16} color={COLORS.branco} />
                                    <Text style={homeStyles.locationBadgeText}>{data[index].province}, Portugal</Text> {/* -- PROVINCE -- */}
                                </View>
                                <Text style={homeStyles.title}>T{data[index].rooms} em {data[index].province}</Text> {/* -- ROOMS -- */} 
                            </View>

                            <View>
                                <View style={homeStyles.bottomContent}>

                                <View style={homeStyles.addressContainer}>
                                    <View style={homeStyles.addressRow}>
                                        <Icon name="location-on" size={16} color={COLORS.branco} />
                                        <Text style={homeStyles.addressText}>{data[index].address}</Text> {/* -- ADDRESS -- */}
                                    </View>

                                    <Text style={homeStyles.cityText}>{data[index].municipality}</Text> {/* -- MUNICIPALITY -- */}
                                </View>

                                <View style={homeStyles.priceContainer}>
                                    <Text style={homeStyles.price}>€{data[index].price}</Text> {/* -- PRICE -- */}
                                    <Text style={homeStyles.priceMonth}>por mês</Text>
                                </View>
                            </View>
                            <View style={homeStyles.infoRow}>

                                <View style={homeStyles.infoItem}>
                                    <Icon name="bed" size={20} color={COLORS.branco} />
                                    <Text style={homeStyles.infoText}>{data[index].rooms}</Text> {/* -- ROOMS -- */}
                                </View>
                                <View style={homeStyles.infoItem}>
                                    <Icon name="bathtub" size={20} color={COLORS.branco} />
                                    <Text style={homeStyles.infoText}>{data[index].bathrooms}</Text> {/* -- BATHROOMS -- */}
                                </View>

                                <View style={homeStyles.infoItem}>
                                    <Icon name="square-foot" size={20} color={COLORS.branco} />
                                    <Text style={homeStyles.infoText}>{data[index].size}m²</Text> {/* -- SIZE -- */}
                                </View>

                            </View>
                            </View>
                            

                            
                        </View>
                    </ImageBackground>
                </View>
                <View style={homeStyles.actionsContainer}>

                    <TouchableOpacity style={homeStyles.rejectButton} onPress={() => setIndex(i => i + 1)}>
                        <Icon name="close" size={34} color="#D32F2F" />
                    </TouchableOpacity>

                    <TouchableOpacity style={homeStyles.favoriteButton} onPress={() => addToLiked()}>
                        <Icon name="favorite" size={30} color={COLORS.branco} />
                    </TouchableOpacity>

                </View>
            </View>
            <AppFooter navigation={navigation} activeScreen="Home"/>
        </View>
    );
};


export default HomeScreen;