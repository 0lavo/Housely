import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";


const FilterScreen = ({navigation}: any) => (

    <View style={globalStyles.container}>
        <Text>Filter Screen</Text>
        <AppFooter navigation={navigation} activeScreen="Filter"/>
    </View>
)


export default FilterScreen;