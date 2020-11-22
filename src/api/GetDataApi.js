import OnAnswer from "./tools/OnAnswer";
import SuccessCallback from "./tools/SuccessCallback";
import ErrorCallback from "./tools/ErrorCallback";
import {Get} from "./tools/Infrastrcuture";
import ApiUrl from "./tools/ApiUrl";
import StorageAccount from "../storage/StorageAccount";

const storageAccount = new StorageAccount();

export default function GetDataApi(value = 1, onAnswer = OnAnswer) {

    storageAccount.get()
        .then(data => {
            let url = ApiUrl.api.clients.requested + "?username=" + data.information.username + "&token=" + data.token + "&type=" + value;
            Get(url, response => SuccessCallback(response, onAnswer), error => ErrorCallback(error, onAnswer));
        })
        .catch(error => onAnswer(error.message, false, true));
};
