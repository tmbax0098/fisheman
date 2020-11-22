import React from 'react';
import {Input, Item, Label} from 'native-base';
import styles from "./ControlStyleSheet";
import theme from "../../styles";

const EmailBox = ({
                      id, readOnly = false, name, text, required, options, type, values, description, index, visible, placeholder, maxLength, minLength, onChange
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
                        style={readOnly ? styles.inputDisabled : styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={required ? theme.palette.error.main : theme.palette.text.secondary}
                        value={values[0]}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                        onChangeText={onChange}/>
                </Item>
            </Item> : null
    );
};

export default EmailBox;

