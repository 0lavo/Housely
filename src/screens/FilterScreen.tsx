import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { COLORS, FONTS, globalStyles } from "../styles/globalStyles";
import { filterStyles } from "../styles/filterScreenStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import IdealSpaceFilters from '../components/IdealSpaceFilters';
import PersonalFilters from '../components/PersonalFilters';
import Icon from 'react-native-vector-icons/Ionicons';
import { getCurrentLocation } from '../services/location';
import { PropertyType, MIN_BUDGET, MAX_BUDGET } from '../components/IdealSpaceFilters';
import { saveFilters } from '../storage/filtersStorage.ts';
import {propertyStyles} from '../styles/idealSpaceFiltersStyles.ts'
import Slider from '@react-native-community/slider';
import { Dropdown } from 'react-native-element-dropdown';
import { sessionRejects } from './HomeScreen';

type TabType = 'space' | 'personal';

const FilterScreen = ({ navigation }: any) => {
    // Estados do nosso ecrã
    const [activeTab, setActiveTab] = useState<TabType>('space');
    const [location, setLocation] = useState(''); // <-- Guarda o texto da cidade
    const [useCurrentLocation, setUseCurrentLocation] = useState(false); // <-- Guarda o estado da checkbox
    const [locationCoords, setLocationCoords] = useState<{latitude: number, longitude: number} | null>(null);
    const [distance, setDistance] = useState<number>(5);
    const pickerRef = useRef<any>(null);

    //Filtros do espaço ideal
    const [budgetRange, setBudgetRange] = useState<[number | null, number | null]>([50, 500]);
    const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>(['T3']);
    const [elevator, setElevator] = useState(false);
    const [garage, setGarage] = useState(false);
    const [swimmingPool, setSwimmingPool] = useState(false);
    const [furnished, setFurnished] = useState(false);

    //Filtros pessoais
    const [hasPets, setHasPets] = useState<boolean | null>(false);
    const [smoker, setSmoker] = useState<boolean | null>(false);
    const [gender, setGender] = useState<string | null>('Feminino');
    const [housemates, setHousemates] = useState<string | null>('3');
    
    const handleFilters = async () => {
        await saveFilters({
            locationString: location,
            locationCoords: locationCoords,
            distance: distance,
            minPrice: budgetRange[0],
            maxPrice: budgetRange[1],
            bedrooms: selectedTypes,
            elevator: elevator,
            garage: garage,
            swimmingPool: swimmingPool,
            furnished: furnished,
            petPolicy: hasPets,
            smokePolicy: smoker,
            newGender: gender,
            housemates: housemates
        })
    };

    const cidadesData = [
    { label: 'Aveiro', value: 'Aveiro' },
    { label: 'Porto', value: 'Porto' },
    { label: 'Lisboa', value: 'Lisboa' },
    ];

    const handleToggleLocation = async () => {
        if (!useCurrentLocation) {
            try {
            const coords = await getCurrentLocation() as {latitude: number, longitude: number}; 

                // print das coordenadas no terminal
                console.log("Coordenadas:", coords);
                
                setLocationCoords(coords); 
                setUseCurrentLocation(true);
            
                // Limpa o texto da cidade para não haver conflitos
                setLocation('');
            } catch {
                setUseCurrentLocation(false);
            }
        } 
        else {
            // Desmarca a checkbox
            setUseCurrentLocation(false);
            
            // Limpa as coordenadas quando o utilizador desmarca a opção!
            setLocationCoords(null);
        }
    };

    return (
        <View style={globalStyles.screen}>
            <AppHeader navigation={navigation} />

            <ScrollView style={filterStyles.content} showsVerticalScrollIndicator={false}>
                
                <View style={filterStyles.headerSection}>
                    <Text style={filterStyles.title}>Suas necessidades</Text>
                    <Text style={filterStyles.subtitle}>
                        Conta-nos o teu perfil para encontrarmos a casa certa.
                    </Text>
                    

                    <View style={[propertyStyles.othersCard, { padding: 20 }]}>

                        <Dropdown
                            style={[
                                filterStyles.locationInputContainer,
                                useCurrentLocation && { opacity: 0.5 }
                            ]}
                            placeholderStyle={{ color: '#888', fontSize: FONTS.size.body }}
                            selectedTextStyle={{ color: COLORS.corIconsTexto , fontSize: FONTS.size.body }}
                            itemTextStyle={{ color: COLORS.corIconsTexto, fontSize: FONTS.size.body }}
                            containerStyle={{ borderRadius: 10, borderColor: COLORS.corCard }} 
                            iconStyle={{ width: 20, height: 20, tintColor: COLORS.corIconsTexto }} 
                            
                            data={cidadesData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecione a cidade..."
                            value={location}
                            disable={useCurrentLocation} // Bloqueia se a checkbox estiver ativa
                            
                            onChange={item => {
                                setLocation(item.value);
                            }}
                            
                            renderLeftIcon={() => (
                                <Icon 
                                    name="location-outline" 
                                    size={20} 
                                    color={COLORS.corIconsTexto} 
                                    style={{ marginRight: 10 }} 
                                />
                            )}
                        />

                        <TouchableOpacity 
                            style={filterStyles.checkboxContainer} 
                            onPress={handleToggleLocation}
                            activeOpacity={0.8}
                        >
                            <View style={filterStyles.checkbox}>
                                {useCurrentLocation && (
                                    <Icon name="checkmark" size={24} color={COLORS.corIconsTexto} />
                                )}
                            </View>
                            <Text style={filterStyles.checkboxLabel}>Usar localização atual</Text>
                        </TouchableOpacity>


                        <View style={filterStyles.distanceContainer}>
                            <View style={filterStyles.distanceHeader}>
                                <Text style={filterStyles.distanceLabel}>Distância máxima</Text>
                                <Text style={filterStyles.distanceValue}>+ {distance} km</Text>
                            </View>
                            
                            <Slider
                                style={{ width: '100%', height: 40, marginTop: 10 }}
                                minimumValue={0}
                                maximumValue={50}
                                step={5}
                                value={distance}
                                onValueChange={(val: number) => setDistance(val)}
                                minimumTrackTintColor={COLORS.corBotoes}
                                maximumTrackTintColor="#e0e0e0"
                                thumbTintColor={COLORS.corBotoes}
                            />
                        </View>

                    </View>
                    
                </View> {/* FIM DO NOVO CARTÃO */}

                            

                {/*  Switcher botões para trocar */}
                <View style={filterStyles.tabContainer}>
                    <TouchableOpacity 
                        style={[filterStyles.tabButton, activeTab === 'space' && filterStyles.activeTab]}
                        onPress={() => setActiveTab('space')}
                        activeOpacity={0.8}
                    >
                        <Text style={activeTab === 'space' ? filterStyles.activeTabText : filterStyles.inactiveTabText}>
                            O teu espaço{'\n'}ideal
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[filterStyles.tabButton, activeTab === 'personal' && filterStyles.activeTab]}
                        onPress={() => setActiveTab('personal')}
                        activeOpacity={0.8}
                    >
                        <Text style={activeTab === 'personal' ? filterStyles.activeTabText : filterStyles.inactiveTabText}>
                            Sobre ti{'\n'}(Opcional)
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Área dos Filtros Específicos (renderização condicional)*/}
                <View style={filterStyles.filtersContainer}>
                    {activeTab === 'space' ? (
                        <IdealSpaceFilters
                            budgetRange={budgetRange} setBudgetRange={setBudgetRange}
                            selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}
                            elevator={elevator} setElevator={setElevator}
                            garage={garage} setGarage={setGarage}
                            swimmingPool={swimmingPool} setSwimmingPool={setSwimmingPool}
                            furnished={furnished} setFurnished={setFurnished}
                        />
                    ) : (
                        <PersonalFilters 
                        hasPets={hasPets} setHasPets={setHasPets}
                        smoker={smoker} setSmoker={setSmoker}
                        gender={gender} setGender={setGender}
                        housemates={housemates} setHousemates={setHousemates}/>
                    )}
                </View>
            </ScrollView>

            {/*  Botão Principal e Footer */}
            <View style={filterStyles.submitSection}>
                <TouchableOpacity 
                    style={globalStyles.primaryButton} 
                    activeOpacity={0.8} 
                    onPress={async () => {
                        await handleFilters();
                        sessionRejects.clear();
                        navigation.navigate('Home');
                    }}>
                    <Text style={globalStyles.primaryButtonText}>Ver Propriedades</Text>
                </TouchableOpacity>
            </View>

            <AppFooter navigation={navigation} activeScreen="Filter" />
        </View>
    );
};

export default FilterScreen;