import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, CardItem, Text, Thumbnail} from "native-base";

export default function Dashboard({data}) {

    return (
        <View style={styles.view}>
            {data.map((item, index) => (
                <Card elevation={1}
                      key={"dashboard_index_" + index}
                      style={styles.card}>
                    <CardItem cardBody style={styles.cardItem}>
                        <Thumbnail
                            square
                            source={{uri: typeof item.icon === "string" ? item.icon : ""}}
                            style={styles.thumbnail}/>
                        <Text
                            style={{
                                color: item.color,
                                ...styles.text,
                            }}>
                            ( {item.number} )
                        </Text>
                        <Text
                            style={{
                                color: item.color,
                                ...styles.text,
                            }}>
                            {item.text}
                        </Text>
                    </CardItem>
                </Card>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        alignItems: 'flex-start',
        paddingHorizontal: 0,
        // paddingVertical: 0,
    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontFamily: "IRANSansMobile",
        fontSize: 12,
    },
    card: {width: '48%'},
    thumbnail: {alignSelf: 'center', borderBottomWidth: 0, width: 50, height: 50},
    cardItem: {flexDirection: "column", paddingBottom: 10, paddingTop: 10},

});
