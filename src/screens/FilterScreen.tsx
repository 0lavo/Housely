import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";

import { COLORS, globalStyles } from "../styles/globalStyles";
import { filterStyles } from "../styles/filterScreenStyles";

import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import IdealSpaceFilters from '../components/IdealSpaceFilters';
import PersonalFilters from '../components/PersonalFilters';
import Icon from 'react-native-vector-icons/Ionicons';

type TabType = 'space' | 'personal';

const FilterScreen = ({ navigation }: any) => {
    // Estados do nosso ecrã
    const [activeTab, setActiveTab] = useState<TabType>('space');
    const [location, setLocation] = useState(''); // <-- Guarda o texto da cidade
    const [useCurrentLocation, setUseCurrentLocation] = useState(false); // <-- Guarda o estado da checkbox

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
                    
                    {/* localização */}
                    <View style={filterStyles.locationInputContainer}>
                        <Icon name="location-outline" size={20} color="#888" style={filterStyles.locationIcon} />
                        <TextInput
                            style={filterStyles.locationInput}
                            placeholder="Cidade ou distrito"
                            placeholderTextColor="#888"
                            value={location}
                            onChangeText={setLocation}
                        />
                    </View>

                    {/* Checkbox "Usar localização atual" */}
                    <TouchableOpacity 
                        style={filterStyles.checkboxContainer} 
                        onPress={() => setUseCurrentLocation(!useCurrentLocation)}
                        activeOpacity={0.8}
                    >
                        <View style={filterStyles.checkbox}>
                            {useCurrentLocation && (
                                <Icon name="checkmark" size={16} color={COLORS.corIconsTexto} />
                            )}
                        </View>
                        <Text style={filterStyles.checkboxLabel}>Usar localização atual</Text>
                    </TouchableOpacity>
                </View>


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
                        <IdealSpaceFilters />
                    ) : (
                        <PersonalFilters />
                    )}
                </View>

            </ScrollView>

            {/*  Botão Principal e Footer */}
            <View style={filterStyles.submitSection}>
                <TouchableOpacity style={filterStyles.submitButton} activeOpacity={0.8}>
                    <Text style={filterStyles.submitText}>Mostrar propriedades</Text>
                </TouchableOpacity>
            </View>

            <AppFooter navigation={navigation} activeScreen="Filter" />
        </View>
    );
};

export default FilterScreen;