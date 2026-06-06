// src/screens/HomeScreen.tsx

import { View, TouchableOpacity, Animated, PanResponder, Dimensions } from "react-native";
import React, { useState, useRef, useCallback } from 'react';
import { globalStyles, COLORS } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import { homeStyles } from '../styles/homeScreenStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addLiked, getLiked } from '../storage/likedStorage';
import EndOfListModal from "../components/EndOfListModal";
import { Property, filterProperties } from "../utils/filterProperties";
import { useFocusEffect } from "@react-navigation/native";
import { getFirstTime, setFirstTime } from "../storage/firstTimeStorage";
import FirstTimeModal from "../components/FirstTimeModal";
import SwipeCard from "../components/SwipeCard"; 

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

// Variável temporária: apaga-se quando fechas a app ou limpas
export const sessionRejects = new Set<string>();

const HomeScreen = ({navigation}: any) => {

    const [data, setData] = useState<Property[]>([]);

    useFocusEffect(
        useCallback(() => {
            Promise.all([filterProperties(), getLiked(), getFirstTime()])
            .then(([result, liked, firstTime]) => {
                const likedSet = new Set(liked.map(p => p.propertyCode));
                
                // Filtra as que estão nos favoritos E as que estão nas rejeições da sessão
                const filtered = result.filter(
                    p => !likedSet.has(p.propertyCode) && !sessionRejects.has(p.propertyCode)
                );
                
                setData(filtered);
                setIndex(0); // Agora pode voltar a 0 à vontade, as casas antigas já foram filtradas!
                setIsEnd(filtered.length === 0);
                setShowFirstTimeModal(firstTime === null ? true : firstTime);
            })
        }, [])
    );

    const [index, setIndex] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [showFirstTimeModal, setShowFirstTimeModal] = useState(true);
    const safeIndex = data.length === 0 ? 0 : Math.min(index, data.length - 1);

    const [mostrarMorada, setMostrarMorada] = useState(false);

    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const addToLiked = async () => {
        const nextIndex = index + 1;
        setIndex(nextIndex);
        if (nextIndex >= data.length) setIsEnd(true);
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

    const toggleMorada = () => setMostrarMorada(m => !m);

    const skipCurrent = () => {
        // Adiciona a casa atual à lista de rejeitadas desta sessão
        sessionRejects.add(data[safeIndex].propertyCode);

        const nextIndex = index + 1;
        setIndex(nextIndex);
        if (nextIndex >= data.length) setIsEnd(true);
    };

    type LatestRef = {
        addToLiked: () => Promise<void>;
        toggleMorada: () => void;
        skipCurrent: () => void;
    };

    const latest = useRef<LatestRef>({ addToLiked, toggleMorada, skipCurrent });
    latest.current = { addToLiked, toggleMorada, skipCurrent };

    const position = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                touchStartX.current = evt.nativeEvent.pageX;
                touchStartY.current = evt.nativeEvent.pageY;
            },
            onPanResponderMove: (evt: any, gestureState: any) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (evt: any, gestureState: any) => {
                const movedX = Math.abs(gestureState.dx);
                const movedY = Math.abs(gestureState.dy);
                const isTap = movedX < 10 && movedY < 10;

                if (isTap) {
                    latest.current.toggleMorada();
                    resetPosition();
                } else if (gestureState.dx > SWIPE_THRESHOLD) {
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
        setMostrarMorada(false);

        if (direction === 'right') {
            latest.current.addToLiked();
        } else {
            latest.current.skipCurrent();
        }

        // Reset só no próximo frame, depois do index já ter atualizado
        requestAnimationFrame(() => {
            position.setValue({ x: 0, y: 0 });
        });
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

    if (data.length === 0) {
        return (
            <View style={[globalStyles.screen]}>
                <AppHeader navigation={navigation}/>
                <EndOfListModal
                    visible={true}
                    onRestart={() => navigation.navigate('Filter')}
                    onClose={() => {}}
                />
                <AppFooter navigation={navigation} activeScreen="Home"/>
            </View>
        );
    }

    const nextIndex = safeIndex + 1;
    const hasNext = nextIndex < data.length;

    return (
        <View style={globalStyles.screen}>
            <AppHeader navigation={navigation}/>
            <View style={[globalStyles.centeredContainer, {paddingVertical: 16}]}>
                
                {/* ÁREA DOS CARTÕES */}
                <View style={homeStyles.cardContainer}>
                    
                    {/* CARTÃO DE TRÁS (Próxima Casa) */}
                    {hasNext && (
                        <View style={[{ height: '100%', width: '100%', position: 'absolute' }]}>
                            <SwipeCard key={data[nextIndex].propertyCode} property={data[nextIndex]} mostrarMorada={false} />
                        </View>
                    )}

                    {/* CARTÃO DA FRENTE ANIMADO (Casa Atual) */}
                    <Animated.View
                        style={[animatedCardStyle, { height: '100%', width: '100%', position: 'absolute' }]}
                        {...panResponder.panHandlers}
                    >
                    <SwipeCard key={data[safeIndex].propertyCode} property={data[safeIndex]} mostrarMorada={mostrarMorada} />
                    </Animated.View>

                </View>

                {/* BOTÕES DE AÇÃO */}
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
                onRestart={() => {navigation.navigate('Filter')}}
                onClose={() => {}}
            />
            <FirstTimeModal
                visible={showFirstTimeModal}
                onGoToFilters={() => {
                    setFirstTime(false);
                    navigation.navigate('Filter');
                }}
                onClose={() => {
                    setFirstTime(false);
                    setShowFirstTimeModal(false);
                }}
            />
            <AppFooter navigation={navigation} activeScreen="Home"/>
        </View>
    );
};

export default HomeScreen;