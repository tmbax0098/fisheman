import {Button, Text, View} from "native-base";
import Picker from "@gregfrench/react-native-wheel-picker";
import React, {useEffect, useState} from "react";
import theme from "../styles";
import styles from "../components/v2/ControlStyleSheet";

var PickerItem = Picker.Item;


export function isCabise(year) {
    return (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));
}

export const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const createNumberArray = (start, end) => {
    let data = [];
    for (let index = start; index <= end; index++) {
        data.push(index);
    }
    return data;
}

const monthDays = (year, month) => {
    if (month >= 1 && month < 7) {
        return createNumberArray(1, 31);
    } else if ((month >= 7 && month < 12) || isCabise(year)) {
        return createNumberArray(1, 30);
    } else {
        return createNumberArray(1, 29);
    }
}


const pickerProps = {
    style: styles.wheelPicker,
    lineColor: "#000000",
    lineGradientColorFrom: theme.palette.primary.main,
    lineGradientColorTo: theme.palette.primary.main,
    itemStyle: styles.wheelPickerItem,
};

const transform = (persianDate) => {
    try {
        let part = persianDate.split("-");
        return {
            year: parseInt(part[0]),
            month: parseInt(part[1]),
            day: parseInt(part[2]),
        }
    } catch (e) {
        return {
            year: 1300,
            month: 1,
            day: 1,
        }
    }
}

export function RadDatePicker({initialDate = "1300-1-1", onChange}) {


    const [year, setYear] = useState(transform(initialDate).year);
    const [month, setMonth] = useState(transform(initialDate).month);
    const [day, setDay] = useState(transform(initialDate).day);

    const [yearList] = useState(createNumberArray(1300, 1499));
    const [dayList, setDayList] = useState(monthDays(transform(initialDate).year, transform(initialDate).month));

    useEffect(() => setDayList(monthDays(year, month)), [year, month])

    return (
        <View style={{flexDirection: "column", paddingHorizontal: 20}}>
            <View style={{flexDirection: "row"}}>
                <Picker
                    {...pickerProps}
                    selectedValue={year}
                    onValueChange={value => setYear(value)}>
                    {
                        yearList.map((value, i) => (<PickerItem label={value + ""} value={value} key={i}/>))
                    }
                </Picker>
                <Picker
                    {...pickerProps}
                    selectedValue={month}
                    onValueChange={value => setMonth(value)}>
                    {
                        monthList.map((value, i) => (<PickerItem label={value + ""} value={value} key={i}/>))
                    }
                </Picker>
                <Picker
                    {...pickerProps}
                    selectedValue={day}
                    onValueChange={value => setDay(value)}>
                    {
                        dayList.map((value, i) => (<PickerItem label={value + ""} value={value} key={i}/>))
                    }
                </Picker>

            </View>
            <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 40}}>
                <Button
                    style={{flex: 1}}
                    light
                    transparent
                    onPress={() => onChange(initialDate)}>
                    <Text style={styles.textCenter}>لغو</Text>
                </Button>
                <Button
                    style={{flex: 1}}
                    primary
                    transparent
                    onPress={() => onChange([year, month, day].join('-'))}>
                    <Text style={styles.textCenter}>انتخاب</Text>
                </Button>
            </View>
        </View>
    )
}

const transformTime = (timeString) => {
    try {
        let part = timeString.split(":");
        return {
            hour: parseInt(part[0]),
            minute: parseInt(part[1]),
            second: parseInt(part[2]),
        }
    } catch (e) {
        return {
            hour: 0,
            minute: 0,
            second: 0,
        }
    }
}


export function RadTimePicker({initialTime = "00:00:00", onChange}) {

    const [hour, setHour] = useState(transformTime(initialTime).hour);
    const [minute, setMinute] = useState(transform(initialTime).minute);
    const [second, setSecond] = useState(transform(initialTime).second);

    const [hourList] = useState(createNumberArray(0, 23));
    const [minuteList] = useState(createNumberArray(0, 59));

    return (
        <View style={{flexDirection: "column"}}>
            <View style={{flexDirection: "row", paddingHorizontal: 20}}>
                <Picker
                    {...pickerProps}
                    selectedValue={hour}
                    onValueChange={value => setHour(value)}>
                    {
                        hourList.map((value, i) => (
                            <PickerItem label={value + ""} value={value} key={i}/>))
                    }
                </Picker>
                <Picker
                    {...pickerProps}
                    selectedValue={minute}
                    onValueChange={value => setMinute(value)}>
                    {
                        minuteList.map((value, i) => (<PickerItem label={value + ""} value={value} key={i}/>))
                    }
                </Picker>
                <Picker
                    {...pickerProps}
                    selectedValue={second}
                    onValueChange={value => setSecond(value)}>
                    {
                        minuteList.map((value, i) => (<PickerItem label={value + ""} value={value} key={i}/>))
                    }
                </Picker>

            </View>
            <View style={{flexDirection: "row", padding: 5, justifyContent: "space-around", marginTop: 40}}>
                <Button
                    style={{width: "40%"}}
                    transparent
                    primary
                    onPress={() => onChange(initialTime)}>
                    <Text style={styles.textSimple}>لغو</Text>
                </Button>
                <Button
                    style={{width: "40%"}}
                    transparent
                    light
                    onPress={() => onChange([hour, minute, second].join(':'))}>
                    <Text style={styles.textSimple}>انتخاب</Text>
                </Button>
            </View>
        </View>
    )
}
