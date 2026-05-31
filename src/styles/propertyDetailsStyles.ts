import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './globalStyles';

export const propertyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.corFundo,
    },
    // --- HEADER ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
    },
    // --- IMAGEM PRINCIPAL ---
    imageContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    mainImage: {
        width: '100%',
        height: 280,
        borderRadius: 15,
    },
    imageBadge: {
        position: 'absolute',
        bottom: 15,
        left: 35, // 20 do padding + 15 de margem interna
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeText: {
        color: COLORS.branco,
        fontSize: 12,
        fontFamily: FONTS.regular,
        marginLeft: 6,
    },
    // --- CONTEÚDO PRINCIPAL ---
    detailsContainer: {
        paddingHorizontal: 20,
    },
    priceText: {
        fontSize: 28,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto, // Azul escuro
        marginBottom: 5,
    },
    propertyName: {
        fontSize: 22,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
        marginBottom: 10,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    locationText: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: '#888',
        marginLeft: 6,
    },
    // --- CARDS DE CARACTERÍSTICAS (GRID) ---
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    featureCard: {
        width: '48%', // Para caberem 2 por linha com um pequeno espaçamento
        backgroundColor: COLORS.branco,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    featureLabel: {
        fontSize: 10,
        fontFamily: FONTS.regular,
        color: '#888',
        textTransform: 'uppercase',
        marginTop: 8,
        marginBottom: 4,
    },
    featureValue: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
    },
    // --- SEÇÃO SOBRE ---
    aboutTitle: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
        marginBottom: 10,
    },
    aboutDescription: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: '#666',
        lineHeight: 22,
        marginBottom: 10,
    },
    readMoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    readMoreText: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: COLORS.corIconsTexto,
        marginRight: 4,
    },
    // --- CARROSSEL DE IMAGENS ---
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: COLORS.corIconsTexto, // Cor do ponto ativo
    },
    paginationDotInactive: {
        backgroundColor: '#D3D3D3', // Cor dos pontos inativos (cinza claro)
    },
});
