import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";


const FilterScreen = ({navigation}: any) => (
    <View style={globalStyles.screen}>
        <AppHeader navigation={navigation}/>
        <View style={globalStyles.centeredContainer}>
            <Text>Filter Screen</Text>
        </View>
        <AppFooter navigation={navigation} activeScreen="Favorite"/>
    </View>
)


export default FilterScreen;