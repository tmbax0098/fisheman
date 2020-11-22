import React, {useRef} from 'react'
// import RNPickerSelect from 'react-native-picker-select';
import {Button, Icon, Item, Label, List, ListItem, Text, View} from "native-base";
import styles from "./ControlStyleSheet";
import {ScrollView} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import theme from "../../styles";

const getSelectedLabel = (options, value, defaultLabel) => {
    let val = options.filter(item => item.value + "" === value + "");
    if (val.length > 0) {
        return val[0].text;
    }
    return typeof defaultLabel === "string" ? defaultLabel : "انتخاب کنید";
}

export default function PickerBox({id, readOnly = false, name, text, required, options, type, values, description, index, visible, placeholder = "انتخاب کنید", maxLength, minLength, onChange}) {

    const refSheet = useRef(null);

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
                        <Icon name={"chevron-down"} style={styles.pickerIcon}/>
                        <Text style={styles.text}>{getSelectedLabel(options, values[0], placeholder)}</Text>
                    </Button>
                </Item>
                <RBSheet
                    ref={refSheet}
                    height={300}
                    openDuration={250}
                    closeDuration={250}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
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
                                            selected={values[0] + "" === item.value + ""}
                                            onPress={() => {
                                                refSheet.current.close();
                                                onChange(item.value);
                                            }}
                                        >
                                            <Text style={{
                                                ...styles.text,
                                                color: values[0] + "" === item.value + "" ? theme.palette.text.primary : theme.palette.text.secondary
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

// import React from 'react'
// import RNPickerSelect from 'react-native-picker-select';
// import {Col, Icon, Label, View} from "native-base";
// import styles from "./ControlStyleSheet";
//
// export default function PickerBox({id, name, text, required, options, type, values, description, index, visible, placeholder = null, maxLength, minLength, onChange}) {
//     return (
//         visible ?
//             <View
//                 style={styles.item}
//                 key={id}>
//                 <Label style={styles.label}>{text + (required ? ' *' : '')}</Label>
//                 <Col style={styles.item}>
//                     <RNPickerSelect
//                         style={{
//                             inputAndroid: styles.inputAndroid,
//                             iconContainer: styles.iconContainer,
//                         }}
//                         value={values[0]}
//                         placeholder={placeholder === null ? {} : {
//                             label: placeholder,
//                             value: null,
//                             color: '#9EA0A4',
//                         }}
//                         useNativeAndroidPickerStyle={false}
//                         onValueChange={(value) => onChange(value)}
//                         items={options.map((item, index) => ({label: item.text, value: item.value, key: index}))}
//                         textInputProps={{underlineColorAndroid: 'transparent'}}
//                         Icon={() => <Icon name={'chevron-down'} style={styles.icon}/>}
//                     />
//                 </Col>
//             </View> :
//             null
//     );
// };
