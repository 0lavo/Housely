// src/screens/HomeScreen.tsx

import { View, Text, ImageBackground, TouchableOpacity, Animated, PanResponder, Dimensions } from "react-native";
import React, { useState, useRef, useCallback } from 'react';
import { globalStyles, COLORS } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import { homeStyles } from '../styles/homeScreenStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addLiked } from '../storage/likedStorage';
import EndOfListModal from "../components/EndOfListModal";
import { Property, filterProperties } from "../utils/filterProperties";
import { useFocusEffect } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

const HomeScreen = ({navigation}: any) => {

    const [data, setData] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            filterProperties().then(result => {
            setData(result);
            setIndex(0);
            setLoading(false);
        });
        }, [])
    );
    
    const [index, setIndex] = useState(0);
    const isEnd = index >= data.length;
    const safeIndex = isEnd ? data.length - 1 : index;

    const addToLiked = async () => {
        setIndex(i => i + 1);
        addLiked({
            propertyCode: data[safeIndex].propertyCode,
            image: data[safeIndex].thumbnail,
            province: data[safeIndex].province,
            municipality: data[safeIndex].municipality,
            address: data[safeIndex].address,
            rooms: data[safeIndex].rooms,
            bathrooms: data[safeIndex].bathrooms,
            size: data[safeIndex].size,
            price: data[safeIndex].price,
            description: data[safeIndex].description,
            url: data[safeIndex].url,
        });
    };

    const latest = useRef({ addToLiked });
    latest.current = { addToLiked };

    const position = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt: any, gestureState: any) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (evt: any, gestureState: any) => {
                if (gestureState.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right');
                } else if (gestureState.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left');
                } else {
                    resetPosition();
                }
            }
        })
    ).current;

    const forceSwipe = (direction: 'left' | 'right') => {
        const x = direction === 'right' ? SCREEN_WIDTH + 50 : -SCREEN_WIDTH - 50;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: 250,
            useNativeDriver: false,
        }).start(() => onSwipeComplete(direction));
    };

    const onSwipeComplete = (direction: 'left' | 'right') => {
        if (direction === 'right') {
            {/* Chama através do .current para ignorar o bloqueio do PanResponder */}
            latest.current.addToLiked(); 
        } else {
            setIndex(i => i + 1);
        }
        position.setValue({ x: 0, y: 0 });
    };

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    };

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    });

    const animatedCardStyle: any = {
        ...position.getLayout(),
        transform: [{ rotate }]
    };

    if (loading) {
        return <View><Text>A carregar...</Text></View>;
    }  

    return (
        <View style={globalStyles.screen}>
            <AppHeader navigation={navigation}/>
            <View style={[globalStyles.centeredContainer, {paddingVertical: 16}]}> 
                <View style={homeStyles.cardContainer}>
                    
                    <Animated.View 
                        style={[animatedCardStyle, { height: '100%', width: '100%' }]} 
                        {...panResponder.panHandlers}
                    >
                        <ImageBackground
                            source={{uri: data[safeIndex].thumbnail}}
                            style={homeStyles.card}
                            imageStyle={homeStyles.cardImage}
                        >
                            <View style={homeStyles.overlay}>
                                <View>
                                    <View style={homeStyles.locationBadge}>
                                        <Icon name="location-on" size={16} color={COLORS.branco} />
                                        <Text style={homeStyles.locationBadgeText}>{data[safeIndex].province}, Portugal</Text>
                                    </View>
                                    <Text style={homeStyles.title}>T{data[safeIndex].rooms} em {data[safeIndex].province}</Text>
                                </View>

                                <View>
                                    <View style={homeStyles.bottomContent}>
                                        <View style={homeStyles.addressContainer}>
                                            <View style={homeStyles.addressRow}>
                                                <Icon name="location-on" size={16} color={COLORS.branco} />
                                                <Text style={homeStyles.addressText}>{data[safeIndex].address}</Text>
                                            </View>
                                            <Text style={homeStyles.cityText}>{data[safeIndex].municipality}</Text>
                                        </View>

                                        <View style={homeStyles.priceContainer}>
                                            <Text style={homeStyles.price}>€{data[safeIndex].price}</Text>
                                            <Text style={homeStyles.priceMonth}>por mês</Text>
                                        </View>
                                    </View>
                                    <View style={homeStyles.infoRow}>
                                        <View style={homeStyles.infoItem}>
                                            <Icon name="bed" size={20} color={COLORS.branco} />
                                            <Text style={homeStyles.infoText}>{data[safeIndex].rooms}</Text>
                                        </View>
                                        <View style={homeStyles.infoItem}>
                                            <Icon name="bathtub" size={20} color={COLORS.branco} />
                                            <Text style={homeStyles.infoText}>{data[safeIndex].bathrooms}</Text>
                                        </View>
                                        <View style={homeStyles.infoItem}>
                                            <Icon name="square-foot" size={20} color={COLORS.branco} />
                                            <Text style={homeStyles.infoText}>{data[safeIndex].size}m²</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </Animated.View>

                </View>

                <View style={homeStyles.actionsContainer}>
                    <TouchableOpacity style={homeStyles.rejectButton} onPress={() => forceSwipe('left')}>
                        <Icon name="close" size={34} color="#D32F2F" />
                    </TouchableOpacity>

                    <TouchableOpacity style={homeStyles.favoriteButton} onPress={() => forceSwipe('right')}>
                        <Icon name="favorite" size={30} color={COLORS.branco} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <EndOfListModal
                visible={isEnd}
                onRestart={() => setIndex(0)}
                onClose={() => {}}
            />
            <AppFooter navigation={navigation} activeScreen="Home"/>
        </View>
    );
};

export default HomeScreen;