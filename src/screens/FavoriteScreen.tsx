import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";


const FavoriteScreen = ({navigation}: any) => (

    <View style={globalStyles.screen}>
        <AppHeader navigation={navigation}/>
        <View style={globalStyles.centeredContainer}>
            <Text>Favorite Screen</Text>
        </View>
        <AppFooter navigation={navigation} activeScreen="Favorite"/>
    </View>
)

export default FavoriteScreen;