import React from 'react';
import {Icon, Input, Item, Label} from 'native-base';
import styles from "./ControlStyleSheet";
import theme from "../../styles";

const TextBox = ({
                     readOnly = false, secure = false, id = -1, name = "name", text = "text", required = false, options = [], type = 2, values = [""], description = "", index = -1, visible = true, placeholder = "", maxLength = 1000, minLength = 0, onChange = console.log
                 }) => {

    return (
        visible ?
            <Item
                stackedLabel
                style={styles.item}
                key={id}>
                <Label style={styles.label}>
                    {text + (required ? ' *' : '')}
                </Label>
                <Item regular style={styles.itemRadius}>
                    {
                        (required) && (values[0].length < minLength || values[0].length > maxLength) ?
                            <Icon name={"close"} style={styles.iconError}/> : null
                    }
                    <Input
                        disabled={readOnly}
                        style={readOnly ? styles.inputDisabled : styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={required ? theme.palette.error.main : theme.palette.text.secondary}
                        value={values[0]}
                        secureTextEntry={secure}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                        onChangeText={onChange}/>
                </Item>
            </Item> : null
    );
};

export default TextBox;


