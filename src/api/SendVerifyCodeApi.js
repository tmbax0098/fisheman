import OnAnswer from "./tools/OnAnswer";
import {PostWithBody} from "./tools/Infrastrcuture";
import ApiUrl from "./tools/ApiUrl";
import SuccessCallback from "./tools/SuccessCallback";
import ErrorCallback from "./tools/ErrorCallback";
import StorageAccount from "../storage/StorageAccount";

const storageAccount = new StorageAccount();

export default function SendVerifyCodeApi(phoneNumber = "09", onAnswer = OnAnswer) {
    storageAccount
        .get()
        .then(data => {
            let url = ApiUrl.api.clients.sendVerifyCode + "?username=" + data.information.username + "&token=" + data.token + "&phoneNumber=" + phoneNumber;
            PostWithBody(url, {}, {}, response => SuccessCallback(response, onAnswer), error => ErrorCallback(error, onAnswer));
        })
        .catch(error => onAnswer(error.message, false, true));
};
