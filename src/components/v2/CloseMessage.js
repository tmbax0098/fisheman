import {Body, Button, Col, Left, Right, Row, Text} from "native-base";
import React from "react";
import styles from "./ControlStyleSheet";


const CloseMessage = ({message, onAccept, onReject}) => {


    return (
        <Col>
            <Row>
                <Text style={styles.textLarge}>{message}</Text>
            </Row>
            <Row>
                <Left style={{flex: 1}}>
                    <Button success transparent onPress={onAccept}>
                        <Text style={styles.textLarge}>بله</Text>
                    </Button>
                </Left>
                <Body/>
                <Right style={{flex: 1}}>
                    <Button danger transparent onPress={onReject}>
                        <Text style={styles.textLarge}>خیر</Text>
                    </Button>
                </Right>
            </Row>
        </Col>)
}

export default React.memo(CloseMessage)
