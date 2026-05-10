import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './globalStyles'; 

export const filterStyles = StyleSheet.create({
    content: { 
        flex: 1, 
        paddingHorizontal: 20 
    },
    headerSection: { 
        marginTop: 20 
    },
    title: { 
        fontSize: FONTS.size.h2,     
        fontFamily: FONTS.bold,       
        color:  COLORS.corIconsTexto
    },
    subtitle: { 
        fontSize: FONTS.size.body,   
        fontFamily: FONTS.regular,    
        color: COLORS.corIconsTexto, 
        marginTop: 5, 
        marginBottom: 20 
    },
    
    locationInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.branco, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.corCard,        
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    locationIcon: {
        marginRight: 10,
    },
    locationInput: {
        flex: 1,
        fontSize: FONTS.size.largeBody,    
        fontFamily: FONTS.regular,          
        color: COLORS.corIconsTexto,       
    },
    
    // --- CHECKBOX ---
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25, 
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.corIconsTexto, 
        backgroundColor: COLORS.corCard,    
        borderRadius: 2, 
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: FONTS.size.body,     
        fontFamily: FONTS.regular,     
        color: COLORS.corIconsTexto,      
    },


    
    // Estilos do Switcher (Botões de Abas)
   tabContainer: { 
        flexDirection: 'row', 
        backgroundColor: COLORS.branco, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: COLORS.corCard, 
        padding: 6,
        marginBottom: 20,
    },
    tabButton: { 
        flex: 1, 
        paddingVertical: 15, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8, 
    },
    activeTab: { 
        backgroundColor: COLORS.corIconsTexto, 
        elevation: 2, 
    },
    activeTabText: { 
        color: COLORS.branco, 
        fontFamily: FONTS.bold, 
        textAlign: 'center',
        fontSize: FONTS.size.body,
    },
    inactiveTabText: { 
        color: COLORS.corIconsTexto, 
        fontFamily: FONTS.regular,
        textAlign: 'center',
        fontSize: FONTS.size.body,
    },
    
    filtersContainer: { 
        marginTop: 20, 
        paddingBottom: 20 
    },
    
    // Botão de submissão
    submitSection: { 
        paddingVertical: 15,
        paddingHorizontal: 20,
    }
});