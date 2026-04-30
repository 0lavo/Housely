// src/screens/HomeScreen.tsx

import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";


const HomeScreen = ({navigation}: any) => (
  <View style={globalStyles.screen}>
        <View style={globalStyles.centeredContainer}>
            <Text>Home Screen</Text>
        </View>
        <AppFooter navigation={navigation} activeScreen="Favorite"/>
    </View>
)


export default HomeScreen;