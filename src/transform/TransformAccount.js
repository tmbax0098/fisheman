export default class TransformAccount {

    get(data = {}) {
        if (!data) {
            data = {};
        }
        return {
            token: data.hasOwnProperty('token') ? data.token : "",
            phoneNumberConfirmed: data.hasOwnProperty('phoneNumberConfirmed') && typeof data.phoneNumberConfirmed === "boolean" ? data.phoneNumberConfirmed : false,
            information: this.information(data.hasOwnProperty('information') ? data.information : {}),
            menus: data.hasOwnProperty('menus') ? data.menus.map(item => this.menuItem(item)) : [],
            dashboard: data.hasOwnProperty('dashboard') ? this.transformToDashboard(data.dashboard) : [],
            years: this.transformToArray(data.hasOwnProperty('years') ? data.years : []),
            companies: this.transformToArray(data.hasOwnProperty('companies') ? data.companies : []),
        };
    }

    transformToArray(arrayObject) {

        if (!Array.isArray(arrayObject)) {
            arrayObject = [];
        }

        return arrayObject.filter(element => element.hasOwnProperty('text') && element.hasOwnProperty('value'));
    }

    transformToDashboard(arrayObject = null) {

        if (!Array.isArray(arrayObject)) {
            arrayObject = [];
        }

        return arrayObject.filter(element =>
            element.hasOwnProperty('text') &&
            element.hasOwnProperty('number') &&
            element.hasOwnProperty('icon') &&
            element.hasOwnProperty('color'));

    };

    information(data) {
        if (!data) {
            data = {};
        }

        return {
            username: data.hasOwnProperty('username') ? data.username : '',
            birthday: data.hasOwnProperty('birthday') ? data.birthday : '1000/01/01',
            fatherName: data.hasOwnProperty('fatherName') ? data.fatherName : '',
            firstName: data.hasOwnProperty('firstName') ? data.firstName : '',
            gender: data.hasOwnProperty('gender') ? data.gender : 1,
            image: data.hasOwnProperty('image') ? data.image : '',
            lastName: data.hasOwnProperty('lastName') ? data.lastName : '',
            nationalCode: data.hasOwnProperty('nationalCode') ? data.nationalCode : '',
            numberId: data.hasOwnProperty('numberId') ? data.numberId : '',
            phoneNumber: data.hasOwnProperty('phoneNumber') ? data.phoneNumber : '09000000000',
        };
    }

    menuItem(data = {value: -1}) {
        if (!data) {
            data = {};
        }

        return {
            text: data.hasOwnProperty('text') ? data.text : '',
            resultType: data.hasOwnProperty('resultType') ? data.resultType : 1,
            value: data.hasOwnProperty('value') ? data.value : 0,
            group: data.hasOwnProperty('group') ? data.group : '',
            groupText: data.hasOwnProperty('groupText') ? data.groupText : '',
            defaultPage: data.hasOwnProperty('defaultPage') ? data.defaultPage : false,
        };
    }

    form(data) {
        if (!data) {
            data = {};
        }

        return {
            title: data.hasOwnProperty('title') ? data.title : '',
            controls: data.hasOwnProperty('controls') ? data.controls : [],
        };
    }

    createMenu(menus) {

        if (!Array.isArray(menus)) {
            return [];
        }

        let items = menus.map(item => this.menuItem(item));

        const result = items.filter(element => element.group === "");

        items.filter(element => element.group !== "")
            .forEach(item => {
                if (result.filter(element => element.group === item.group).length === 0) {
                    result.push({
                        ...item,
                        content: items.filter(element => element.group === item.group),
                    });
                }
            });

        return result;
    }


}
