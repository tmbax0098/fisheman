import AlertSheet from "./v2/AlertSheet";
import {Body, Button, Col, Left, Right, Row} from "native-base";
import {Text} from "react-native";
import styles from "./v2/ControlStyleSheet";
import React from "react";


export default function ExitAccountAlert({refSheet, onCancel, onExit}) {
    return (
        <AlertSheet
            refSheet={refSheet}
            height={130}
            component={
                <Col>
                    <Row>
                        <Text style={styles.textLarge}>
                            آیا مایل به خروج از حساب کاربری خود هستید ؟
                        </Text>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Left style={{flex: 1}}>
                            <Button
                                danger
                                transparent
                                onPress={onExit}>
                                <Text style={{...styles.textLarge, color: "red"}}>بله</Text>
                            </Button>
                        </Left>

                        <Body/>
                        <Right style={{flex: 1}}>
                            <Button onPress={onCancel} success transparent>
                                <Text style={{...styles.textLarge, color: "green"}}>خیر</Text>
                            </Button>
                        </Right>
                    </Row>
                </Col>
            }/>

    );
};