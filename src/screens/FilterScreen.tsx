import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { COLORS, globalStyles } from "../styles/globalStyles";
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


type TabType = 'space' | 'personal';

const FilterScreen = ({ navigation }: any) => {
    // Estados do nosso ecrã
    const [activeTab, setActiveTab] = useState<TabType>('space');
    const [location, setLocation] = useState(''); // <-- Guarda o texto da cidade
    const [useCurrentLocation, setUseCurrentLocation] = useState(false); // <-- Guarda o estado da checkbox
    const [locationCoords, setLocationCoords] = useState<{latitude: number, longitude: number} | null>(null);
    const [distance, setDistance] = useState<number>(5);

    //Filtros do espaço ideal
    const [budgetRange, setBudgetRange] = useState<[number | null, number | null]>([MIN_BUDGET, MAX_BUDGET]);
    const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>(['T0/Studio', 'T1']);
    const [elevator, setElevator] = useState(true);
    const [garage, setGarage] = useState(false);
    const [swimmingPool, setSwimmingPool] = useState(false);
    const [furnished, setFurnished] = useState(true);

    //Filtros pessoais
    const [hasPets, setHasPets] = useState<boolean | null>(true);
    const [smoker, setSmoker] = useState<boolean | null>(false);
    const [gender, setGender] = useState<string | null>('Feminino');
    const [housemates, setHousemates] = useState<string | null>('3');
    
    const handleFilters = () => {
        saveFilters({
            locationCoords: locationCoords,
            distance: distance,
            minPrice: budgetRange[0],
            maxPrice: budgetRange[1],
            bedrooms: selectedTypes,
            elevator,
            garage,
            swimmingPool,
            furnished,
            petPolicy: hasPets,
            smokePolicy: smoker,
            newGender: gender,
            housemates: housemates
        })
    };

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
                
                {/* Título e Localização visível em ambas as abas */}
                <View style={filterStyles.headerSection}>
                    <Text style={filterStyles.title}>Suas necessidades</Text>
                    <Text style={filterStyles.subtitle}>
                        Conta-nos o teu perfil para encontrarmos a casa certa.
                    </Text>
                    

                    {/* NOVO: Cartão à volta da localização */}
                    <View style={[propertyStyles.othersCard, { padding: 20 }]}>

                        {/* localização */}
                        <View style={filterStyles.locationInputContainer}>
                            <Icon name="location-outline" size={20} color={COLORS.corIconsTexto} style={filterStyles.locationIcon} />
                            <TextInput
                                style={[
                                    filterStyles.locationInput,
                                    useCurrentLocation && { opacity: 0.5 } // meio transparente se desativado
                                ]}
                                placeholder={useCurrentLocation ? "A usar a localização atual..." : "Cidade ou distrito"}
                                placeholderTextColor="#888"
                                value={location}
                                onChangeText={setLocation}
                                editable={!useCurrentLocation} // Bloqueia a escrita se a checkbox estiver ativa
                                selectTextOnFocus={!useCurrentLocation}
                            />
                            
                        </View>

                        {/* Checkbox "Usar localização atual" */}
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


                        {/* Slider de Distância */}
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
                                onValueChange={(val) => setDistance(val)}
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
                <TouchableOpacity style={globalStyles.primaryButton} activeOpacity={0.8} onPress={() => handleFilters()}>
                    <Text style={globalStyles.primaryButtonText}>Salvar Filtros</Text>
                </TouchableOpacity>
            </View>

            <AppFooter navigation={navigation} activeScreen="Filter" />
        </View>
    );
};

export default FilterScreen;