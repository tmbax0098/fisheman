import React, {useRef} from 'react';
import {Button, Icon, Item, Label, Text} from 'native-base'
// import {TextInputMask} from 'react-native-masked-text'
import styles from "./ControlStyleSheet";
import RBSheet from "react-native-raw-bottom-sheet";
import {RadTimePicker} from "../../tools/DateTools";


export default function TimePicker({readOnly = false, id, name, text, required, options, type, values, description, index, visible, placeholder, maxLength, minLength, onChange}) {


    const refSheet = useRef(null);

    return (
        visible ?
            <Item
                stackedLabel
                style={styles.item}
                key={id}>
                <Label
                    style={styles.label}
                >{text + (required ? ' *' : '')}</Label>
                <Item regular style={styles.itemRadius}>
                    <Button
                        dark
                        transparent
                        block
                        disabled={readOnly}
                        onPress={() => refSheet.current.open()}
                        style={readOnly ? styles.inputDisabled : styles.input}>
                        <Icon name={"time"} style={styles.pickerIcon}/>
                        <Text style={styles.text}>{values[0]}</Text>
                    </Button>
                </Item>
                <RBSheet
                    ref={refSheet}
                    height={300}
                    openDuration={250}
                    closeOnDragDown={false}
                    closeOnPressMask={true}
                    customStyles={{
                        container: {
                            alignItems: "center"
                        }
                    }}
                >
                    <Text style={styles.title}>{text}</Text>
                    <RadTimePicker
                        initialTime={values[0]}
                        onChange={value => {
                            refSheet.current.close();
                            onChange(value)
                        }}/>
                </RBSheet>
            </Item> : null
    );

    // return (
    //     visible ?
    //         <Item
    //             stackedLabel
    //             style={styles.item}
    //             key={id}>
    //             <Label
    //                 style={styles.label}
    //             >{text + (required ? ' *' : '')}</Label>
    //             <TextInputMask
    //                 type={'datetime'}
    //                 options={{
    //                     format: 'HH:mm'
    //                 }}
    //                 value={values[0]}
    //                 onChangeText={onChange}
    //                 placeholder={placeholder}
    //                 style={styles.input}
    //                 maxLength={maxLength}
    //                 minLength={minLength}
    //                 required={required}
    //             />
    //         </Item> : null
    // );
};
