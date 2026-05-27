import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles, COLORS } from "../styles/globalStyles";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

const AppHeader = ({navigation}: any) => (
    <SafeAreaView edges={['top']} style={globalStyles.safeArea}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image 
                source={require('../../assets/logo.png')} 
                resizeMode="contain" 
                style={{ width: 200, height: 120, marginTop:20 }}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    header: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: COLORS.corFundo,
    },
});

export default AppHeader;