// import React from 'react';
// import {Item, Label} from "native-base";
// import styles from "./ControlStyleSheet";
// import PhoneInput from 'react-native-phone-input';
//
//
// export default function PhoneBox({id, name, text, required, options, type, values, description, index, visible, placeholder, maxLength, minLength = 16, onChange = console.log}) {
//
//     return (
//         visible ?
//             <Item
//                 stackedLabel
//                 style={styles.item}
//                 key={id}>
//                 <Label style={styles.label}>{text + (required ? ' *' : '')}</Label>
//                 <Item regular style={styles.itemRadius}>
//                     <PhoneInput
//                         cancelText={"لغو"}
//                         confirmText={"ثبت"}
//                         cancelTextStyle={styles.labelFont}
//                         confirmTextTextStyle={styles.labelFont}
//                         pickerItemStyle={styles.labelFont}
//                         textStyle={styles.textLeft}
//                         flagStyle={{marginLeft: 10}}
//                         style={styles.input}
//                         allowZeroAfterCountryCode={false}
//                         initialCountry={"ir"}
//                         value={values[0]}
//                         onChangePhoneNumber={onChange}
//                     />
//                 </Item>
//             </Item> : null
//     );
//
//     // return (
//     //     visible ?
//     //         <Item
//     //             stackedLabel
//     //             style={styles.item}
//     //             key={id}>
//     //             <Label
//     //                 style={styles.label}
//     //             >{text + (required ? ' *' : '')}</Label>
//     //             <TextInputMask
//     //                 onChangeText={(formatted) => {
//     //                     onChange(formatted);
//     //                 }}
//     //                 type={'custom'}
//     //                 options={{
//     //                     /**
//     //                      * mask: (String | required | default '')
//     //                      * the mask pattern
//     //                      * 9 - accept digit.
//     //                      * A - accept alpha.
//     //                      * S - accept alphanumeric.
//     //                      * * - accept all, EXCEPT white space.
//     //                      */
//     //                     mask: '[+98] 999 999 9999'
//     //                 }}
//     //
//     //
//     //                 // type={'cel-phone'}
//     //                 // options={{
//     //                 //     maskType: 'BRL',
//     //                 //     withDDD: true,
//     //                 //     dddMask: '(99) '
//     //                 // }}
//     //                 placeholder={placeholder}
//     //                 style={styles.input}
//     //                 value={values[0]}
//     //                 maxLength={maxLength}
//     //                 minLength={minLength}
//     //                 required={required}
//     //             />
//     //         </Item> : null
//     // );
// };


import React from 'react';
import {Icon, Input, Item, Label} from 'native-base'
import styles from "./ControlStyleSheet";
import theme from "../../styles";

const validate = (text) => {
    if (text.length < 11) {
        return false;
    }
    return text.substr(0, 1) === "0";
}

const PhoneBox = ({
                      readOnly = false, id, name, text, required, options, type, values, description, index, visible, placeholder, maxLength = 11, minLength = 11, onChange
                  }) => {

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
                    <Input
                        disabled={readOnly}
                        style={readOnly ? styles.inputLeftDisabled : styles.inputLeft}
                        placeholder={placeholder}
                        placeholderTextColor={required ? theme.palette.error.main : theme.palette.text.secondary}
                        keyboardType="number-pad"
                        value={values[0]}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                        onChangeText={onChange}/>

                    {
                        validate(values[0]) ? null :
                            <Icon active name='close' style={{color: "#ff0000"}}/>
                    }
                </Item>

            </Item> : null
    );
};

export default PhoneBox;


// import React from 'react';
// import {Item, Label} from "native-base";
// import styles from "./ControlStyleSheet";
// import TextInputMask from "react-native-masked-text";
//
//
// export default function PhoneBox({id = 0, name = "", text = "", required = false, options = [], type = 1, values = [""], description = "", index = 0, visible = true, placeholder = "", maxLength = 13, minLength = 0, onChange = console.log}) {
//
//     return (
//         visible ?
//             <Item
//                 stackedLabel
//                 style={styles.item}
//                 key={id}>
//                 <Label style={styles.label}>{text + (required ? ' *' : '')}</Label>
//                 <TextInputMask
//                     onChangeText={(formatted) => onChange(formatted)}
//                     type={'custom'}
//                     style={styles.input}
//                     options={{
//                         /**
//                          * mask: (String | required | default '')
//                          * the mask pattern
//                          * 9 - accept digit.
//                          * A - accept alpha.
//                          * S - accept alphanumeric.
//                          * * - accept all, EXCEPT white space.
//                          */
//                         mask: '099 9999 9999'
//                     }}
//                     // mask={"+98 [999] [999] [9999]"}
//                     name={name}
//                     placeholder={placeholder}
//                     value={values[0]}
//                     maxLength={maxLength}
//                     minLength={minLength}
//                     required={required}
//                 />
//             </Item> : null
//     );
// };
