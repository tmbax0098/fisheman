import OnAnswer from "./tools/OnAnswer";
import ErrorCallback from "./tools/ErrorCallback";
import ApiUrl from "./tools/ApiUrl";
import StorageAccount from "../storage/StorageAccount";

export function UploadProfileImageApi(photo, onAnswer = OnAnswer) {

    const error = error => ErrorCallback(error, onAnswer);

    const storageAccount = new StorageAccount();
    storageAccount.get().then(account => {
        const url = ApiUrl.api.clients.profileImage + "?username=" + account.information.username + "&token=" + account.token;
        let data = new FormData();
        data.append('file', {
            name: photo.fileName,
            fileName: photo.fileName,
            type: photo.type,
            uri: photo.uri,
            data: photo.data
        })
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        }
        fetch(url, config)
            .then(res => {
                if (res.status === 200) {
                    onAnswer(null, true, false);
                } else {
                    onAnswer(null, false, false);
                }
            })
            .catch(error);


        // res => {
        //     if (res.status === 200) {
        //         onAnswer(null, true, false);
        //     } else {
        //         onAnswer(null, false, false);
        //     }
        // }
    });


}
