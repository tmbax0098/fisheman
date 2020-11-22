import TransformResult from "./TransformResult";

export default class TransformList extends TransformResult {

    getList(data) {
        if (typeof data !== "object") {
            data = {};
        }
        return {
            columns: data.hasOwnProperty('columns') && Array.isArray(data.columns) ? data.columns.map(item => this.getColumn(item)) : [],
            rows: data.hasOwnProperty('rows') ? data.rows : [],
            title: data.hasOwnProperty('title') ? data.title : "عنوان لیست",
            data: data.hasOwnProperty('data') ? data.data : null,
            state: data.hasOwnProperty('state') ? data.state : false,
            message: data.hasOwnProperty('message') ? data.message : null,
            exception: data.hasOwnProperty('exception') ? data.exception : null,
        }
    }

    getColumn(data) {
        if (typeof data !== "object") {
            data = {};
        }


        return {
            id: data.hasOwnProperty('id') ? data.id : -1,
            name: data.hasOwnProperty('name') ? data.name : "",
            text: data.hasOwnProperty('text') ? data.text : "",
            visible: data.hasOwnProperty('visible') ? data.visible : false,
        }
    }

    getRow(data) {
        if (typeof data !== "object") {
            data = {};
        }

        return {
            actions: data.hasOwnProperty('actions') && Array.isArray(data.actions) ? data.actions.map(item => this.action(item)) : [],
            values: data.hasOwnProperty('values') && Array.isArray(data.values) ? data.values : [],
        }
    }

}
