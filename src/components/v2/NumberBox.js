import React from 'react';
import {Item, Label} from 'native-base'
import {TextInputMask} from 'react-native-masked-text'
import styles from "./ControlStyleSheet";
import theme from "../../styles";

const NumberBox = ({
                       readOnly = false, id, name, text, required, options, type, values, description, index, visible, placeholder, maxLength, minLength, onChange
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
                    <TextInputMask
                        disabled={readOnly}
                        maxLength={maxLength}
                        minLength={minLength}
                        style={readOnly ? styles.inputDisabled : styles.input}
                        type={'only-numbers'}
                        onChangeText={onChange}
                        value={values[0]}
                        placholder={placeholder}
                        placeholderTextColor={required ? theme.palette.error.main : theme.palette.text.secondary}
                    />
                </Item>
            </Item> : null
    );
};

export default NumberBox;
