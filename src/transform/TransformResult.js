export default class TransformResult {

    doneResult(data) {

        if (typeof data !== "object") {
            data = {};
        }

        return {
            state: data.hasOwnProperty('state') ? data.state : false,
            message: data.hasOwnProperty('message') ? data.message : "",
            exception: data.hasOwnProperty('exception') ? data.exception : "",
            data: data.hasOwnProperty('data') ? data.data : {},
        }
    }

    downloadResult(data) {
        if (typeof data !== "object") {
            data = {};
        }

        return {
            url: data.hasOwnProperty('url') ? data.url : "",
            fileName: data.hasOwnProperty('fileName') ? data.fileName : "filename",
            state: data.hasOwnProperty('state') ? data.state : false,
            message: data.hasOwnProperty('message') ? data.message : "",
            exception: data.hasOwnProperty('exception') ? data.exception : "",
        }
    }

    detailsResult(data) {
        if (typeof data !== "object") {
            data = {};
        }

        return {
            state: data.hasOwnProperty('state') ? data.state : false,
            message: data.hasOwnProperty('message') ? data.message : "",
            exception: data.hasOwnProperty('exception') ? data.exception : "",
            title: data.hasOwnProperty('title') ? data.title : "",
            data: data.hasOwnProperty('exception') && Array.isArray(data.data) ? data.data.map(item => this.toTextValue(item)) : [],
            actions: data.hasOwnProperty('actions') ? data.actions.map(item => this.action(item)) : [],

        }
    }

    toTextValue(data) {
        if (typeof data !== "object") {
            data = {};
        }

        return {
            text: data.hasOwnProperty('text') ? data.text : "",
            value: data.hasOwnProperty('value') ? data.value : "",
        }
    }

    action(data) {
        if (typeof data !== "object") {
            data = {};
        }

        return {
            requestName: data.hasOwnProperty('requestName') ? data.requestName : "",
            requestType: data.hasOwnProperty('requestType') ? data.requestType : 1,
            resultType: data.hasOwnProperty('resultType') ? data.resultType : 1,
            methodType: data.hasOwnProperty('methodType') ? data.methodType : 1,
            displayType: data.hasOwnProperty('displayType') ? data.displayType : 1,
            icon: data.hasOwnProperty('icon') ? data.icon : "",
            text: data.hasOwnProperty('text') ? data.text : null,
            backgroundColor: data.hasOwnProperty('backgroundColor') ? data.backgroundColor : "#ffffff",
            parameters: data.hasOwnProperty('parameters') ? data.parameters : [],

        }
    }

}
