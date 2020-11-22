import {manageAction} from "../../api/ManageForm";
import {Button, Icon, Spinner, Text} from "native-base";
import {StyleSheet} from "react-native";
import React, {useEffect, useState} from 'react'

const getActionColor = (value = 1) => {
    switch (value) {
        case 1 :
            return {primary: true};
        case 2 :
            return {secondary: true};
        case 3 :
            return {success: true};
        case 4 :
            return {danger: true};
        case 5 :
            return {warning: true};
        case 6 :
            return {info: true};

    }
}

const getParameters = (values, parameters, columns) => {
    let data = {};

    columns.forEach((item, index) => {
        if (parameters.indexOf(item.name) !== -1) {
            data[item.name] = values[index];
        }
    });
    return data;
};

const ActionButton = ({action, columns, values, onAnswer}) => {

    const [wait, setWait] = useState(false);

    const onClick = () => setWait(true);


    useEffect(() => {
        if (wait) {
            manageAction(action, getParameters(values, action.parameters, columns), (data, status, error) => {
                onAnswer(data, status, error);
                setWait(false);
            })
        }
    }, [wait]);

    switch (action.displayType) {
        case 1:
            return <Button
                iconRight
                style={stylesActionButton.button}
                {...getActionColor(action.backgroundColor)}
                onPress={onClick}>
                <Text style={stylesActionButton.text}>
                    {action.text}
                </Text>
                {
                    wait ?
                        <Spinner inverse size={'small'} style={stylesActionButton.spinner}/> :
                        <Icon name={action.icon || ""} style={{fontSize: 14}}/>

                }
            </Button>
        case 2:
            return <Button
                style={stylesActionButton.button}
                {...getActionColor(action.backgroundColor)}
                onPress={onClick}>
                {
                    wait ?
                        <Spinner inverse size={'small'} style={stylesActionButton.spinner}/> :
                        <Text style={stylesActionButton.text}>
                            {action.text}
                        </Text>
                }
            </Button>
        default:
            //type 3
            return <Button
                style={stylesActionButton.iconButton}
                {...getActionColor(action.backgroundColor)}
                onPress={onClick}>
                {/*<Icon name={action.icon}/>*/}
                {
                    wait ?
                        <Spinner inverse size={'small'} style={stylesActionButton.spinner}/> :
                        <Icon name={action.icon || ""} style={{fontSize: 14}}/>
                }
            </Button>

    }
}

export default ActionButton;

const stylesActionButton = StyleSheet.create({
    icon: {
        margin: 0,
        padding: 0,
    },
    spinner: {
        margin: 0,
        marginRight: 10,
        padding: 0,
        minWidth: 0,
    },
    button: {
        // borderRadius: theme.shape.borderRaduis,
        // justifyContent: "flex-end",
        marginHorizontal: 5,
        fontFamily: "IRANSansMobile",
    },
    iconButton: {
        // borderRadius: theme.shape.borderRaduis,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 11,
        textAlign: "center",
        fontFamily: "IRANSansMobile",
    },
});
