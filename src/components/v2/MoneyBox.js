import React from 'react';
import TextInputMask from 'react-native-text-input-mask';
import {Item, Label} from "native-base";
import styles from "./ControlStyleSheet";
import theme from "../../styles";

export default function MoneyBox({readOnly = false, id, name, text, required, options, type, values, description, index, visible, placeholder, maxLength, minLength, onChange}) {

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
                        style={readOnly ? styles.inputDisabled : styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={required ? theme.palette.error.main : theme.palette.text.secondary}
                        type={'money'}
                        refInput={ref => {
                            this.input = ref
                        }}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'ریال',
                            suffixUnit: ''
                        }}
                        onChangeText={(formatted, extracted) => {
                            onChange(extracted);
                        }}
                        value={values[0]}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                    />
                </Item>
            </Item> : null
    );
};
