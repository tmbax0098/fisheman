import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native'
import {Card, CardItem, Spinner} from "native-base";
import TransformForm from "../../transform/TransformForm";
import FormControl from "./FormControl";
import theme from "../../styles";
import manageForm from "../../api/ManageForm";
import {ContextPageConsumer} from "../../context/ContextPage";
import PrimaryButton from "../PrimaryButton";
import ShowDetails from "./ShowDetails";
import showMessage from "../../api/tools/showMessage";

const transformForm = new TransformForm();

export default function FormResult({data}) {

    const [state, setState] = useState(transformForm.getFormResult(data));
    const [currentForm, setCurrentForm] = useState(0);
    const [waitSubmit, setWaitSubmit] = useState(false);
    const [details, setDetails] = useState(null);
    const [showResult, setShowResult] = useState(false);


    useEffect(() => {
        if (waitSubmit) {
            manageForm(state, data => {
                setWaitSubmit(false);
                if (state.resultType === 4) {
                    //details result
                    setDetails(data);
                    setShowResult(true);
                }
                if (data.message !== "") {
                    showMessage(data.message, data.state);
                } else if (data.exception !== "") {
                    showMessage(data.exception, data.state);
                    //data.exception,
                }
            });
        }
    }, [waitSubmit]);


    return (
        <ContextPageConsumer>
            {({setDefaultPage}) => (
                data === null ?
                    <Spinner/> :
                    !showResult ?
                        <Card transparent style={{height: "100%"}}>
                            <CardItem cardBody>
                                <FormControl
                                    data={transformForm.getForm(state.forms[currentForm])}
                                    onChange={newData => {
                                        state.forms[currentForm] = newData;
                                        // newData.controls.map(item=>console.log(item.values));
                                        setState({...state});
                                    }}/>
                            </CardItem>
                            <CardItem footer>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <PrimaryButton
                                        // color={theme.palette.secondary.main}
                                        additionalStyle={styles.button}
                                        visible={state.previousButtonText !== ""}
                                        disabled={currentForm === 0}
                                        onPress={() => setCurrentForm(currentForm - 1)}
                                        label={state.previousButtonText}
                                        wait={waitSubmit}
                                    />
                                    <PrimaryButton
                                        color={theme.palette.action.active}
                                        additionalStyle={styles.button}
                                        visible={state.dismissButtonText !== ""}
                                        onPress={setDefaultPage}
                                        label={state.dismissButtonText}
                                        disabled={waitSubmit}
                                    />
                                    <PrimaryButton
                                        // color={theme.palette.primary.main}
                                        additionalStyle={styles.button}
                                        visible={currentForm === state.forms.length - 1 && state.submitButtonText !== ""}
                                        onPress={() => setWaitSubmit(true)}
                                        label={state.submitButtonText}
                                        wait={waitSubmit}
                                    />
                                    <PrimaryButton
                                        // color={theme.palette.secondary.main}
                                        additionalStyle={styles.button}
                                        visible={state.nextButtonText !== ""}
                                        disabled={currentForm === state.forms.length - 1}
                                        onPress={() => setCurrentForm(currentForm + 1)}
                                        label={state.nextButtonText}
                                        wait={waitSubmit}
                                    />
                                </View>
                            </CardItem>
                        </Card> :
                        <ShowDetails details={details} onBack={() => setShowResult(false)}/>
            )}
        </ContextPageConsumer>

    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 5,
    },
    buttonText: {
        width: '100%',
        textAlign: "center",
    }
});

