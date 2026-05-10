
import { StyleSheet} from 'react-native';

export const COLORS = {
    corCard : '#F9F9FF',
    corFundo : '#FFFFFF',
    corIconsTexto : '#235F76',
    corBotoes : '#FD761A',
    corAtiva : '#FD761A',
    corFundoSummaryCardLaranja :'#FFF1E6',
    branco : '#FFFFFF',
};

export const FONTS = {
    regular: 'Alexandria-Regular',
    bold : 'Alexandria-Bold',
    size: {
        small: 12,      // Para ícones, moradas ou textos secundários
        body: 14,       // Para texto normal, como o subtítulo "Review the properties..."
        largeBody: 16,  // Para textos de destaque moderado
        h3: 18,         // Para os títulos dos cards das casas (ex: "Azure Skyline Penthouse")
        h2: 24,         // Para títulos de páginas (ex: "Your Favorites")
        h1: 32,         // Para números grandes
    }
}

export const globalStyles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.corCard,
    },
    screen:{
        flex: 1,
        backgroundColor: COLORS.corFundo,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // --- BOTÃO PRINCIPAL GLOBAL ---
    primaryButton: {
        backgroundColor: COLORS.corBotoes,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12, // Usamos o 12 do Property para ficar mais arredondado e moderno
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // Útil caso queiras juntar um ícone ao lado do texto
    },
    primaryButtonText: {
        color: COLORS.branco,
        fontFamily: FONTS.bold,
        fontSize: 16, // Ou usa o teu FONTS.size.largeBody
    }
})