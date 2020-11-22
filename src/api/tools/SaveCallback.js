import OnAnswer from './OnAnswer';
import Message from "./Message";

export default function SaveCallback(response, onAnswer = OnAnswer) {

    switch (response.status) {

        case 200:
            if (response.data.state) {
                onAnswer(Message.update.success, true, false);
            } else {
                onAnswer(Message.update.fail, false, false);
            }
            break;
        default:
            onAnswer(Message.update.fail, false, false);
            break;

    }
};
