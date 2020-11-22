import Toast from 'react-native-toast-message'
import {Icon, Text, View} from "native-base";
import styles from "./v2/ControlStyleSheet";
import React from "react";


const toastConfig = {
    'success': (internalState) => (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 5,
            backgroundColor: '#eee',
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            shadowColor: "#000",
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 10,
        }}>
            <View>
                <Text style={{...styles.text, color: 'green'}}>{internalState.text2}</Text>
            </View>
            <View style={{width: 25, marginLeft: 5}}>
                <Icon name={'md-checkmark-circle'} style={{fontSize: 20, color: 'green'}}/>
            </View>
        </View>
    ),
    'error': (internalState) => (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 5,
            backgroundColor: '#eee',
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            shadowColor: "#000",
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 10,
        }}>
            <View>
                <Text style={{...styles.text, color: 'red'}}>{internalState.text2}</Text>
            </View>
            <View style={{width: 25, marginLeft: 5}}>
                <Icon name={'close-circle'} style={{fontSize: 20, color: 'red'}}/>
            </View>
        </View>
    ),
    'info': (internalState) => (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 5,
            backgroundColor: '#eee',
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            shadowColor: "#000",
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 10,
        }}>
            <View>
                <Text style={{...styles.text, color: 'blue'}}>{internalState.text2}</Text>
            </View>
            <View style={{width: 25, marginLeft: 5}}>
                <Icon name={'close-circle'} style={{fontSize: 20, color: 'blue'}}/>
            </View>
        </View>
    ),
    'any_custom_type': () => {
    }
}

export default function ToastRoot() {
    return (
        <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig}/>
    );
};