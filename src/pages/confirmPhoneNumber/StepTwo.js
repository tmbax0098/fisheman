import React, {useState} from "react";
import {Col, Content, Row, Text} from 'native-base';
import PrimaryButton from "../../components/PrimaryButton";
import SendVerifyCodeApi from "../../api/SendVerifyCodeApi";
import showMessage from "../../api/tools/showMessage";
import styles from "../../components/v2/ControlStyleSheet";
import Timer from "react-compound-timer";
import NumberBox from "../../components/v2/NumberBox";
import VerifyPhoneNumberApi from "../../api/VerifyPhoneNumberApi";
import {ContextAccountConsumer} from "../../context/ContextAccount";
import PagePath from "../PagePath";
import {Redirect} from "react-router-native";

const maxWaitSecond = 180;

const StepTwo = () => {

    const [path, setPath] = useState(null);

    const [code, setCode] = useState("");
    const [wait, setWait] = useState(false);
    const [again, setAgain] = useState(false);
    const [sendCode, setSendCode] = useState(false);


    return (
        <Content padder>
            {path !== null ? <Redirect to={path}/> : null}
            <Col style={{padding: 20}}>
                <Row>
                    <NumberBox
                        visible={true}
                        maxLength={6}
                        values={[code]}
                        onChange={setCode}
                        text={"کد دریافتی را وارد کنید"}/>
                </Row>
                <Row style={{marginTop: 30}}>
                    <ContextAccountConsumer>
                        {({confirmPhone}) => (
                            <PrimaryButton
                                visible={!sendCode}
                                label={"تایید کد"}
                                additionalStyle={{flex: 1}}
                                wait={wait}
                                onPress={() => {
                                    setWait(true);
                                    VerifyPhoneNumberApi(code, (data, status, error) => {
                                        if (status) {
                                            showMessage(data.message, data.state);
                                            if (data.state) {
                                                confirmPhone(() => setPath(PagePath.panel.index));
                                            }
                                        } else {
                                            showMessage(data, false);
                                        }
                                        setWait(false);
                                    });
                                }}
                            />
                        )}
                    </ContextAccountConsumer>
                </Row>

                <Row style={{marginTop: 30}}>

                    <Timer
                        // initialTime={60 * 3000}
                        initialTime={60 * 2000}
                        startImmediately={true}
                        direction="backward"
                        lastUnit={"s"}
                        timeToUpdate={10}
                        // onStop={()=>setAgain(true)}
                        checkpoints={[
                            {
                                time: 0,
                                callback: () => setAgain(true),
                            },
                        ]}
                    >
                        {({start, resume, pause, stop, reset, timerState}) => (
                            again ?
                                <PrimaryButton
                                    label={"ارسال مجدد کد"}
                                    additionalStyle={{flex: 1}}
                                    wait={sendCode}
                                    onPress={() => {
                                        setSendCode(true);
                                        SendVerifyCodeApi((data, status, error) => {
                                            if (status) {
                                                reset();
                                                start();
                                                setAgain(false);
                                            } else {
                                                showMessage(data, false);
                                            }
                                            setSendCode(false);
                                        });
                                    }}
                                /> :
                                <Text style={styles.textCenter}>
                                    <Text style={{fontSize: 32}}>
                                        <Timer.Seconds style={styles.textFont}/>
                                    </Text>
                                </Text>

                        )}
                    </Timer>
                </Row>


            </Col>

        </Content>
    );
}


export default StepTwo
