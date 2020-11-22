import React from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import {NativeRouter, Route} from "react-router-native";
import PagePath from "./src/pages/PagePath";
import PageSignin from "./src/pages/signin/PageSignin";
import PagePanel from "./src/pages/panel/PagePanel";
import PageSplash from "./src/pages/splash/PageSplash";
import {ContextAccountProvider} from "./src/context/ContextAccount";
import {ContextPageProvider} from "./src/context/ContextPage";
import {Icon, StyleProvider, Text, View,} from "native-base";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import PageConfirmPhoneNumber from "./src/pages/confirmPhoneNumber/PageConfirmPhoneNumber";
import PageChangePassword from "./src/pages/changePassword/PageChangePassword";
import ToastRoot from "./src/components/ToastRoot";
import PageAbout from "./src/pages/about/PageAbout";


LogBox.ignoreAllLogs();


function App() {

    return (
        <StyleProvider style={getTheme(material)}>
            <SafeAreaView style={{flex: 1,}}>
                <ContextAccountProvider>
                    <ContextPageProvider>
                        <NativeRouter>
                            <Route exact path={PagePath.splash} component={PageSplash}/>
                            <Route exact path={PagePath.signin} component={PageSignin}/>
                            <Route exact path={PagePath.confirmPhoneNumber} component={PageConfirmPhoneNumber}/>
                            <Route exact path={PagePath.changePassword} component={PageChangePassword}/>
                            <Route exact path={PagePath.panel.index} component={PagePanel}/>
                            <Route exact path={PagePath.about} component={PageAbout}/>
                            <ToastRoot/>
                        </NativeRouter>
                    </ContextPageProvider>
                </ContextAccountProvider>
            </SafeAreaView>
        </StyleProvider>
    );
}


export default App;
