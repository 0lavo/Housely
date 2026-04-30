// src/components/AppFooter.tsx

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../styles/globalStyles";

interface AppFooterProps {
    navigation: any;
    activeScreen: string;
}

const AppFooter: React.FC<AppFooterProps> = ({ navigation, activeScreen }) => {

    const tabs = [
        {name: 'Home', icon: '' , screen: 'Home'},
        {name: 'Filter', icon: '' , screen: 'Filter'},
        {name: 'Favorite', icon: '' , screen: 'Favorite'},
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
        height: 170,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tab: {
        alignItems: 'center',
    },
    label: {
        color: COLORS.corIconsTexto,
        fontFamily: FONTS.regular,
        fontSize: FONTS.size.body
    },
    labelActive: {
        backgroundColor: COLORS.corCard,
    },
});


export default AppFooter;