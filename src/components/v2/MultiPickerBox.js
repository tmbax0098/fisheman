import React, {useEffect, useRef, useState} from 'react'
import {Button, Icon, Item, Label, List, ListItem, Text, View} from "native-base";
import styles from "./ControlStyleSheet";
import {ScrollView} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import theme from "../../styles";

const getSelectedLabel = (options, value, defaultLabel) => {
    let val = options.filter(item => item.value + "" === value + "");
    if (val.length > 0) {
        return val.map(item => item.text).join(",");
    }
    return typeof defaultLabel === "string" ? defaultLabel : "انتخاب کنید";
}

export default function MultiPickerBox({readOnly = false, id, name, text, required, options, type, values, description, index, visible, placeholder = "انتخاب کنید", maxLength, minLength, onChange}) {

    const refSheet = useRef(null);
    const [selected, setSelected] = useState(values);

    useEffect(() => refSheet.current.close(), [selected])

    return (
        visible ?
            <View
                style={styles.item}
                key={id}>
                <Label style={styles.label}>{text + (required ? ' *' : '')}</Label>
                <Item regular style={styles.itemRadius}>
                    <Button
                        dark
                        transparent
                        full
                        iconLeft
                        disabled={readOnly}
                        onPress={() => refSheet.current.open()}
                        style={readOnly ? styles.inputDisabled : styles.input}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                            <Icon name={"arrow-down"} style={styles.pickerIcon}/>
                            <Text style={styles.text}>{getSelectedLabel(options, values[0], placeholder)}</Text>
                        </View>
                    </Button>
                </Item>
                <RBSheet
                    ref={refSheet}
                    height={300}
                    openDuration={250}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    onClose={() => onChange(selected)}
                    customStyles={{
                        container: {
                            // justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <Text style={styles.title}>{text}</Text>
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <List style={{width: '100%', paddingHorizontal: 0}}>
                                {
                                    options.map((item, index) => (
                                        <ListItem
                                            style={{
                                                marginRight: 15,
                                            }}
                                            key={"item_index_" + index}
                                            selected={selected + "" === item.value + ""}
                                            onPress={() => {
                                                if (selected.indexOf(item.value) === -1) {
                                                    setSelected([...selected, item.value])
                                                } else {
                                                    setSelected(selected.filter(item => item !== item.value))
                                                }
                                            }}
                                        >
                                            <Text style={{
                                                ...styles.text,
                                                color: selected + "" === item.value + "" ? theme.palette.text.primary : theme.palette.text.secondary
                                            }}>{item.text}</Text>
                                        </ListItem>))
                                }
                            </List>
                        </ScrollView>
                    </View>
                </RBSheet>
            </View> :
            null
    );
};
