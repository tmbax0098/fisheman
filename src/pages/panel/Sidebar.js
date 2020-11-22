import React, {useRef, useState} from 'react';
import {Text} from 'react-native';
import {
    Accordion,
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Thumbnail,
    View
} from 'native-base';
import {ContextAccountConsumer} from '../../context/ContextAccount';
import {ContextPageConsumer} from "../../context/ContextPage";
import {Link, Redirect} from "react-router-native";
import theme from "../../styles";
import TransformAccount from "../../transform/TransformAccount";
import PagePath from "../PagePath";
import styles from "../../components/v2/ControlStyleSheet";
import ExitAccountAlert from "../../components/ExitAccountAlert";

const transformAccount = new TransformAccount();


const isSelected = (item, menuItem) => {
    return item.text === menuItem.text && item.group === menuItem.group;
}

const checkGroup = (item, group = "") => {
    return item.group === group
}

const CustomLink = ({label, to}) => (<Link
    component={Button}
    full
    transparent
    replace={true}
    to={to}
    style={{
        height: 60,
        paddingRight: 20,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.divider
    }}>
    <Text style={styles.itemText}>{label}</Text>
</Link>);


const CustomButton = ({label, onPress}) => (<Link
    component={Button}
    full
    transparent
    onPress={onPress}
    style={{
        height: 60,
        paddingRight: 20,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.divider
    }}>
    <Text style={styles.itemText}>{label}</Text>
</Link>);


export default function Sidebar({onClick = console.log}) {

    const refSheet = useRef(null);
    const [redirect, setRedirect] = useState(false);

    const closeSheet = (runAfterDone) => {
        if (refSheet !== null && refSheet.current !== null) {
            refSheet.current.close();
        }
        if (typeof runAfterDone === "function") {
            runAfterDone();
        }
    }
    const openSheet = () => {
        if (refSheet !== null && refSheet.current !== null) {
            setTimeout(() => refSheet.current.open(), 100);
        }
        return true;
    }

    return (
        <>
            {redirect ? <Redirect to={PagePath.signin}/> : null}
            <ContextAccountConsumer>
                {
                    ({menus, information, logout}) => (
                        <ContextPageConsumer>
                            {({menuItem, setMenuItem, reset}) => (
                                <Container>
                                    <Header style={{backgroundColor: theme.palette.primary.main}}>
                                        <Left>
                                            <Button icon transparent onPress={() => {
                                                setMenuItem({value: -1});
                                                onClick();
                                            }}>
                                                <Icon name={'pencil'} type={"Entypo"}/>
                                            </Button>
                                        </Left>
                                        <Body style={styles.body}>
                                            <Text style={{...styles.headerText, color: theme.palette.common.light}}>
                                                {information.firstName + ' ' + information.lastName}
                                            </Text>
                                        </Body>
                                        <Right style={styles.right}>
                                            <Button style={{width: 60}} icon transparent onPress={() => {
                                                setMenuItem({value: -1});
                                                onClick();
                                            }}>
                                                <Thumbnail
                                                    source={information.image ? {uri: information.image} : require("./../../../public/avatar.png")}
                                                    style={styles.thumbnail}/>
                                            </Button>
                                        </Right>
                                    </Header>

                                    <Content scrollEnabled>
                                        {
                                            transformAccount
                                                .createMenu(menus)
                                                .filter(element => element.group === "")
                                                .map((element, index) => (
                                                    <Button
                                                        key={'button_index_' + index}
                                                        transparent
                                                        onPress={() => {
                                                            setMenuItem(element);
                                                            onClick();
                                                        }}
                                                        style={{
                                                            height: 60,
                                                            paddingRight: 20,
                                                            borderBottomWidth: 1,
                                                            borderBottomColor: '#ececec'
                                                        }}>
                                                        <Text
                                                            style={isSelected(element, menuItem) ? styles.itemTextSelected : styles.itemText}>
                                                            {element.text}
                                                        </Text>
                                                    </Button>
                                                ))
                                        }
                                        <Accordion
                                            style={{borderWidth: 0,}}
                                            dataArray={transformAccount.createMenu(menus).filter(element => element.hasOwnProperty('content'))}
                                            // expanded={-1}
                                            renderHeader={(item, expanded) => <View style={{
                                                height: 60,
                                                borderBottomWidth: 1,
                                                borderWidth: 0,
                                                borderBottomColor: '#ececec',
                                                flexDirection: "row",
                                                paddingHorizontal: 10,
                                                paddingVertical: 10,
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}>
                                                <Text style={styles.accordionHeaderText}>
                                                    {" "}{item.groupText}
                                                </Text>
                                                {expanded
                                                    ? <Icon style={{
                                                        fontSize: 18,
                                                        color: checkGroup(menuItem, item.group) ? theme.palette.primary.main : "#000"
                                                    }} name="chevron-down"/>
                                                    : <Icon style={{
                                                        fontSize: 18,
                                                        color: checkGroup(menuItem, item.group) ? theme.palette.primary.main : "#000"
                                                    }} name="chevron-back"/>}
                                            </View>}
                                            renderContent={item => {
                                                return (
                                                    <List style={{backgroundColor: theme.palette.divider}}>
                                                        {
                                                            item.content.map((element, index) => (
                                                                <ListItem
                                                                    onPress={() => {
                                                                        setMenuItem(element);
                                                                        onClick();
                                                                    }}
                                                                    style={{
                                                                        height: 60,
                                                                        borderTopWidth: 0,
                                                                        borderBottomWidth: index + 1 !== item.content.length ? 1 : 0,
                                                                        borderBottomColor: '#ececec',
                                                                        marginHorizontal: 30,
                                                                        // paddingHorizontal : 20
                                                                    }}
                                                                    key={'listItem_index_' + index}
                                                                >
                                                                    <Text
                                                                        style={isSelected(element, menuItem) ? styles.itemTextSelected : styles.itemText}>{element.text}</Text>
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </List>
                                                )
                                            }}
                                        />


                                        <CustomLink to={PagePath.changePassword} label={'تغییر گذرواژه'}/>
                                        <CustomButton
                                            onPress={() => {
                                                onClick();
                                                openSheet();
                                            }} label={'خروج از حساب کاربری'}/>

                                        <CustomLink to={PagePath.about} label={'درباره ما'}/>

                                    </Content>

                                    <ExitAccountAlert
                                        refSheet={refSheet}
                                        onCancel={closeSheet}
                                        onExit={() => closeSheet(() => logout(() => reset(() => setRedirect(true))))}/>


                                </Container>
                            )}
                        </ContextPageConsumer>
                    )
                }
            </ContextAccountConsumer>
        </>
    );

}

