import OnAnswer from './tools/OnAnswer';
import ErrorCallback from './tools/ErrorCallback';
import {PostWithBody} from './tools/Infrastrcuture';
import ApiUrl from './tools/ApiUrl';
import SaveCallback from './tools/SaveCallback';
import StorageAccount from "../storage/StorageAccount";
import Message from "./tools/Message";

const storageAccount = new StorageAccount();

export default function UpdateProfileApi(onAnswer = OnAnswer) {

    const response = response => SaveCallback(response, onAnswer);
    const error = error => ErrorCallback(error, onAnswer);


    storageAccount.get()
        .then(account => {
            PostWithBody(ApiUrl.api.clients.profile, {}, account.information, response, error);
        })
        .catch(error => onAnswer(Message.global, false, true));
};
