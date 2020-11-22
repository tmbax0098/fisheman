import StorageAccount from "../storage/StorageAccount";
import OnAnswer from "./tools/OnAnswer";
import ApiUrl from "./tools/ApiUrl";
import {GetWithHeader} from "./tools/Infrastrcuture";
import SuccessCallback from "./tools/SuccessCallback";
import ErrorCallback from "./tools/ErrorCallback";

const storageAccount = new StorageAccount();

export default function VerifyPhoneNumberApi(code = "", onAnswer = OnAnswer) {
    storageAccount
        .get()
        .then(data => {
            let url = ApiUrl.api.clients.verfiyPhonenumber +
                "?username=" + data.information.username +
                "&token=" + data.token +
                "&phoneNumber=" + data.information.phoneNumber +
                "&code=" + code;
            GetWithHeader(url, {}, {},
                response => SuccessCallback(response, onAnswer),
                error => ErrorCallback(error, onAnswer));
        })
        .catch(error => onAnswer(error.message, false, true));
};
