import React, {useState} from "react";
import {Button, Col, Icon, Row, Separator, Text, View} from "native-base";
import {StyleSheet} from 'react-native';
import TransformResult from "../../transform/TransformResult";
import theme from "../../styles";


const transformResult = new TransformResult();

const styles = StyleSheet.create({
    titleText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: "IRANSansMobile_Bold",
        fontSize: 14,
        color: theme.palette.text.primary,
    },
    labelText: {
        fontFamily: "IRANSansMobile",
        fontSize: 12,
        color: theme.palette.text.secondary,
    },
    valueText: {
        textAlign: "right",
        color: theme.palette.text.primary,
        fontFamily: "IRANSansMobile",
        fontSize: 12,
    },

});

const ShowDetails = ({details, onBack}) => {

    const [state] = useState(transformResult.detailsResult(details));
    return <View>
        <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20, paddingTop: 20}}>
            <Text style={styles.titleText}>{state.title}</Text>
        </View>

        <Separator style={{marginBottom: 20, height: 1}}/>

        {state.data.map((item, index) => (
            <Row
                key={"item_value_index_" + index}
                style={{paddingHorizontal: 20, marginBottom: 20}}>
                <Col style={{flex: 4}}>
                    <Text style={styles.valueText}>
                        {item.value}
                    </Text>
                </Col>
                <Col style={{flex: 2}}>
                    <Text style={styles.labelText}>
                        {item.text} :
                    </Text>
                </Col>
            </Row>
        ))}

        <Separator style={{marginBottom: 20, height: 1}}/>

        <Row style={{justifyContent: 'center', padding: 5}}>
            <Button primary iconLeft onPress={onBack}>
                <Icon name={'chevron-back'}/>
                <Text>بازگشت</Text>
            </Button>
        </Row>
    </View>
}


export default ShowDetails;
