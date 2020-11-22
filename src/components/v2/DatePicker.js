import React, {useRef} from 'react';
import {Button, Icon, Item, Label, Text} from 'native-base'
import styles from "./ControlStyleSheet";
import RBSheet from "react-native-raw-bottom-sheet";
import {RadDatePicker} from "../../tools/DateTools";
// import {DatePicker as RadDatePicker2} from "react-native-persian-date-picker";


export default function DatePicker({id = 0, readOnly = false, name = "", text = "", required = false, options = [], type = 2, values = [''], description = "", index = -1, visible = false, placeholder = "", maxLength = 1000, minLength = 0, onChange = console.log}) {

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
                        full
                        iconLeft
                        disabled={readOnly}
                        onPress={() => refSheet.current.open()}
                        style={readOnly ? styles.inputDisabled : styles.input}>
                        <Icon name={"calendar"} style={styles.pickerIcon}/>
                        <Text style={styles.text}>{values[0]}</Text>
                    </Button>
                </Item>
                <RBSheet
                    ref={refSheet}
                    height={300}
                    openDuration={250}
                    closeOnDragDown={false}
                    closeOnPressMask={true}
                    // onClose={() => onChange(date)}
                    customStyles={{
                        container: {
                            alignItems: "center"
                        }
                    }}
                >
                    <Text style={styles.title}>{text}</Text>
                    <RadDatePicker
                        initialDate={values[0]}
                        onChange={value => {
                            refSheet.current.close();
                            onChange(value)
                        }}/>
                </RBSheet>
            </Item> : null
    );

};


// export default function DatePicker({id = 0, name = "", text = "", required = false, options = [], type = 2, values = [''], description = "", index = -1, visible = false, placeholder = "", maxLength = 1000, minLength = 0, onChange = console.log}) {
//
//     const refSheet = useRef(null);
//
//     return (
//         visible ?
//             <Item
//                 stackedLabel
//                 style={styles.item}
//                 key={id}>
//                 <Label
//                     style={styles.label}
//                 >{text + (required ? ' *' : '')}</Label>
//                 <Button light bordered block onPress={() => refSheet.current.open()} style={styles.input}>
//                     <Text style={styles.text}>{values[0]}</Text>
//                 </Button>
//                 <RBSheet
//                     ref={refSheet}
//                     height={300}
//                     openDuration={250}
//                     closeOnDragDown={false}
//                     closeOnPressMask={false}
//                     // onClose={() => onChange(date)}
//                     customStyles={{
//                         container: {
//                             alignItems: "center"
//                         }
//                     }}
//                 >
//                     <Text style={styles.title}>{text}</Text>
//                     <RadDatePicker
//                         initialDate={values[0]}
//                         onChange={value => {
//                             refSheet.current.close();
//                             onChange(value)
//                         }}/>
//                 </RBSheet>
//             </Item> : null
//     );
//
// };
