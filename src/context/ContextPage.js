import React from 'react';
import TransformAccount from "../transform/TransformAccount";
import GetDataApi from "../api/GetDataApi";
import StorageAccount from "../storage/StorageAccount";


const ContextPage = React.createContext();

const storageAccount = new StorageAccount();

const transformAccount = new TransformAccount();

const getData = (value, setData) => GetDataApi(value, (data, status) => setData(status ? data : -1));

export class ContextPageProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            menuItem: transformAccount.menuItem(),
            setMenuItem: this.setMenuItem.bind(this),
            reset: this.reset.bind(this),
            setDefaultPage: this.setDefaultPage.bind(this),
        }
    }

    setDefaultPage() {

        storageAccount.get()
            .then(value => {
                value.menus.forEach(item => {
                    if (item.defaultPage) {
                        this.menuItem = transformAccount.menuItem(item);
                    }
                });
                this.setMenuItem(this.menuItem);
            })
            .catch(error => {
                this.menuItem = transformAccount.menuItem({value: -1});
                this.setMenuItem(this.menuItem);
            });
    }

    reset(runAfterDone) {
        this.menuItem = transformAccount.menuItem();
        this.data = null;
        this.setState({...this.state});
        if (typeof runAfterDone === "function") {
            runAfterDone();
        }
    }

    setMenuItem = (item = {value: -1}) => this.setState({...this.state, menuItem: transformAccount.menuItem(item)});

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.menuItem.value !== prevState.menuItem.value) {
            if (this.state.menuItem.value === -1) {
                this.setState({...this.state, data: null});
            } else {
                this.setState({...this.state, data: null})
                setTimeout(() =>
                    getData(this.state.menuItem.value, data => {
                        this.setState({...this.state, data: data})
                    }), 1000);
            }
        }
    }

    componentDidMount() {
        this.setDefaultPage();
    }

    render() {
        return (
            <ContextPage.Provider value={this.state}>
                {this.props.children}
            </ContextPage.Provider>
        );
    }

}


export const ContextPageConsumer = ContextPage.Consumer;
