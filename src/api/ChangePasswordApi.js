import OnAnswer from "./tools/OnAnswer";
import {PostWithBody} from "./tools/Infrastrcuture";
import SuccessCallback from "./tools/SuccessCallback";
import ErrorCallback from "./tools/ErrorCallback";
import ApiUrl from "./tools/ApiUrl";
import StorageAccount from "../storage/StorageAccount";

const storageAccount = new StorageAccount();

export default function ChangePasswordApi(body, onAnswer = OnAnswer) {
    storageAccount.get()
        .then(data => {
            const response = response => SuccessCallback(response, onAnswer);
            const error = error => ErrorCallback(error, onAnswer);
            PostWithBody(ApiUrl.api.clients.changePassword + "?username=" + data.information.username + "&token=" + data.token, {}, body, response, error);

        })
        .catch(error => ErrorCallback(error, onAnswer));
};
