// src/screens/HomeScreen.tsx

import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";


const IdealSpace = ({navigation}: any) => (
    <View style={globalStyles.screen}>
        <View style={globalStyles.centeredContainer}>
            <Text>IdealSpace</Text>
        </View>
    </View>
)


export default IdealSpace;