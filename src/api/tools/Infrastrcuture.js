import axios from 'axios';
import StorageAccount from "../../storage/StorageAccount";
import ApiUrl from "./ApiUrl";
//get functions

const storageAccount = new StorageAccount();

export function Get(url, successCallback, errorCallback) {
    axios.get(url)
        .then(successCallback)
        .catch(errorCallback);
}

export function GetWithType(type, successCallback, errorCallback) {
    storageAccount.get().then(account => {
        let config = {
            params: {
                token: account.token,
                username: account.information.username,
                type: type
            }
        };
        axios.get(ApiUrl.api.clients.requested, config)
            .then(successCallback)
            .catch(errorCallback);
    }).catch(errorCallback);
}

export function PutWithType(type, data, successCallback, errorCallback) {
    storageAccount.get().then(account => {
        let config = {
            params: {
                token: account.token,
                username: account.information.username,
                type: type
            }
        };
        axios.put(ApiUrl.api.clients.requested, data, config)
            .then(successCallback)
            .catch(errorCallback);
    }).catch(errorCallback);
}

export function GetWithHeader(url, params, headers, successCallback, errorCallback) {

    storageAccount.get().then(account => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            params: {
                token: account.token,
                username: account.information.username,
                ...params,
            }
        };
        //console.log("GetWithHeader", url, "\n", config);
        axios.get(url, config)
            .then(successCallback)
            .catch(errorCallback);
    }).catch(errorCallback);
}

export function DeleteWithHeader(url, params, headers, successCallback, errorCallback) {

    storageAccount.get().then(account => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            params: {
                token: account.token,
                username: account.information.username,
                ...params,
            }
        };
        //console.log("DeleteWithHeader", url, "\n", config);
        axios.delete(url, config)
            .then(successCallback)
            .catch(errorCallback);
    }).catch(errorCallback);
}

export function PostWithBody(url, params, body, successCallback, errorCallback) {

    storageAccount.get().then(account => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                token: account.token,
                username: account.information.username,
                ...params,
            }
        };
        //console.log("PostWithBody", url, "\n", config);
        axios.post(url, body, config)
            .then(successCallback)
            .catch(errorCallback);
    }).catch(errorCallback);
}

export function PostWithFormData(url, file, successCallback, errorCallback) {

    storageAccount.get().then(account => {
        // let config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     params: {
        //         token: account.token,
        //         username: account.information.username,
        //     },
        //     // data: body,
        // };
        // console.log("PostWithBody", url, "\n", config);
        // axios.post(url, body, config)
        //     .then(successCallback)
        //     .catch(errorCallback);

        axios({
            method: "post",
            url: url + +"?username=" + account.information.username + "&token=" + account.token,
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // params: {
            //     token: account.token,
            //     username: account.information.username,
            // },
            //onUploadProgress: (processEvent => console.log(processEvent))
        })
            .then(successCallback)
            .catch(errorCallback);
    }).catch(errorCallback);
}

export function PutWithBody(url, params, body, successCallback, errorCallback) {

    storageAccount.get().then(account => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                token: account.token,
                username: account.information.username,
                ...params,
            }
        };
        //console.log("PutWithBody", url, "\n", config);
        axios.put(url, body, config)
            .then(successCallback)
            .catch(errorCallback);
    }).catch(errorCallback);
}

export function PostBody(url, body, successCallback, errorCallback) {

    axios.post(url, body)
        .then(successCallback)
        .catch(errorCallback);
}











