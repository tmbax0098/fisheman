import React from 'react';
import PickerBox from "./PickerBox";
import TextBox from "./TextBox";
import NumberBox from "./NumberBox";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import MultiPickerBox from "./MultiPickerBox";
import TextAreaBox from "./TextAreaBox";
import MoneyBox from "./MoneyBox";
import EmailBox from "./EmailBox";
import PhoneBox from "./PhoneBox";
import MobilePhoneBox from "./MobilePhoneBox";
import PostalCodeBox from "./PostalCodeBox";
import TransformControl from "../../transform/TransformControl";
import ParagraphBox from "./ParagraphBox";


const transform = new TransformControl();

const RenderControl = ({data, onChange}) => {
    switch (data.type) {
        case 1 :
            return <PickerBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 2 :
            return <TextBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 3 :
            return <NumberBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 4 :
            return <DatePicker {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 5 :
            return <TimePicker {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 6 :
            return <MultiPickerBox {...data} onChange={values => onChange({...data, values: values})}/>
        case 7 :
            return <TextAreaBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 8 :
            return <MoneyBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 9 :
            return <EmailBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 10 :
            return <MobilePhoneBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 11 :
            return <PhoneBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 12 :
            return <PostalCodeBox {...data} onChange={value => onChange({...data, values: [value]})}/>
        case 13 :
            return <ParagraphBox {...data}/>
        default:
            return null
    }
}

export default function Control({controlProps, onChange}) {
    return <RenderControl data={transform.get(controlProps)} onChange={data => onChange(data)}/>
}
