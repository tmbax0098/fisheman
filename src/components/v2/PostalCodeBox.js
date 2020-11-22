import React from 'react';
import {Item, Label} from 'native-base'
import {TextInputMask} from 'react-native-masked-text'
import styles from "./ControlStyleSheet";
import theme from "../../styles";

export default function PostalCodeBox({readOnly = false, id, name, text, required, options, type, values, description, index, visible, placeholder, maxLength, minLength, onChange}) {
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
                    <TextInputMask
                        disabled={readOnly}
                        style={readOnly ? styles.inputLeftDisabled : styles.inputLeft}
                        placeholder={placeholder}
                        placeholderTextColor={required ? theme.palette.error.main : theme.palette.text.secondary}
                        type={'custom'}
                        options={{
                            mask: '99999-99999'
                        }}
                        value={values[0]}
                        onChangeText={onChange}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                    />
                </Item>
            </Item> : null
    );
};
