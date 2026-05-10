import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from './globalStyles';

export const homeStyles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 10,
    },

    cardContainer: {
        width: 342,
        height: 618,
    },

    card: {
        flex: 1,
        justifyContent: 'space-between',
    },

    cardImage: {
        borderRadius: 36,
    },

    overlay: {
        flex: 1,
        borderRadius: 36,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.18)',
    },

    locationBadge: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        gap: 6,
    },

    locationBadgeText: {
        color: COLORS.branco,
        fontFamily: FONTS.regular,
        fontSize: 14,
    },

    contentTop: {
        marginTop: -140,
    },

    title: {
        color: COLORS.branco,
        fontFamily: FONTS.bold,
        fontSize: 38,
        lineHeight: 48,
        width: '85%',
    },

    tagsRow: {
        flexDirection: 'row',
        marginTop: 14,
    },

    orangeTag: {
        backgroundColor: COLORS.corBotoes,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
    },

    orangeTagText: {
        color: COLORS.branco,
        fontFamily: FONTS.bold,
        fontSize: 11,
    },

    darkTag: {
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },

    darkTagText: {
        color: COLORS.branco,
        fontFamily: FONTS.bold,
        fontSize: 11,
    },

    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 240,
    },

    addressContainer: {
        flex: 1,
    },

    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    addressText: {
        color: COLORS.branco,
        fontFamily: FONTS.regular,
        fontSize: 16,
        marginLeft: 4,
    },
    cityText: {
        color: COLORS.branco,
        fontFamily: FONTS.regular,
        fontSize: 15,
        marginLeft: 20,
        marginTop: 2,
    },

    priceContainer: {
        alignItems: 'flex-end',
    },

    price: {
        color: COLORS.corBotoes,
        fontFamily: FONTS.bold,
        fontSize: 42,
    },

    priceMonth: {
        color: COLORS.branco,
        fontFamily: FONTS.regular,
        fontSize: 14,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },

    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 26,
    },

    infoText: {
        color: COLORS.branco,
        fontFamily: FONTS.regular,
        fontSize: 16,
        marginLeft: 6,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        gap: 32,
    },

    rejectButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.branco,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },

    favoriteButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.corBotoes,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});