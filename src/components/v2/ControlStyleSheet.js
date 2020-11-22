import {StyleSheet} from "react-native";
import theme from "../../styles";

const styles = StyleSheet.create({
    title: {fontSize: 14, fontFamily: "IRANSansMobile_Bold", padding: 10},
    item: {
        padding: 0,
        margin: 0,
        // paddingRight : 5,
        marginLeft: -1,
        width: '100%',
        borderBottomWidth: 0,
    },
    itemRadius: {
        borderRadius: 2,
    },
    label: {
        textAlign: 'right',
        width: '100%',
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        marginBottom: 10,
        color: theme.palette.text.secondary,
    },
    text: {
        textAlign: 'right',
        width: '100%',
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        // color: theme.palette.text.primary,
    },
    textJustify: {
        writingDirection: "rtl",
        textAlign: 'justify',
        fontFamily: "IRANSansMobile",
        fontSize: 12,
    },
    textSimple: {
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        // color: theme.palette.text.primary,
    },
    textFont: {
        fontFamily: "IRANSansMobile",
    },
    textCenter: {
        width: "100%",
        textAlign: "center",
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        // color: theme.palette.text.primary,
    },
    textHeader: {
        width: "100%",
        textAlign: "center",
        fontFamily: "IRANSansMobile_Bold",
        fontSize: 14,
        color: theme.palette.primary.main,
        // color: theme.palette.text.primary,
    },
    textHeaderRight: {
        width: "100%",
        textAlign: "right",
        fontFamily: "IRANSansMobile_Bold",
        fontSize: 14,
        color: theme.palette.primary.main,
        // color: theme.palette.text.primary,
    },
    textLarge: {
        width: "100%",
        textAlign: "center",
        fontFamily: "IRANSansMobile_Bold",
        fontSize: 14,
    },
    textLeft: {
        textAlign: 'left',
        width: '100%',
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        // color: theme.palette.text.primary,
    },
    labelFont: {
        fontSize: 12,
        // fontFamily: "IRANSansMobile",
    },
    input: {
        width: '100%',
        textAlign: 'right',
        paddingRight: 15,
        fontFamily: "IRANSansMobile",
        textDecorationLine: "none",
        borderWidth: 0,
        minHeight: 50,
        backgroundColor: theme.palette.background
    },
    inputDisabled: {
        width: '100%',
        textAlign: 'right',
        paddingRight: 15,
        fontFamily: "IRANSansMobile",
        textDecorationLine: "none",
        borderWidth: 0,
        minHeight: 50,
        backgroundColor: "#eee"
    },
    inputLeft: {
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 15,
        fontFamily: "IRANSansMobile",
        textDecorationLine: "none",
        borderWidth: 0,
        minHeight: 50,
        backgroundColor: theme.palette.background
    },
    inputLeftDisabled: {
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 15,
        fontFamily: "IRANSansMobile",
        textDecorationLine: "none",
        borderWidth: 0,
        minHeight: 50,
        backgroundColor: "#eee"
    },
    containerStyle: {
        height: 50,
        width: "100%"
    },
    pickerItem: {
        textAlign: 'right',
        fontSize: 12,
        fontFamily: "IRANSansMobile",
    },
    labelStyle: {
        textAlign: 'right',
    },
    inputAndroid: {
        backgroundColor: 'transparent',
        width: '100%',
        margin: 0,
        textAlign: 'right',
        paddingRight: 15,
        fontSize: 12,
        fontFamily: "IRANSansMobile",
        textDecorationLine: "none",
        borderWidth: 1,
        minHeight: 50,
    },
    iconContainer: {
        top: 13,
        left: 5,
        width: 25,
    },
    icon: {
        // color: theme.palette.text.secondary,
        fontSize: 25
    },
    iconSuccess: {
        fontSize: 25,
        color: theme.palette.success.main,
        paddingLeft: 10
    },
    iconAction: {
        fontSize: 25,
        color: theme.palette.action.active,
        paddingLeft: 10
    },
    iconError: {
        color: theme.palette.error.main,
        fontSize: 20,
        paddingLeft: 10
    },
    pickerIcon: {
        color: theme.palette.text.secondary,
        fontSize: 20,
        paddingLeft: 10
    },
    wheelPicker: {
        width: 150,
        height: 150,
        fontFamily: "IRANSansMobile",
    },
    wheelPickerItem: {
        fontFamily: "IRANSansMobile",
        color: "#000",
        fontSize: 20
    },
    thumbnail: {width: 35, height: 35, aspectRatio: 3 / 4},
    body: {alignItems: 'flex-end'},
    right: {maxWidth: 50, marginLeft: 5},
    headerText: {
        fontFamily: "IRANSansMobile_Bold",
        fontSize: 12
    },
    itemText: {
        width: '100%',
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        color: "#000",
    },
    itemTextSelected: {
        width: '100%',
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        color: theme.palette.primary.main,
    },
    accordionHeaderText: {
        flex: 1,
        fontFamily: "IRANSansMobile",
        fontSize: 12
    }

});


export default styles;
