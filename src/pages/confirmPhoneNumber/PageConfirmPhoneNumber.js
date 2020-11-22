import React, {useEffect, useState} from 'react';
import {Body, Container, Header, Spinner, Text} from 'native-base'
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import styles from "../../components/v2/ControlStyleSheet";
import StorageAccount from "../../storage/StorageAccount";


const storageAccount = new StorageAccount();

export default function PageConfirmPhoneNumber() {

    const [wait, setWait] = useState(true);
    const [showValidate, setShowValidate] = useState(false);

    const next = () => setShowValidate(true);

    useEffect(() => {
        storageAccount.get()
            .then(value => {
                value.information.phoneNumber = "";
                storageAccount.set(value);
            })
            .catch(() => setShowValidate(false))
            .finally(() => setWait(false));
    }, []);


    return (
        <Container>
            <Header noLeft>
                <Body>
                    <Text style={styles.textHeader}>تایید شماره تلفن</Text>
                </Body>
            </Header>

            {wait ? <Spinner inverse/> : !showValidate ? <StepOne next={next}/> : <StepTwo/>}
        </Container>

    );
};
