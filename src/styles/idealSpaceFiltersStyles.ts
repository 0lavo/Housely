import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './globalStyles';

export const propertyStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    multiSlider: {
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
    },

    // --- ESTILOS DO SLIDER DE ORÇAMENTO ---
    budgetCard: {
        backgroundColor: COLORS.branco,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.corCard,
        padding: 15,
        marginBottom: 15,
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    budgetTitle: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
    },
    budgetRange: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
    },
    sliderContainer: {
        paddingHorizontal: 30,
    },

    // --- ESTILOS DOS CHIPS DE TIPO DE PROPRIEDADE ---
    propertyTypeCard: {
        backgroundColor: COLORS.branco,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.corCard,
        padding: 15,
        marginBottom: 15,
    },
    propertyTypeTitle: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
        marginBottom: 12,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    chipActive: {
        backgroundColor: COLORS.corBotoes,
    },
    chipInactive: {
        backgroundColor: COLORS.corCard,
    },
    chipTextActive: {
        fontSize: FONTS.size.small,
        fontFamily: FONTS.bold,
        color: COLORS.branco,
    },
    chipTextInactive: {
        fontSize: FONTS.size.small,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
    },
    chipCloseIcon: {
        marginLeft: 2,
    },

    // --- ESTILOS DA SECÇÃO "OUTROS REQUISITOS" ---
    othersCard: {
        backgroundColor: COLORS.branco,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.corCard,
        marginBottom: 15,
        overflow: 'hidden',
    },
    othersHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    othersHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    othersTitle: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
    },
    othersDivider: {
        height: 1,
        backgroundColor: COLORS.corCard,
        marginHorizontal: 15,
    },
    othersContent: {
        paddingHorizontal: 15,
        paddingBottom: 5,
    },
    requirementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
    },
    requirementText: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto,
    },
    requirementDivider: {
        height: 1,
        backgroundColor: COLORS.corCard,
    },
});
