import React from 'react';
import {Text} from 'react-native';
import {Spinner} from "native-base";
import {SegmentProfile} from "./SegmentProfile";
import {ContextPageConsumer} from "../../../context/ContextPage";
import Dashboard from "../../../components/v2/Dashboard";
import FormResult from "../../../components/v2/FormResult";
import ListResult from "../../../components/v2/ListResult";

export default function SegmentLoader() {

    return <ContextPageConsumer>
        {({menuItem}) => (
            menuItem.value === -1 ? <SegmentProfile/> : <MenuItemPage/>
        )}
    </ContextPageConsumer>
}

const MenuItemPage = () => {

    return (
        <ContextPageConsumer>
            {({menuItem, data}) => (
                data === null ?
                    <Spinner/> :
                    <RenderResult
                        resultType={menuItem.resultType}
                        data={data}/>
            )}
        </ContextPageConsumer>
    )
}

const RenderResult = ({resultType, data}) => {

    switch (resultType) {
        case  0:
            return <Dashboard data={Array.isArray(data) ? data : []}/>
        case 1 :
            return <FormResult data={data}/>;
        case  2:
            return <ListResult data={data}/>;
        case  3:
            return <Text>3</Text>
        case  4:
            return <Text>4</Text>
        case  5:
            //its download file
            return <Text>5</Text>
        default:
            return <Text>not found</Text>
    }

}
