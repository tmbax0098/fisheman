import OnAnswer from './OnAnswer';

export default function SuccessCallback(response, onAnswer = OnAnswer) {

    // console.log("SuccessCallback", response.data.hasOwnProperty("data") ? " response.data.data" : "response.data");
    // console.log(response.data.hasOwnProperty("data") ? response.data.data : response.data);


    switch (response.status) {
        case 200:
            onAnswer(response.data, true, false);
            break;
        default:
            onAnswer('Bad request {Code : ' + response.status + '}', false, false);
            break;

    }
};
