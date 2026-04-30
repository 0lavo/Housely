// src/components/AppFooter.tsx

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { COLORS, FONTS } from "../styles/globalStyles";

interface AppFooterProps {
    navigation: any;
    activeScreen: string;
}

const AppFooter: React.FC<AppFooterProps> = ({ navigation, activeScreen }) => {

    const tabs = [
        {name: 'Filter', icon: require('../../assets/icons/filter.png') , screen: 'Filter'},
        {name: 'Home', icon: require('../../assets/icons/home.png') , screen: 'Home'},
        {name: 'Favorite', icon: require('../../assets/icons/favorite.png') , screen: 'Favorite'},
    ]
    
    //TODO Colocar a imagem certa nos icons

    return (
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
            <View style={styles.footer}>
                {tabs.map((tab) => {
                    const isActive = activeScreen === tab.screen;
                    return (
                        <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={() => navigation.navigate(tab.screen)}>
                            <Image source={tab.icon} style={styles.icon} />
                            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.corCard,
    },
    footer: {
        backgroundColor: COLORS.corCard,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.corCard,
        elevation: 5,
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
        backgroundColor: COLORS.corCard,
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