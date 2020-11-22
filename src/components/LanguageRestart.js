import RNRestart from "react-native-restart";
import {I18nManager} from "react-native";

export const languageRestart = async () => {
    if (!I18nManager.isRTL) {
        await I18nManager.forceRTL(true);
    }
    RNRestart.Restart();
};
