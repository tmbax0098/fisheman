import Storage from "./Storage";

export default class StorageAccount extends Storage {

    constructor(props) {
        super(props);
        this.transform = this.transforms.transformAccount;
        this.keyName = this.keys.transformAccount;
    }

    isLogin = async () => {
        let account = await this.get();

        return account.token !== "";
    }

    isConfirmPhoneNumber = async () => {
        let account = await this.get();

        return account.phoneNumberConfirmed;
    }

    getMenus = async () => {
        await this.get().then(value => {
            return Array.isArray(value.menus) ? value.menus : [];
        }).catch(error => {
            return []
        })
    }

}
