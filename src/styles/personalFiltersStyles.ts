import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './globalStyles';

export const personalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Estilo base para os "cards" das opções
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.branco,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.corCard,
        padding: 15,
        marginBottom: 15,
    },
    iconContainer: {
        backgroundColor: COLORS.corCard,
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
        marginBottom: 2,
    },
    optionSubtitle: {
        fontSize: FONTS.size.small,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto, // Cinza suave para os subtítulos
    },
    
    // --- ESTILOS DO CARD DE GÉNERO ---
    genderCard: {
        backgroundColor: COLORS.branco,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.corCard,
        padding: 15,
        marginBottom: 15,
    },
    genderTitle: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
        marginBottom: 10,
    },
    genderButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10, // Espaçamento entre os dois botões
    },
    genderBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderBtnInactive: {
        backgroundColor: COLORS.corCard, 
    },
    genderBtnActive: {
        backgroundColor: COLORS.corBotoes, 
    },
    genderTextInactive: {
        color: COLORS.corIconsTexto,
        fontFamily: FONTS.regular,
        fontSize: FONTS.size.body,
    },
    genderTextActive: {
        color: COLORS.branco,
        fontFamily: FONTS.bold,
        fontSize: FONTS.size.body,
    },

    // --- ESTILOS DO STEPPER (Companheiros de casa) ---
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepperBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepperBtnMinus: {
        backgroundColor: COLORS.branco,
        borderWidth: 1,
        borderColor: COLORS.corIconsTexto,
    },
    stepperBtnPlus: {
        backgroundColor: COLORS.corBotoes,
    },
    stepperValue: {
        fontSize: FONTS.size.largeBody,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
        marginHorizontal: 15,
    }
});