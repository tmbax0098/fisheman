import React, {useState} from 'react';
import TransformList from "../../transform/TransformList";
import {Body, Card, CardItem, Col, Left, Right, Row, Spinner, Text} from "native-base";
import ActionButton from "./ActionButton";
import theme from "../../styles";
import {StyleSheet} from "react-native";
import ShowDetails from "./ShowDetails";
import showMessage from "../../api/tools/showMessage";

const transformList = new TransformList();

export default function ListResult({data}) {

    const [state, setState] = useState(transformList.getList(data));
    const [details, setDetails] = useState(null);

    return (
        data === null ?
            <Spinner color={theme.palette.primary.main}/> :
            details === null ?
                <Col>
                    <Row style={styles.header}>
                        <Body>
                            <Text style={styles.title}>
                                {state.title}
                            </Text>
                        </Body>
                    </Row>
                    {/*<Separator style={{marginBottom: 10}}/>*/}
                    {state.rows.map((row, rowIndex) => (
                        <Row key={'row_item_index_' + rowIndex} style={{paddingHorizontal: 10}}>
                            <Col>
                                <Card noShadow>
                                    <CardItem>
                                        <Col>
                                            {row.values.map((rowItem, rowItemIndex) => (
                                                state.columns[rowItemIndex].visible ?
                                                    <Row
                                                        key={'item_index_' + state.columns[rowItemIndex].id + "_" + rowItemIndex}>
                                                        <Left/>
                                                        <Body>
                                                            <Text
                                                                style={{
                                                                    width: '100%',
                                                                    textAlign: "right",
                                                                    color: theme.palette.text.primary,
                                                                    fontFamily: "IRANSansMobile",
                                                                    fontSize: 12,
                                                                }}>
                                                                {rowItem}
                                                            </Text>
                                                        </Body>
                                                        <Right style={{width: 50}}>
                                                            <Text
                                                                style={{
                                                                    fontFamily: "IRANSansMobile",
                                                                    fontSize: 12,
                                                                    color: theme.palette.text.secondary,
                                                                }}>
                                                                {state.columns[rowItemIndex].text} :
                                                            </Text>
                                                        </Right>
                                                    </Row>
                                                    : null
                                            ))}
                                            {row.actions.length > 0 ?
                                                <Row style={{marginTop: 20}}>
                                                    {
                                                        row.actions.map((actionItem, actionItemIndex) =>
                                                            <ActionButton
                                                                onAnswer={(data, status, error) => {
                                                                    if (status) {
                                                                        if (data.state) {
                                                                            if (actionItem.resultType === 4) {
                                                                                //details result
                                                                                setDetails(data);
                                                                            }
                                                                        }
                                                                    }
                                                                    if (data.message !== null && (data.message + '').length > 0) {
                                                                        showMessage(data.message, data.state);
                                                                    } else if (data.exception !== null && (data.exception + '').length > 0) {
                                                                        showMessage(data.exception, data.state);
                                                                    }
                                                                    if (actionItem.methodType === 4) {
                                                                        //action type is delete
                                                                        if (data.state) {
                                                                            state.rows.splice(rowIndex, 1);
                                                                            setState({...state});
                                                                        }
                                                                    }
                                                                }}
                                                                key={'item_action_' + actionItemIndex}
                                                                values={row.values}
                                                                columns={state.columns}
                                                                action={actionItem}/>
                                                        )
                                                    }
                                                </Row> : null}
                                        </Col>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                    ))}

                    {state.rows.length === 0 ?
                        <Row>
                            <Body>
                                <Text style={styles.noItem}>
                                    آیتمی یافت نشد.
                                </Text>
                            </Body>
                        </Row> : null}


                </Col> :
                <ShowDetails details={details} onBack={() => setDetails(null)}/>
    );
};


const styles = StyleSheet.create({

    header: {marginBottom: 20},
    title: {
        width: '100%',
        textAlign: "center",
        fontFamily: "IRANSansMobile_Bold",
    },
    noItem: {
        width: '100%',
        textAlign: "center",
        fontFamily: "IRANSansMobile_Bold",
        color: theme.palette.text.secondary,
    },
    cardItem: {
        marginTop: 15,
    }

});
