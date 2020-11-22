import TransformForm from "../transform/TransformForm";
import ApiUrl from "./tools/ApiUrl";
import {DeleteWithHeader, GetWithHeader, PostWithBody, PutWithBody} from "./tools/Infrastrcuture";
import SuccessCallback from "./tools/SuccessCallback";
import ErrorCallback from "./tools/ErrorCallback";
import TransformResult from "../transform/TransformResult";
import Message from "./tools/Message";
import downloadFile from "../components/v2/DownloadFile";
import convertJsonToArray from "./tools/convertJsonToArray";

const transformForm = new TransformForm();
const transformResult = new TransformResult();

const getData = (requestName, requestType, data, onAnswer) => {
    const response = response => SuccessCallback(response, onAnswer);
    const error = error => ErrorCallback(error, onAnswer);
    GetWithHeader(ApiUrl.api.clients.index + "/" + requestName, {type: requestType}, data, response, error);
}
const postData = (requestName, requestType, data, onAnswer) => {
    const response = response => SuccessCallback(response, onAnswer);
    const error = error => ErrorCallback(error, onAnswer);
    PostWithBody(ApiUrl.api.clients.index + "/" + requestName, {type: requestType}, data, response, error);
}
const putData = (requestName, requestType, data, onAnswer) => {
    const response = response => SuccessCallback(response, onAnswer);
    const error = error => ErrorCallback(error, onAnswer);
    PutWithBody(ApiUrl.api.clients.index + "/" + requestName, {type: requestType}, data, response, error);
}
const deleteData = (requestName, requestType, data, onAnswer) => {
    const response = response => SuccessCallback(response, onAnswer);
    const error = error => ErrorCallback(error, onAnswer);
    DeleteWithHeader(ApiUrl.api.clients.index + "/" + requestName, {type: requestType}, data, response, error);
}


export default function manageForm(formResult, onAnswer) {


    const manageFormResultAnswer = (data, status, error) => {

        if (error) {
            onAnswer({message: Message.global}, false, true);
        } else {
            switch (formResult.resultType) {
                case 3:
                    onAnswer(transformResult.doneResult(data), true, false);
                    break;
                case 4:
                    onAnswer(transformResult.detailsResult(data), true, false);
                    break;
                case 5:
                    downloadFile(transformResult.downloadResult(data), onAnswer);
                    break;
                default:
                    onAnswer(Message.global, false, true);
                    break;
            }
        }
    }

    const packet = transformForm.createPacket(formResult.forms, formResult.parameters);

    switch (formResult.methodType) {
        case 1 :
            postData(formResult.requestName, formResult.requestType, convertJsonToArray(packet), manageFormResultAnswer);
            break;
        case 2 :
            getData(formResult.requestName, formResult.requestType, packet, manageFormResultAnswer);
            break;
        case 3 :
            putData(formResult.requestName, formResult.requestType, convertJsonToArray(packet), manageFormResultAnswer);
            break;
        case 4 :
            deleteData(formResult.requestName, formResult.requestType, packet, manageFormResultAnswer);
            break;
        default:
            return manageFormResultAnswer(null, false, false);
    }

}


export function manageAction(action, packet, onAnswer) {

    const manageActionResultAnswer = (data, status, error) => {

        if (error) {
            onAnswer({message: Message.global}, false, true);
        } else {
            switch (action.resultType) {
                case 3:
                    onAnswer(transformResult.doneResult(data), true, false);
                    break;
                case 4:
                    onAnswer(transformResult.detailsResult(data), true, false);
                    break;
                case 5:
                    downloadFile(transformResult.downloadResult(data), onAnswer);
                    break;
                default:
                    //onAnswer(Message.global, false, true);
                    break;
            }
        }
    }

    switch (action.methodType) {
        case 1 :
            postData(action.requestName, action.requestType, packet, manageActionResultAnswer);
            break;
        case 2 :
            getData(action.requestName, action.requestType, packet, manageActionResultAnswer);
            break;
        case 3 :
            putData(action.requestName, action.requestType, packet, manageActionResultAnswer);
            break;
        case 4 :
            deleteData(action.requestName, action.requestType, packet, manageActionResultAnswer);
            break;
        default:
            return manageActionResultAnswer(null, false, false);
    }
}
