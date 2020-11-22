import React, {useState} from 'react';
import {Icon, Input, Item, Label} from 'native-base';
import styles from "./ControlStyleSheet";
import theme from "../../styles";

const PasswordBox = ({
                         readOnly = false, id = -1, name = "name", text = "text", required = false, options = [], type = 2, values = [""], description = "", index = -1, visible = true, placeholder = "", maxLength = 1000, minLength = 0, onChange = console.log
                     }) => {

    const [show, setShow] = useState(false);

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
                    <Icon name={show ? "eye" : "eye-off"} style={show ? styles.iconSuccess : styles.iconAction}
                          onPress={() => setShow(!show)}/>
                    <Input
                        disabled={readOnly}
                        style={readOnly ? styles.inputDisabled : styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={required ? theme.palette.error.main : theme.palette.text.secondary}
                        value={values[0]}
                        secureTextEntry={!show}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                        onChangeText={onChange}/>
                </Item>
            </Item> : null
    );
};

export default PasswordBox;


