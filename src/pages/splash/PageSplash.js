import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Redirect} from 'react-router-native';
import {Spinner} from "native-base";
import PagePath from "../PagePath";
import StorageAccount from "../../storage/StorageAccount";

const storageAccount = new StorageAccount();

const PageSplash = () => {

    const [showSplash, setShowSplash] = useState(false);
    const [path, setPath] = useState(null);

    useEffect(() => {
        if (!showSplash) {
            storageAccount.isLogin()
                .then(value => {
                    if (!value) {
                        setPath(PagePath.signin)
                    } else {
                        storageAccount.isConfirmPhoneNumber()
                            .then(value => {
                                if (value) {
                                    setPath(PagePath.panel.index)
                                } else {
                                    setPath(PagePath.confirmPhoneNumber)
                                }
                            })
                            .catch(error => setPath(PagePath.signin))
                    }
                })
                .catch(error => setPath(PagePath.signin))
        } else {
            setTimeout(() => setShowSplash(false), 1000);
        }
    }, [showSplash]);


    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode={'contain'}
                source={require('../../../public/toplogo.png')}/>

            <Image
                style={styles.image}
                resizeMode={'contain'}
                source={require('../../../public/bottomlogo.png')}/>
            <Spinner inverse size={'small'}/>

            {path !== null ? <Redirect to={path}/> : null}

        </View>
    );
};

export default PageSplash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#d90f0f',
    },
    image: {width: 200, height: 200},

});
