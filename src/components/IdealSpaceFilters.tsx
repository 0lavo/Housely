import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../styles/globalStyles";
import { propertyStyles } from '../styles/idealSpaceFiltersStyles';

// --- Tipos ---
type PropertyType = 'Quarto' | 'T0/Studio' | 'T1' | 'T2' | 'T3';

const ALL_PROPERTY_TYPES: PropertyType[] = ['Quarto', 'T0/Studio', 'T1', 'T2', 'T3'];

const MIN_BUDGET = 100;
const MAX_BUDGET = 3500;

// --- Subcomponente: Chip de tipo de propriedade ---
const PropertyChip = ({
    label,
    isActive,
    onPress,
}: {
    label: PropertyType;
    isActive: boolean;
    onPress: () => void;
}) => (
    <TouchableOpacity
        style={[propertyStyles.chip, isActive ? propertyStyles.chipActive : propertyStyles.chipInactive]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text style={isActive ? propertyStyles.chipTextActive : propertyStyles.chipTextInactive}>
            {label}
        </Text>
        {isActive ? (
            <Icon
                name="close"
                size={12}
                color={COLORS.branco}
                style={propertyStyles.chipCloseIcon}
            />
        ) : (
            <Icon
                name="add"
                size={12}
                color={COLORS.corIconsTexto}
                style={propertyStyles.chipCloseIcon}
            />
        )}
    </TouchableOpacity>
);

// --- Subcomponente: Linha de requisito com toggle ---
const RequirementToggle = ({
    label,
    value,
    onValueChange,
    showDivider = true,
}: {
    label: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
    showDivider?: boolean;
}) => (
    <>
        <View style={propertyStyles.requirementRow}>
            <Text style={propertyStyles.requirementText}>{label}</Text>
            <Switch
                trackColor={{ false: '#D3D3D3', true: COLORS.corBotoes }}
                thumbColor={COLORS.branco}
                ios_backgroundColor="#D3D3D3"
                onValueChange={onValueChange}
                value={value}
            />
        </View>
        {showDivider && <View style={propertyStyles.requirementDivider} />}
    </>
);

// --- Componente principal ---
const idealSpaceFilters = ({ navigation }: any) => {

    // Orçamento
    const [budgetRange, setBudgetRange] = useState<[number, number]>([MIN_BUDGET, MAX_BUDGET]);

    // Tipos de propriedade
    const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>(['Quarto']);

    // Secção "Outros Requisitos" expansível
    const [isOthersExpanded, setIsOthersExpanded] = useState(true);

    // Outros requisitos
    const [elevator, setElevator] = useState(true);
    const [garage, setGarage] = useState(false);
    const [pool, setPool] = useState(false);
    const [furnished, setFurnished] = useState(true);

    const togglePropertyType = (type: PropertyType) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const formatBudget = (value: number) => `€${value}`;

    return (
        <View style={propertyStyles.container}>

            {/* 1. Orçamento com slider de intervalo */}
            <View style={propertyStyles.budgetCard}>
                <View style={propertyStyles.budgetHeader}>
                    <Text style={propertyStyles.budgetTitle}>Teu orçamento</Text>
                    <Text style={propertyStyles.budgetRange}>
                        {formatBudget(budgetRange[0])} - {formatBudget(budgetRange[1])}
                    </Text>
                </View>
                <View style={propertyStyles.sliderContainer}>
                    <MultiSlider
                        values={[budgetRange[0], budgetRange[1]]}
                        min={MIN_BUDGET}
                        max={MAX_BUDGET}
                        step={50}
                        onValuesChange={(values) => setBudgetRange([values[0], values[1]])}
                        selectedStyle={{ backgroundColor: COLORS.corBotoes }}
                        unselectedStyle={{ backgroundColor: COLORS.corCard }}
                        markerStyle={{
                            backgroundColor: COLORS.corBotoes,
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: COLORS.branco,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.15,
                            shadowRadius: 3,
                            elevation: 3,
                        }}
                        containerStyle={{ height: 40 }}
                        trackStyle={{ height: 4, borderRadius: 2 }}
                        allowOverlap={false}
                        snapped
                    />
                </View>
            </View>

            {/* 2. Tipo de propriedade */}
            <View style={propertyStyles.propertyTypeCard}>
                <Text style={propertyStyles.propertyTypeTitle}>Tipo de propriedade</Text>
                <View style={propertyStyles.chipsContainer}>
                    {ALL_PROPERTY_TYPES.map((type) => (
                        <PropertyChip
                            key={type}
                            label={type}
                            isActive={selectedTypes.includes(type)}
                            onPress={() => togglePropertyType(type)}
                        />
                    ))}
                </View>
            </View>

            {/* 3. Outros Requisitos (expansível) */}
            <View style={propertyStyles.othersCard}>
                <TouchableOpacity
                    style={propertyStyles.othersHeader}
                    onPress={() => setIsOthersExpanded(prev => !prev)}
                    activeOpacity={0.8}
                >
                    <View style={propertyStyles.othersHeaderLeft}>
                        <Icon name="options-outline" size={20} color={COLORS.corIconsTexto} />
                        <Text style={propertyStyles.othersTitle}>Outros Requisitos</Text>
                    </View>
                    <Icon
                        name={isOthersExpanded ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={COLORS.corIconsTexto}
                    />
                </TouchableOpacity>

                {isOthersExpanded && (
                    <>
                        <View style={propertyStyles.othersDivider} />
                        <View style={propertyStyles.othersContent}>
                            <RequirementToggle
                                label="Elevador"
                                value={elevator}
                                onValueChange={setElevator}
                            />
                            <RequirementToggle
                                label="Garagem"
                                value={garage}
                                onValueChange={setGarage}
                            />
                            <RequirementToggle
                                label="Piscina"
                                value={pool}
                                onValueChange={setPool}
                            />
                            <RequirementToggle
                                label="Mobilado"
                                value={furnished}
                                onValueChange={setFurnished}
                                showDivider={false}
                            />
                        </View>
                    </>
                )}
            </View>

        </View>
    );
};

export default idealSpaceFilters;
