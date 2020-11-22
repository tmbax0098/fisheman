import React from 'react';
import StorageAccount from "../storage/StorageAccount";

const storageAccount = new StorageAccount();

const ContextAccount = React.createContext();

export class ContextAccountProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...storageAccount.transform.get(),
            logout: this.logout.bind(this),
            setAccount: this.setAccount.bind(this),
            updateProfile: this.updateProfile.bind(this),
            updateProfileItem: this.addItem.bind(this),
            confirmPhone: this.confirmPhoneNumber.bind(this),
            resetConfirm: this.resetConfirm.bind(this),
        };
    }


    confirmPhoneNumber(runAfterDone) {
        this.state.confirmPhoneNumber = true;
        this.setState({...this.state});
        if (typeof runAfterDone === "function") {
            runAfterDone();
        }
    }

    resetConfirm(runAfterDone) {
        this.state.confirmPhoneNumber = false;
        this.setState({...this.state});
        if (typeof runAfterDone === "function") {
            runAfterDone();
        }
    }

    setAccount(data = null, runAfterDone = null) {
        this.update(data, runAfterDone);
    }

    logout(runAfterDone) {
        this.setAccount(null, runAfterDone);
    }

    addItem(data = {}) {
        if (!data) {
            data = {};
        }
        this.state.information = {...this.state.information, ...data};
        this.setState({...this.state, ...storageAccount.transform.get({...this.state})})
    }

    update(newValue, runAfterDone) {
        this.setState({...this.state, ...storageAccount.transform.get(newValue)});
        if (typeof runAfterDone === "function") {
            runAfterDone();
        }
    };

    updateProfile(newIfnormation) {
        this.setState({...this.state, information: storageAccount.transform.information(newIfnormation)});
    }

    componentDidMount() {
        storageAccount.get()
            .then(value => {
                this.setState({
                    ...this.state,
                    ...value,
                });
            }).catch(error => {
        })
        // this.setState({...this.state, ...storageAccount.get()})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        storageAccount.set(this.state);
    }

    render() {
        return (
            <ContextAccount.Provider value={this.state}>
                {this.props.children}
            </ContextAccount.Provider>
        );
    };
}

export const ContextAccountConsumer = ContextAccount.Consumer;

