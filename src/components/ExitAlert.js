import React, {useEffect, useRef} from 'react';
import AlertSheet from "./v2/AlertSheet";
import {BackHandler} from "react-native";
import {Body, Button, Col, Left, Right, Row, Text} from "native-base";
import styles from "./v2/ControlStyleSheet";

const empty = () => console.log("")

export default function ExitAlert({onOpen = empty, onClose = empty, label = 'آیا از برنامه خارج می شوید ؟'}) {

    const refSheet = useRef(null);

    const closeSheet = () => {
        if (refSheet !== null && refSheet.current !== null) {
            refSheet.current.close();
            onClose();
        }
    }
    const openSheet = () => {
        if (refSheet !== null && refSheet.current !== null) {
            refSheet.current.open();
            onOpen();
        }
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', openSheet)
    }, []);

    return (
        <AlertSheet
            refSheet={refSheet}
            height={130}
            component={
                <Col>
                    <Row>
                        <Text style={styles.textLarge}>{label}</Text>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Left style={{flex: 1}}>
                            <Button danger transparent onPress={() => {
                                closeSheet();
                                BackHandler.exitApp()
                            }}>
                                <Text style={{...styles.textLarge, color: "red"}}>بله</Text>
                            </Button>
                        </Left>
                        <Body/>
                        <Right style={{flex: 1}}>
                            <Button success transparent onPress={closeSheet}>
                                <Text style={{...styles.textLarge, color: "green"}}>خیر</Text>
                            </Button>
                        </Right>
                    </Row>
                </Col>
            }/>
    );
};
