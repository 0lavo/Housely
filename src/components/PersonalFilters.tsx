import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, globalStyles } from "../styles/globalStyles";
import { personalStyles } from '../styles/personalFiltersStyles';

// Subcomponente reutilizável para as opções de "Liga/Desliga"
const ToggleOption = ({ iconName, title, subtitle, value, onValueChange }: any) => (
    <View style={personalStyles.optionCard}>
        <View style={personalStyles.iconContainer}>
            <Icon name={iconName} size={20} color={COLORS.corIconsTexto} />
        </View>
        <View style={personalStyles.textContainer}>
            <Text style={personalStyles.optionTitle}>{title}</Text>
            <Text style={personalStyles.optionSubtitle}>{subtitle}</Text>
        </View>
        <Switch
            trackColor={{ false: '#D3D3D3', true: COLORS.corBotoes }}
            thumbColor={COLORS.branco}
            ios_backgroundColor="#D3D3D3"
            onValueChange={onValueChange}
            value={value}
        />
    </View>
);

const PersonalFilters = ({ navigation }: any) => {
    // Estados baseados na tua imagem (Laranja = true/Ativo)
    const [hasPets, setHasPets] = useState(true);
    const [friendlyHouse, setFriendlyHouse] = useState(true);
    const [smoker, setSmoker] = useState(false);
    
    // Estado do Género
    const [gender, setGender] = useState<'Masculino' | 'Feminino'>('Feminino');
    
    // Estado dos Companheiros de Casa
    const [housemates, setHousemates] = useState(3);

    const handleMinus = () => {
        if (housemates > 0) setHousemates(housemates - 1);
    };

    const handlePlus = () => {
        setHousemates(housemates + 1);
    };

    return (
        <View style={personalStyles.container}>
            
            {/* 1. Tens Animais */}
            <ToggleOption 
                iconName="paw-outline" 
                title="Tens animais" 
                subtitle="Procuro casa que aceite o meu pet" 
                value={hasPets} 
                onValueChange={setHasPets} 
            />

            {/* 2. Casa Diversa */}
            <ToggleOption 
                iconName="heart-outline" 
                title="Casa diversa e amigável" 
                subtitle="Espaços inclusivos e acolhedores" 
                value={friendlyHouse} 
                onValueChange={setFriendlyHouse} 
            />

            {/* 3. Fumador */}
            <ToggleOption 
                iconName="logo-no-smoking" 
                title="Fumador" 
                subtitle="É permitido fumar dentro de casa" 
                value={smoker} 
                onValueChange={setSmoker} 
            />

            {/* 4. Género */}
            <View style={personalStyles.genderCard}>
                <Text style={personalStyles.genderTitle}>Género</Text>
                <View style={personalStyles.genderButtonsContainer}>
                    <TouchableOpacity 
                        style={[
                            personalStyles.genderBtn, 
                            gender === 'Masculino' ? personalStyles.genderBtnActive : personalStyles.genderBtnInactive
                        ]}
                        onPress={() => setGender('Masculino')}
                        activeOpacity={0.8}
                    >
                        <Text style={gender === 'Masculino' ? personalStyles.genderTextActive : personalStyles.genderTextInactive}>
                            Masculino
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[
                            personalStyles.genderBtn, 
                            gender === 'Feminino' ? personalStyles.genderBtnActive : personalStyles.genderBtnInactive
                        ]}
                        onPress={() => setGender('Feminino')}
                        activeOpacity={0.8}
                    >
                        <Text style={gender === 'Feminino' ? personalStyles.genderTextActive : personalStyles.genderTextInactive}>
                            Feminino
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 5. Companheiros de casa (Stepper) */}
            <View style={personalStyles.optionCard}>
                <View style={personalStyles.iconContainer}>
                    <Icon name="people-outline" size={20} color={COLORS.corIconsTexto} />
                </View>
                <View style={personalStyles.textContainer}>
                    <Text style={personalStyles.optionTitle}>Companheiros de casa</Text>
                    <Text style={personalStyles.optionSubtitle}>Até quantas pessoas</Text>
                </View>
                
                <View style={personalStyles.stepperContainer}>
                    <TouchableOpacity style={[personalStyles.stepperBtn, personalStyles.stepperBtnMinus]} onPress={handleMinus}>
                        <Icon name="remove" size={16} color="#888" />
                    </TouchableOpacity>
                    
                    <Text style={personalStyles.stepperValue}>{housemates}</Text>
                    
                    <TouchableOpacity style={[personalStyles.stepperBtn, personalStyles.stepperBtnPlus]} onPress={handlePlus}>
                        <Icon name="add" size={16} color={COLORS.branco} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default PersonalFilters;