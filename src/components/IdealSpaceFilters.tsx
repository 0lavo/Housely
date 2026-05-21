import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../styles/globalStyles";
import { propertyStyles } from '../styles/idealSpaceFiltersStyles';

// --- Tipos ---
export type PropertyType = 'Quarto' | 'T0/Studio' | 'T1' | 'T2' | 'T3';

const ALL_PROPERTY_TYPES: PropertyType[] = ['T0/Studio', 'T1', 'T2', 'T3'];

export const MIN_BUDGET = 100;
export const MAX_BUDGET = 3500;

type IdealSpaceFiltersProps = {
    budgetRange: [number | null, number | null];
    setBudgetRange: (range: [number | null, number | null]) => void;
    selectedTypes: PropertyType[];
    setSelectedTypes: Dispatch<SetStateAction<PropertyType[]>>;
    elevator: boolean;
    setElevator: (value: boolean) => void;
    garage: boolean;
    setGarage: (value: boolean) => void;
    swimmingPool: boolean;
    setSwimmingPool: (value: boolean) => void;
    furnished: boolean;
    setFurnished: (value: boolean) => void;
} 

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
const IdealSpaceFilters = (idealSpaceFilters: IdealSpaceFiltersProps) => {

    const [isOthersExpanded, setIsOthersExpanded] = useState(true);

    const togglePropertyType = (type: PropertyType) => {
        idealSpaceFilters.setSelectedTypes(prev =>
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
                        {formatBudget(idealSpaceFilters.budgetRange[0] ?? MIN_BUDGET)} - {formatBudget(idealSpaceFilters.budgetRange[1] ?? MAX_BUDGET)}
                    </Text>
                </View>
                <View style={propertyStyles.sliderContainer}>
                    <MultiSlider
                        values={[idealSpaceFilters.budgetRange[0] ?? MIN_BUDGET, idealSpaceFilters.budgetRange[1] ?? MAX_BUDGET]}
                        min={MIN_BUDGET}
                        max={MAX_BUDGET}
                        step={50}
                        onValuesChange={(values) => idealSpaceFilters.setBudgetRange([values[0], values[1]])}
                        selectedStyle={{ backgroundColor: COLORS.corBotoes }}
                        unselectedStyle={{ backgroundColor: COLORS.corCard }}
                        markerStyle={propertyStyles.multiSlider}
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
                            isActive={idealSpaceFilters.selectedTypes.includes(type)}
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
                                value={idealSpaceFilters.elevator}
                                onValueChange={idealSpaceFilters.setElevator}
                            />
                            <RequirementToggle
                                label="Garagem"
                                value={idealSpaceFilters.garage}
                                onValueChange={idealSpaceFilters.setGarage}
                            />
                            <RequirementToggle
                                label="Piscina"
                                value={idealSpaceFilters.swimmingPool}
                                onValueChange={idealSpaceFilters.setSwimmingPool}
                            />
                            <RequirementToggle
                                label="Mobilado"
                                value={idealSpaceFilters.furnished}
                                onValueChange={idealSpaceFilters.setFurnished}
                                showDivider={false}
                            />
                        </View>
                    </>
                )}
            </View>

        </View>
    );
};

export default IdealSpaceFilters;
