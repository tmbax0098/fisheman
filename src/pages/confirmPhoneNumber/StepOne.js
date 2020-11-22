import React, {useState} from "react";
import SendVerifyCodeApi from "../../api/SendVerifyCodeApi";
import showMessage from "../../api/tools/showMessage";
import {Col, Content, Row} from 'native-base';
import MobilePhoneBox from "../../components/v2/MobilePhoneBox";
import PrimaryButton from "../../components/PrimaryButton";
import {ContextAccountConsumer} from "../../context/ContextAccount";
import isMobilePhone from "validator/es/lib/isMobilePhone";

const StepOne = ({next}) => {

    const [wait, setWait] = useState(false);
    const [phone, setPhone] = useState("");

    const sendCode = (runAfter) => {

        //phoneNumber => updateProfileItem({phoneNumber: phoneNumber})

        setWait(true);
        SendVerifyCodeApi(phone, (data, status, error) => {
            setWait(false);
            if (status) {
                showMessage(data.message, data.state);
                if (data.state) {
                    runAfter();
                    next();
                }
            } else {
                showMessage(data, false);
            }
        });

    }


    return (
        <Content padder>
            <ContextAccountConsumer>
                {({information, updateProfileItem}) => (
                    <Col style={{padding: 40}}>
                        <Row>
                            <MobilePhoneBox
                                visible={true}
                                values={[phone]}
                                onChange={setPhone}
                                text={"شماره تلفن خود را وارد کنید"}/>

                        </Row>
                        <Row style={{marginTop: 30}}>
                            <PrimaryButton
                                visible={isMobilePhone(phone, 'fa-IR')}
                                label={"دریافت کد تایید"}
                                // disabled={isMobilePhone(information.phoneNumber, 'fa-IR')}
                                additionalStyle={{flex: 1}}
                                wait={wait}
                                onPress={() => sendCode(() => updateProfileItem({phoneNumber: phone}))}
                            />
                        </Row>
                    </Col>
                )}
            </ContextAccountConsumer>
        </Content>
    );
}

export default StepOne
