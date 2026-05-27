import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles, COLORS, FONTS } from "../styles/globalStyles";
import { endOfListModalStyles } from "../styles/endOfListModalStyles";

type Props = {
    visible: boolean;
    onGoToFilters: () => void;
    onClose: () => void;
};

const FirstTimeModal = ({ visible, onGoToFilters, onClose }: Props) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={endOfListModalStyles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={endOfListModalStyles.card}>

                            <View style={endOfListModalStyles.iconCircle}>
                                <Icon name="sentiment-dissatisfied" size={60} color={COLORS.corBotoes} />
                            </View>

                            <Text style={endOfListModalStyles.title}>
                                Bem-vindo ao Housely!
                            </Text>

                            <Text style={endOfListModalStyles.subtitle}>
                                É a tua primeira vez na app. Para uma experiência melhor,
                                seleciona os teus filtros.
                            </Text>

                            <TouchableOpacity
                                style={[globalStyles.primaryButton, endOfListModalStyles.button]}
                                onPress={onGoToFilters}
                            >
                                <Icon name="tune" size={20} color={COLORS.branco} />
                                <Text style={[globalStyles.primaryButtonText, { marginLeft: 8 }]}>
                                    Selecionar filtros
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginTop: 12, paddingVertical: 10 }}
                                onPress={onClose}
                            >
                                <Text style={{
                                    fontFamily: FONTS.bold,
                                    fontSize: FONTS.size.body,
                                    color: COLORS.corIconsTexto,
                                    opacity: 0.7,
                                }}>
                                    Agora não
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default FirstTimeModal;