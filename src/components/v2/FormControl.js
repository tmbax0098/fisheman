import React from 'react';
import {Card, CardItem, Content, Text} from "native-base";
import {StyleSheet} from 'react-native';
import Control from "./Control";

export default function FormControl({data, onChange}) {

    return (
        <Content style={styles.content}>
            <Card transparent>
                <CardItem header>
                    <Text style={styles.title}>
                        {data.title}
                    </Text>
                </CardItem>
                {data.controls.map((item, index) => (
                    <CardItem
                        cardBody
                        style={styles.cardItem}
                        key={"control_index_" + index}>
                        <Control
                            controlProps={item}
                            onChange={newItem => {
                                data.controls[index] = newItem;
                                onChange(data);
                            }}/>
                    </CardItem>
                ))}
            </Card>
        </Content>
    );
};

const styles = StyleSheet.create({

    content: {paddingLeft: 20, paddingRight: 20},
    title: {
        width: '100%',
        textAlign: "center",
        fontFamily: "IRANSansMobile_Bold",
    },
    cardItem: {
        marginTop: 15,
    }

});
