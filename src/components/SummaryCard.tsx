import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../styles/globalStyles'; 

// props que este cartão vai receber
interface SummaryCardProps {
    title: string;
    value: string | number;
    label: string;
    variant: 'blue' | 'orange'; 
}


const SummaryCard = ({ title, value, label, variant }: SummaryCardProps) => {
    // para nao ter de desenhar 2 summary cards em separado:
    const isBlue = variant === 'blue';
    const bgColor = isBlue ? COLORS.corCard : COLORS.corFundoSummaryCardLaranja;
    const textColor = isBlue ? COLORS.corIconsTexto : COLORS.corBotoes;

    return (
        <View style={[styles.card, { backgroundColor: bgColor }]}>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            <Text style={[styles.value, { color: textColor }]}>{value}</Text>
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
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
    }
});

export default SummaryCard;