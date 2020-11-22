import React, {useRef} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Body, Button, Container, Content, Drawer, Header, Icon, Left, Right, Thumbnail} from 'native-base';
import theme from '../../styles';
import Sidebar from './Sidebar';
import {ContextPageConsumer} from "../../context/ContextPage";
import SegmentLoader from "./segments/SegmentLoader";
import ExitAlert from "../../components/ExitAlert";


export default function PagePanel(props) {

    const refDrawer = useRef(null);

    const onDrawerClose = () => {
        if (refDrawer !== null && refDrawer.current !== null) {
            refDrawer.current._root.close();
        }
    };
    const onDrawerOpen = () => {
        if (refDrawer !== null && refDrawer.current !== null) {
            refDrawer.current._root.open();
        }
    };


    return (
        <>
            <Drawer
                side={'right'}
                style={styles.drawer}
                ref={refDrawer}
                onClose={onDrawerClose}
                content={<Sidebar onClick={onDrawerClose}/>}>
                <Container>
                    <Header elevation={0} style={{borderBottomWidth: 1, borderBottomColor: "#D9D5DC"}}>
                        <StatusBar/>
                        <Left style={styles.left}>
                            <ContextPageConsumer>
                                {({setDefaultPage}) => (
                                    <Button primary transparent onPress={setDefaultPage} icon>
                                        <Icon name='home' style={styles.iconHome} type={"FontAwesome5"}/>
                                    </Button>
                                )}
                            </ContextPageConsumer>
                        </Left>
                        <Body style={{alignItems: 'center'}}>
                            <Thumbnail
                                source={require('../../../public/splashlogo.png')}
                                style={styles.thumbnail}/>
                        </Body>
                        <Right style={styles.right}>
                            <Button primary transparent onPress={onDrawerOpen} icon>
                                <Icon name='menu'/>
                            </Button>
                        </Right>
                    </Header>
                    <Content padder>
                        <SegmentLoader/>
                    </Content>
                </Container>
            </Drawer>
            <ExitAlert/>
        </>
    );
};

const styles = StyleSheet.create({

    drawer: {direction: "rtl", backgroundColor: theme.palette.background,},
    left: {maxWidth: 50},
    right: {maxWidth: 50},
    icon: {
        fontSize: 24,
    },
    iconHome: {
        fontSize: 16,
    },
    thumbnail: {width: 36, height: 36},
});
