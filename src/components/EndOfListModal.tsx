import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles, COLORS } from "../styles/globalStyles";
import { endOfListModalStyles } from "../styles/endOfListModalStyles";

type Props = {
    visible: boolean;
    onRestart: () => void;
    onClose: () => void;
};

const EndOfListModal = ({ visible, onRestart, onClose }: Props) => {
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
                                Não há mais casas com esses filtros!
                            </Text>

                            <Text style={endOfListModalStyles.subtitle}>
                                Já viu todas as propriedades disponíveis.
                                Quer mudar os filtros?
                            </Text>

                            <TouchableOpacity
                                style={[globalStyles.primaryButton, endOfListModalStyles.button]}
                                onPress={onRestart}
                            >
                                <Icon name="refresh" size={20} color={COLORS.branco} />
                                <Text style={[globalStyles.primaryButtonText, { marginLeft: 8 }]}>
                                    Voltar aos filtros
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default EndOfListModal;