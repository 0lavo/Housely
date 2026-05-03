
import { StyleSheet} from 'react-native';

export const COLORS = {
    corCard : '#CDE0EE',
    corFundo : '#E0ECF4',
    corIconsTexto : '#235F76',
    corBotoes : '#FD761A',
    corAtiva : '#FD761A',
};

export const FONTS = {
    regular: 'Alexandria-Regular',
    bold : 'Alexandria-Bold',
    size: {
        body: 32,
        title: 48,
    }
}

export const globalStyles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.corCard,
    },
    screen:{
        flex: 1,
        backgroundColor: COLORS.corFundo,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})