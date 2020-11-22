import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Signin from './../../components/Signin';
import StorageAccount from "../../storage/StorageAccount";
import theme from "../../styles";

const storageAccount = new StorageAccount();

export default function PageSignin() {

    storageAccount.clearAll();

    return (<View style={styles.view}>
        <Image
            style={styles.image}
            resizeMode={'contain'}
            source={require('../../../public/splashlogo.png')}/>
        <Signin/>
    </View>);
};


const styles = StyleSheet.create({

    view: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background,
    },
    image: {
        width: 200,
        height: 200,
    },


});
