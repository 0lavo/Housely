import { View, Text, StyleSheet, ScrollView} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import { styles } from '../styles/favoriteScreenStyles';
import SummaryCard from '../components/SummaryCard';
import PropertyCard from "../components/PropertyCard";


const FavoriteScreen = ({navigation}: any) => (

    <View style={globalStyles.screen}>
        <AppHeader navigation={navigation}/>


        <ScrollView style={styles.contentContainer}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.title}>Favoritos</Text>
                <Text style={styles.subtitle}>
                   Reveja as suas propriedades favoritas antes de dar o próximo passo
                </Text>
            </View>

            {/* Secção Cartões de Resumo */}
            <View style={styles.summaryContainer}>
                <SummaryCard 
                    title="Total Salvo"
                    value="12"
                    label="Propriedades"
                    onReset={() => console.log('Botão de reset clicado!')}
                />
            </View>


            <View style={{ paddingHorizontal: 20 }}>
                <PropertyCard 
                    imageUrl={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80' }} // Link de teste
                    title="Azure Skyline Penthouse"
                    price="$4,500/mo"
                    address="Downtown, Metropolis District"
                    beds={3}
                    baths={2}
                    onPressViewDetails={() => navigation.navigate('PropertyDetails')}
                />
                
                <PropertyCard 
                    imageUrl={{ uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80' }} // Link de teste
                    title="Willow Creek Estate"
                    price="$1,250,000"
                    address="Green Valley, Suburbia"
                    beds={5}
                    baths={4}
                    onPressViewDetails={() => navigation.navigate('PropertyDetails')}
                />
            </View>


            
        </ScrollView>


        <AppFooter navigation={navigation} activeScreen="Favorite"/>
    </View>
)

export default FavoriteScreen;