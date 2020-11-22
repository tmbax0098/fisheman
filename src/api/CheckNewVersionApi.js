import React from 'react';
import OnAnswer from "./tools/OnAnswer";
import {Get} from "./tools/Infrastrcuture";
import ApiUrl from "./tools/ApiUrl";
import version, {osType} from "../tools/Version";
import SuccessCallback from "./tools/SuccessCallback";
import ErrorCallback from "./tools/ErrorCallback";

export default function CheckNewVersionApi(onAnswer = OnAnswer) {
    const response = response => SuccessCallback(response, onAnswer);
    const error = error => ErrorCallback(error, onAnswer);
    const url = ApiUrl.api.clients.checkNewVersion + "?version=" + version + "&type=" + osType;
    Get(url, response, error);
};