import TransformControl from "./TransformControl";

export default class TransformForm extends TransformControl {

    getForm(data = {}) {
        if (!data) {
            data = {};
        }
        return {
            title: data.hasOwnProperty('title') ? data.title : "Form Title",
            controls: data.hasOwnProperty('controls') ? typeof data.controls === "object" ? data.controls.map(item => this.get(item)) : [] : [],
        }
    }

    getFormResult(data = {}) {
        if (!data) {
            data = {};
        }
        return {
            requestName: data.hasOwnProperty('requestName') ? data.requestName : "نام",
            requestType: data.hasOwnProperty('requestType') ? data.requestType : "نوع",
            resultType: data.hasOwnProperty('resultType') ? data.resultType : 3,
            methodType: data.hasOwnProperty('methodType') ? data.methodType : 1,
            forms: data.hasOwnProperty('forms') ? data.forms.map(item => this.getForm(item)) : [],
            parameters: data.hasOwnProperty('parameters') ? data.parameters : [],
            nextButtonText: data.hasOwnProperty('nextButtonText') ? data.nextButtonText : "بعدی",
            previousButtonText: data.hasOwnProperty('previousButtonText') ? data.previousButtonText : "قبلی",
            submitButtonText: data.hasOwnProperty('submitButtonText') ? data.submitButtonText : "ارسال",
            dismissButtonText: data.hasOwnProperty('dismissButtonText') ? data.dismissButtonText : "لغو",
        }
    }

    getDoneResult(data = {}) {
        if (!data) {
            data = {};
        }

        return {
            state: data.hasOwnProperty('state') ? data.state : false,
            message: data.hasOwnProperty('message') ? data.message : "",
            exception: data.hasOwnProperty('exception') ? data.exception : "",
        }
    }

    createPacket(formsArray = [], parameters = []) {

        let packet = {};

        formsArray.forEach(form => {
            form.controls.map(item => packet[item.name] = item.type === 6 ? item.values : item.values[0]);
        });

        return packet;
    }
}
