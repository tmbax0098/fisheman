import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, CardItem, Text} from 'native-base';
import TextBox from "./v2/TextBox";
import PrimaryButton from './PrimaryButton';
import SigninApi from '../api/SigninApi';
import {ContextAccountConsumer} from '../context/ContextAccount';
import {Redirect} from 'react-router-native';
import Message from "../api/tools/Message";
import showMessage from "../api/tools/showMessage";
import TransformAccount from "../transform/TransformAccount";
import PagePath from "../pages/PagePath";
import theme from "../styles";
import PasswordBox from "./v2/PasswordBox";
import {ContextPageConsumer} from "../context/ContextPage";


const dic = {
    lblLogin: 'ورود',
    lblPassword: 'گذرواژه',
    lblUsername: 'نام کاربری',

    errorValidationMessage: 'اطلاعات را کامل کنید',
};

const checkUsernameError = (value) => {
    if (typeof value !== "string") {
        return true;
    }
    return value.length < 6 || value.length > 15;
};
const checkPasswordError = (value) => {

    if (typeof value !== "string") {
        return true;
    }
    if (value.length > 20) {
        return true;
    }
    return (value.length < 5);
};

const transformAccount = new TransformAccount();

export default function Signin() {

    const [state, setState] = useState({
        username: null,
        password: null,
    });

    const [redirect, setRedirect] = useState(null);
    const [wait, setWait] = useState(false);

    const validate = (setAccount, setDefaultPage) => {
        if (!checkUsernameError(state.username) && !checkPasswordError(state.password)) {
            setWait(true);
            SigninApi(state, (data, status, error) => {
                setWait(false);
                if (status) {
                    setAccount(data, () => {
                        setTimeout(() => {
                            if (transformAccount.get(data).phoneNumberConfirmed) {
                                setDefaultPage();
                                setRedirect(PagePath.panel.index);
                            } else {
                                setRedirect(PagePath.confirmPhoneNumber);
                            }
                        }, 1000)
                    });

                } else {
                    if (error) {
                        showMessage(Message.global, false);
                    } else {
                        showMessage(data, false);
                    }
                }
            });
        }
    };

    return (
        <View style={styles.view}>
            {redirect !== null ? <Redirect to={redirect}/> : redirect}
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <TextBox
                        visible={true}
                        minLength={6}
                        maxLength={15}
                        text={dic.lblUsername}
                        disabled={wait}
                        values={[state.username === null ? "" : state.username]}
                        onChange={value => setState({...state, username: value})}
                    />
                </CardItem>
                {state.username !== null && checkPasswordError(state.username) ?
                    <CardItem style={{...styles.cardItem, marginTop: 0, paddingTop: 0}}>
                        <Text style={{
                            paddingHorizontal: 5,
                            textAlign: 'right',
                            flex: 1,
                            fontSize: 10,
                            color: theme.palette.error.main
                        }}>نام کاربری معتبر نمی باشد.</Text>
                    </CardItem> : null}
                <CardItem style={styles.cardItem}>
                    <PasswordBox
                        visible={true}
                        minLength={6}
                        maxLength={20}
                        text={dic.lblPassword}
                        disabled={wait}
                        values={[state.password === null ? "" : state.password]}
                        onChange={value => setState({...state, password: value})}
                    />
                </CardItem>
                {state.password !== null && checkPasswordError(state.password) ?
                    <CardItem style={{...styles.cardItem, marginTop: 0, paddingTop: 0}}>
                        <Text style={{
                            paddingHorizontal: 5,
                            textAlign: 'right',
                            flex: 1,
                            fontSize: 10,
                            color: theme.palette.error.main
                        }}>گذرواژه معتبر نمی باشد.</Text>
                    </CardItem> : null}
                <CardItem style={styles.cardItem}>
                    <ContextPageConsumer>
                        {({setDefaultPage}) => (
                            <ContextAccountConsumer>
                                {({setAccount}) => (
                                    <PrimaryButton
                                        additionalStyle={{width: '100%'}}
                                        label={dic.lblLogin}
                                        onPress={() => validate(setAccount, setDefaultPage)}
                                        wait={wait}/>
                                )}
                            </ContextAccountConsumer>
                        )}
                    </ContextPageConsumer>
                </CardItem>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    card: {
        elevation: 0,
        borderWidth: 0,
        paddingHorizontal: 20,
        borderColor: "transparent",
        backgroundColor: "transparent"
    },
    cardItem: {
        backgroundColor: "transparent",
    },
    logo: {
        fontSize: 46,
    },
});

