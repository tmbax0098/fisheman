import React from 'react';
import {Button, Spinner, Text} from 'native-base';

const empty = () => {
};

export default function PrimaryButton({onPress, label, wait, disabled, visible = true, additionalStyle = {}, color = null}) {
    return (
        visible ?
            <Button

                disabled={disabled}
                onPress={wait ? empty : onPress}
                block
                primary={color === null}
                style={{
                    height: 50,
                    ...color !== null ? {backgroundColor: color} : {},
                    ...additionalStyle,
                    elevation: 0,
                }}>
                {
                    Boolean(wait) ?
                        <Spinner inverse size={'small'}/>
                        :
                        <Text style={{
                            fontFamily: "IRANSansMobile",
                            fontSize: 12,
                        }}>{label}</Text>}
            </Button> : null
    );
};
