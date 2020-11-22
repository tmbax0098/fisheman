import React from "react";

export default class TransformControl {

    checkValueAccordingToType(type, values) {
        if (!values) {
            values = [];
        }
        switch (type) {
            case 1 :
                return values.length === 0 ? [-1] : values
            case 2 :
                return values.length === 0 ? ["",] : values
            case 3 :
                return values.length === 0 ? [0] : !isNaN(values[0]) ? values : [0]
            case 4 :
                return values.length === 0 ? ["1399-01-01"] : values
            case 5 :
                return values.length === 0 ? ["00:00:00"] : values
            case 6 :
                return values.length === 0 ? [-1] : values
            case 7 :
                return values.length === 0 ? ["",] : values
            case 8 :
                return values.length === 0 ? ["0",] : values
            case 9 :
                return values.length === 0 ? ["",] : values
            case 10 :
                return values.length === 0 ? ["",] : values
            case 11 :
                return values.length === 0 ? ["",] : values
            case 12 :
                return values.length === 0 ? ["",] : values
            default:
                return values.length === 0 ? ["",] : values
        }
    }

    get(data) {
        if (!data) {
            data = {};
        }

        return {
            id: data.hasOwnProperty('id') ? data.id : "",
            name: data.hasOwnProperty('name') ? data.name : "name",
            text: data.hasOwnProperty('text') ? data.text : "",
            required: data.hasOwnProperty('required') ? data.required : false,
            options: data.hasOwnProperty('options') ? data.options : [],
            type: data.hasOwnProperty('type') ? data.type : 2,
            values: this.checkValueAccordingToType(data.hasOwnProperty('type') ? data.type : 2, data.hasOwnProperty('values') ? data.values : []),
            description: data.hasOwnProperty('description') ? data.description : "",
            index: data.hasOwnProperty('index') ? data.index : -1,
            visible: data.hasOwnProperty('visible') ? data.visible : false,
            placeholder: data.hasOwnProperty('placeholder') ? data.placeholder : "",
            maxLength: data.hasOwnProperty('maxLength') ? data.maxLength : 100,
            minLength: data.hasOwnProperty('minLength') ? data.minLength : 0,
            readOnly: data.hasOwnProperty('readOnly') && typeof data.readOnly === "boolean" ? data.readOnly : false,
        }
    }

}
