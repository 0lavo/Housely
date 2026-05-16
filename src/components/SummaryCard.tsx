import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../styles/globalStyles'; 

// props que este cartão vai receber
interface SummaryCardProps {
    title: string;
    value: string | number;
    label: string;
    onReset?: () => void;
}


const SummaryCard = ({ title, value, label, onReset }: SummaryCardProps) => {
    return (
        <View style={[styles.card, { backgroundColor: COLORS.corCard }]}>
            <Text style={[styles.title, { color: COLORS.corIconsTexto }]}>{title}</Text>
            <Text style={[styles.value, { color: COLORS.corIconsTexto }]}>{value}</Text>
            <Text style={[styles.label, { color: COLORS.corIconsTexto }]}>{label}</Text>


            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={onReset}>
                    <Text style={[styles.resetText, { color: COLORS.branco }]}>Reset</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        flex: 1, // Faz com que os cartões dividam o espaço disponível igualmente
        padding: 16,
        borderRadius: 12,
        elevation: 2, // Sombra para Android
    },
    title: {
        fontSize: FONTS.size.small,
        fontFamily: FONTS.regular,
        marginBottom: 4,
    },
    value: {
        fontSize: FONTS.size.h1,
        fontFamily: FONTS.bold,
        marginBottom: 2,
    },
    label: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    resetButton: {
        backgroundColor: COLORS.corBotoes,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    resetText: {
        fontSize: FONTS.size.small,
        fontFamily: FONTS.regular,

    }
});

export default SummaryCard;