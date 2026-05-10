import React from 'react';
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";

const PropertyDetailsScreen = ({ navigation }: any) => (
    <View style={globalStyles.screen}>
        
        <View style={globalStyles.centeredContainer}>
            <Text>pagina detalhes</Text>
        </View>

        <AppFooter navigation={navigation} activeScreen="PropertyDetails" />
        
    </View>
);

export default PropertyDetailsScreen;