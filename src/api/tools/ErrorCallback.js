import OnAnswer from './OnAnswer';
import Message from "./Message";

export default function ErrorCallback(error, onAnswer = OnAnswer) {

    //console.log(error);

    onAnswer(Message.global, false, true);
};
