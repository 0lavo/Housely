// src/components/AppFooter.tsx

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, globalStyles } from "../styles/globalStyles";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AppFooterProps {
    navigation: any;
    activeScreen: string;
}

const AppFooter: React.FC<AppFooterProps> = ({ navigation, activeScreen }) => {

    const tabs = [
        {name: 'Filter', icon: 'filter-list', screen: 'Filter'}, // Nomes da biblioteca
        {name: 'Home', icon: 'home', screen: 'Home'},
        {name: 'Favorite', icon: 'favorite', screen: 'Favorite'},
    ]

    return (
        <SafeAreaView edges={['bottom']} style={globalStyles.safeArea}>
            <View style={styles.footer}>
                {tabs.map((tab) => {
                    const isActive = activeScreen === tab.screen;
                    return (
                        <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={() => navigation.navigate(tab.screen)}>
                            <Icon 
                            name={tab.icon} 
                            size={24} 
                            color={isActive ? COLORS.corAtiva : COLORS.corIconsTexto} 
                            />
                            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    footer: {
        backgroundColor: COLORS.corCard,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.corCard,
        //elevation: 2,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 8,
    },
    label: {
        color: COLORS.corIconsTexto,
        fontFamily: FONTS.regular,
        fontSize: 12,
        marginTop: 2,
    },
    labelActive: {
        fontFamily: FONTS.bold,
    },
    icon: {
        color: COLORS.corIconsTexto,
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});


export default AppFooter;