import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './globalStyles';

export const endOfListModalStyles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.corCard,
        borderRadius: 20,
        padding: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: COLORS.corFundoSummaryCardLaranja,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: FONTS.size.h2,
        color: COLORS.corIconsTexto,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: FONTS.size.body,
        color: COLORS.corIconsTexto,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        opacity: 0.8,
    },
    button: {
        width: '100%',
    },
});