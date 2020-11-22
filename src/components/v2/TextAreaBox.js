import React from 'react';
import {Item, Label, Textarea} from 'native-base';
import styles from "./ControlStyleSheet";

const TextAreaBox = ({
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
                    <Textarea
                        rowSpan={5}
                        disabled={readOnly}
                        multiline={true}
                        placeholder={placeholder}
                        style={readOnly ? styles.inputDisabled : styles.input}
                        value={values[0]}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                        onChangeText={onChange}
                    />
                </Item>
            </Item> : null
    );
};

export default TextAreaBox;


