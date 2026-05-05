import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './globalStyles'; 

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1, 
    },
    headerTextContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    title: {
        fontSize: FONTS.size.h2,
        fontFamily: FONTS.bold,       
        color: COLORS.corIconsTexto,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: FONTS.size.body,
        fontFamily: FONTS.regular,
        color: COLORS.corIconsTexto, 
        lineHeight: 20,
    },
    summaryContainer: {
        flexDirection: 'row', // Coloca os elementos lado a lado (horizontalmente)
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 25, // Dá espaço antes de começarem as casas
    },
});