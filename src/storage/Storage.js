import AsyncStorage from '@react-native-community/async-storage';
import TransformAccount from "../transform/TransformAccount";

export default class Storage {
    constructor(props) {
        this.transforms = {
            transformAccount: new TransformAccount(),
        }
        this.keys = {
            transformAccount: "account",
        }
        this.keyName = null;
        this.transform = null;
    }

    get = async () => {
        try {
            return this.transform.get(JSON.parse(await AsyncStorage.getItem(this.keyName)))
        } catch (e) {
            return this.transform.get();
        }
    }

    set = async (data = {}) => {
        if (!data) {
            data = {};
        }
        await AsyncStorage.setItem(this.keyName, JSON.stringify(this.transform.get(data)))
    }

    remove = async () => await AsyncStorage.removeItem(this.keyName);

    reset = async () => this.set(this.transform.get());

    clearAll = async () => await AsyncStorage.clear();

}
