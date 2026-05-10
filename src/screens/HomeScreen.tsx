// src/screens/HomeScreen.tsx

import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles, COLORS } from "../styles/globalStyles";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import { homeStyles } from '../styles/homeScreenStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';


const HomeScreen = ({navigation}: any) => (
    <View style={globalStyles.screen}>
        <AppHeader navigation={navigation}/>
        <View style={globalStyles.centeredContainer}>
            <View style={homeStyles.cardContainer}>
                <ImageBackground
                    source={require('../../assets/house.png')}
                    style={homeStyles.card}
                    imageStyle={homeStyles.cardImage}
                >
                    <View style={homeStyles.overlay}>

                        <View style={homeStyles.locationBadge}>
                            <Icon name="location-on" size={16} color={COLORS.branco} />
                            <Text style={homeStyles.locationBadgeText}>Porto, Portugal</Text>
                        </View>

                        <View style={homeStyles.contentTop}>
                            <Text style={homeStyles.title}>T1 + 1 em V.N de Gaia</Text>

                            <View style={homeStyles.tagsRow}>
                                <View style={homeStyles.orangeTag}>
                                    <Text style={homeStyles.orangeTagText}>NOVA CONSTRUÇÃO</Text>
                                </View>

                                <View style={homeStyles.darkTag}>
                                    <Text style={homeStyles.darkTagText}>MOBILIADO</Text>
                                </View>
                            </View>
                        </View>
                        <View style={homeStyles.bottomContent}>

                            <View style={homeStyles.addressContainer}>
                                <View style={homeStyles.addressRow}>
                                    <Icon name="location-on" size={16} color={COLORS.branco} />
                                    <Text style={homeStyles.addressText}>
                                        Rua de Digo Macedo, 51
                                    </Text>
                                </View>

                                <Text style={homeStyles.cityText}>Vila Nova de Gaia</Text>
                            </View>

                            <View style={homeStyles.priceContainer}>
                                <Text style={homeStyles.price}>€1.450</Text>
                                <Text style={homeStyles.priceMonth}>por mês</Text>
                            </View>
                        </View>

                        <View style={homeStyles.infoRow}>

                            <View style={homeStyles.infoItem}>
                                <Icon name="bed" size={20} color={COLORS.branco} />
                                <Text style={homeStyles.infoText}>2</Text>
                            </View>
                            <View style={homeStyles.infoItem}>
                                <Icon name="bathtub" size={20} color={COLORS.branco} />
                                <Text style={homeStyles.infoText}>1</Text>
                            </View>

                            <View style={homeStyles.infoItem}>
                                <Icon name="square-foot" size={20} color={COLORS.branco} />
                                <Text style={homeStyles.infoText}>85m²</Text>
                            </View>

                        </View>
                    </View>
                </ImageBackground>
            </View>
             <View style={homeStyles.actionsContainer}>

                <TouchableOpacity style={homeStyles.rejectButton}>
                    <Icon name="close" size={34} color="#D32F2F" />
                </TouchableOpacity>

                <TouchableOpacity style={homeStyles.favoriteButton}>
                    <Icon name="favorite" size={30} color={COLORS.branco} />
                </TouchableOpacity>

            </View>
        </View>
        <AppFooter navigation={navigation} activeScreen="Home"/>
    </View>
)


export default HomeScreen;