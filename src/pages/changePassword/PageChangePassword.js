import React, {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import {Body, Col, Container, Content, Header, Row, Text} from "native-base";
import {Redirect} from 'react-router-native';
import PrimaryButton from "../../components/PrimaryButton";
import styles from "../../components/v2/ControlStyleSheet";
import AlertSheet from "../../components/v2/AlertSheet";
import PagePath from "../PagePath";
import ChangePasswordApi from "../../api/ChangePasswordApi";
import showMessage from "../../api/tools/showMessage";
import PasswordBox from "../../components/v2/PasswordBox";


export default function PageChangePassword(props) {

    const refSheet = useRef(null);

    const [newPass, setNewPass] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [wait, setWait] = useState(false);
    const [back, setBack] = useState(false);

    const closeSheet = () => {
        if (refSheet !== null && refSheet.current !== null) {
            refSheet.current.close();
        }
    }
    const openSheet = () => {
        if (refSheet !== null && refSheet.current !== null) {
            refSheet.current.open();
        }
        return true;
    }

    const changePassword = () => {
        if (oldPass.trim().length >= 8 && newPass.trim().length >= 8) {
            setWait(true);
            const body = {oldPassword: oldPass, newPassword: newPass}
            ChangePasswordApi(body, (data, status, error) => {
                if (status) {
                    showMessage(data.message, data.state);
                    if (data.state) {
                        //com back to dashboard
                    }
                } else {
                    showMessage(data, false);
                }
                setWait(false);
            })
        } else {
            showMessage("فیلدهای را کامل کنید.", false);
        }
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (wait) {
                openSheet()
            } else {
                setBack(true);
            }
        });
    }, []);

    return (
        <Container>

            {back ? <Redirect to={PagePath.panel.index}/> : back}

            <Header noLeft>
                <Body>
                    <Text style={styles.textHeader}>تغییر گذرواژه</Text>
                </Body>
            </Header>
            <AlertSheet
                refSheet={refSheet}
                height={130}
                component={
                    <Col style={{padding: 10}}>
                        <Row>
                            <Text style={styles.textCenter}>لطفا تا پایان عملیات منتظر بمانید.</Text>
                        </Row>
                        <Row>
                            <PrimaryButton label={"متوجه شدم"} onPress={closeSheet} additionalStyle={{flex: 1}}/>
                        </Row>
                    </Col>
                }/>
            <Content padder>
                <Col style={{padding: 20}}>
                    <Row style={{marginTop: 30}}>
                        <PasswordBox
                            visible={true}
                            maxLength={15}
                            minLength={8}
                            placeholder={"گذرواژه"}
                            text={"گذرواژه کنونی"}
                            values={[oldPass]}
                            onChange={setOldPass}
                        />
                    </Row>
                    <Row style={{marginTop: 30}}>
                        <PasswordBox
                            visible={true}
                            maxLength={15}
                            minLength={8}
                            placeholder={"گذرواژه"}
                            text={"گذرواژه جدید"}
                            values={[newPass]}
                            onChange={setNewPass}
                        />
                    </Row>
                    <Row style={{marginTop: 30}}>
                        <PrimaryButton
                            additionalStyle={{flex: 1}}
                            visible={true}
                            onPress={changePassword}
                            wait={wait}
                            label={"تغییر گذرواژه"}
                        />
                    </Row>
                </Col>
            </Content>
        </Container>
    );
};
