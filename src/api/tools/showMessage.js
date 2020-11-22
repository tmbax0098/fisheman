//import Toast from "react-native-simple-toast";
import Toast from 'react-native-toast-message'

//const showMessage = (message = "" , state = true , onShow=() => {} ,onHide=() => {} ) => Toast.show(message, Toast.SHORT, Toast.BOTTOM);

const showMessage = (message, state = true, onShow = () => {
}, onHide = () => {
}) => Toast.show({
    type: state ? 'success' : 'error',
    position: 'bottom',
    // text1: message + '',
    text2: message + '',
    visibilityTime: 4000,
    autoHide: true,
    // topOffset: 30,
    bottomOffset: 40,
    onShow: onShow,
    onHide: onHide
});


export default showMessage
