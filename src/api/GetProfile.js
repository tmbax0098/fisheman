import ErrorCallback from './tools/ErrorCallback';
import {GetWithHeader} from './tools/Infrastrcuture';
import ApiUrl from './tools/ApiUrl';
import StorageAccount from "../storage/StorageAccount";
import SuccessCallback from "./tools/SuccessCallback";

const storageAccount = new StorageAccount();

export default function GetProfileApi(onAnswer = OnAnswer) {

    const response = response => SuccessCallback(response, onAnswer);
    const error = error => ErrorCallback(error, onAnswer);
    GetWithHeader(ApiUrl.api.clients.profile, {}, {}, response, error);
};
