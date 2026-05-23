import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../styles/globalStyles";
import { personalStyles } from '../styles/personalFiltersStyles';


type PersonalFiltersProps = {
    hasPets: boolean | null;
    setHasPets: (value: boolean | null) => void;
    smoker: boolean | null;
    setSmoker: (value: boolean | null) => void;
    gender: string | null;
    setGender: (value: string | null) => void;
    housemates: string | null;
    setHousemates: (value: string | null) => void;
}

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




const PersonalFilters = (personalFilters: PersonalFiltersProps) => {
    
    const [friendlyHouse, setFriendlyHouse] = useState(false);

    const handleMinus = () => {
        const n = Number(personalFilters.housemates ?? 0);
        personalFilters.setHousemates(String(Math.max(0, n - 1)));
    };

    const handlePlus = () => {
        const n = Number(personalFilters.housemates ?? 0);
        personalFilters.setHousemates(String(n + 1));
    };

    return (
        <View style={personalStyles.container}>
            
            {/* 1. Tens Animais */}
            <ToggleOption 
                iconName="paw-outline" 
                title="Tens animais" 
                subtitle="Procuro casa que aceite o meu pet" 
                value={personalFilters.hasPets} 
                onValueChange={personalFilters.setHasPets} 
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
                value={personalFilters.smoker} 
                onValueChange={personalFilters.setSmoker}
            />

            {/* 4. Género */}
            <View style={personalStyles.genderCard}>
                <Text style={personalStyles.genderTitle}>Género</Text>
                <View style={personalStyles.genderButtonsContainer}>
                    <TouchableOpacity 
                        style={[
                            personalStyles.genderBtn, 
                            personalFilters.gender === 'Masculino' ? personalStyles.genderBtnActive : personalStyles.genderBtnInactive
                        ]}
                        onPress={() => personalFilters.setGender('Masculino')}
                        activeOpacity={0.8}
                    >
                        <Text style={personalFilters.gender === 'Masculino' ? personalStyles.genderTextActive : personalStyles.genderTextInactive}>
                            Masculino
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[
                            personalStyles.genderBtn, 
                            personalFilters.gender === 'Feminino' ? personalStyles.genderBtnActive : personalStyles.genderBtnInactive
                        ]}
                        onPress={() => personalFilters.setGender('Feminino')}
                        activeOpacity={0.8}
                    >
                        <Text style={personalFilters.gender === 'Feminino' ? personalStyles.genderTextActive : personalStyles.genderTextInactive}>
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
                    
                    <Text style={personalStyles.stepperValue}>{personalFilters.housemates}</Text>
                    
                    <TouchableOpacity style={[personalStyles.stepperBtn, personalStyles.stepperBtnPlus]} onPress={handlePlus}>
                        <Icon name="add" size={16} color={COLORS.branco} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default PersonalFilters;