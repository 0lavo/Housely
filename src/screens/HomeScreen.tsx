// src/screens/HomeScreen.tsx

import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";


const HomeScreen = ({navigation}: any) => (
    <View style={globalStyles.screen}>
        <AppHeader navigation={navigation}/>
        <View style={globalStyles.centeredContainer}>
            <Text>Home Screen</Text>
        </View>
        <AppFooter navigation={navigation} activeScreen="Home"/>
    </View>
)


export default HomeScreen;