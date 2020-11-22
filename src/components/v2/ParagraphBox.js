import React from 'react';
import {Text} from 'native-base';
import styles from "./ControlStyleSheet";

export default function ParagraphBox({disabled = false, secure = false, id = -1, name = "name", text = "text", required = false, options = [], type = 2, values = [""], description = "", index = -1, visible = true, placeholder = "", maxLength = 1000, minLength = 0, onChange = console.log}) {
    return (
        <Text style={styles.textJustify}>
            {values[0]}
        </Text>
    );
};