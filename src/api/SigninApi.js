import OnAnswer from './tools/OnAnswer';
import {PostBody} from './tools/Infrastrcuture';
import ErrorCallback from './tools/ErrorCallback';
import ApiUrl from './tools/ApiUrl';

export default function SigninApi(body, onAnswer = OnAnswer) {

    const response = response => {
        if (response.status === 200) {
            if (response.data.data === null) {
                onAnswer(response.data.message, false, false);
            } else {
                onAnswer(response.data.data, true, false);
            }
        }
    };
    const error = error => ErrorCallback(error, onAnswer);

    PostBody(ApiUrl.api.clients.login, body, response, error);

};
