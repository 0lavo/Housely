import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";


const FavoriteScreen = ({navigation}: any) => (

    <View style={globalStyles.container}>
        <Text>Favorite Screen</Text>
        <AppFooter navigation={navigation} activeScreen="Favorite"/>
    </View>
)

export default FavoriteScreen;