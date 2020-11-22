import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Item, Spinner, Thumbnail, View} from 'native-base';
import TextBox from "../../../components/v2/TextBox";
import {ContextAccountConsumer} from '../../../context/ContextAccount';
import PickerBox from "../../../components/v2/PickerBox";
import PrimaryButton from '../../../components/PrimaryButton';
import UpdateProfileApi from '../../../api/UpdateProfileApi';
import MobilePhoneBox from "../../../components/v2/MobilePhoneBox";
import showMessage from "../../../api/tools/showMessage";
import NumberBox from "../../../components/v2/NumberBox";
import DatePicker from "../../../components/v2/DatePicker";
import ImagePicker from 'react-native-image-picker';
import {UploadProfileImageApi} from "../../../api/UploadProfileImageApi";
import GetProfileApi from "../../../api/GetProfile";
import AlertSheet from "../../../components/v2/AlertSheet";
import CloseMessage from "../../../components/v2/CloseMessage";
import PagePath from "../../PagePath";
import {Redirect} from 'react-router-native';
import TransformAccount from "../../../transform/TransformAccount";

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'انتخاب عکس',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const dic = {
    firstName: {
        label: 'نام',
    },
    lastName: {
        label: 'نام خانوادگی',
    },
    fatherName: {
        label: 'نام پدر',
    },
    gender: {
        label: 'جنسیت',
    },
    nationalCode: {
        label: 'کد ملی',
    },
    username: {
        label: 'نام کاربری',
    },
    phoneNumber: {
        label: 'شماره تماس',
    },
    save: {
        label: 'ثبت پروفایل',
    },
};

const transformAccount = new TransformAccount();

export function SegmentProfile(props) {

    const refSheet = useRef(null);

    const [disabled, setDisabled] = useState(false);
    const [uploadWaiting, setUploadWaiting] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const closeAlertSheet = () => refSheet.current.close();
    const openAlertSheet = () => refSheet.current.open();

    useEffect(() => {

        if (disabled) {
            UpdateProfileApi((message, status, error) => {
                setTimeout(() => setDisabled(false), 500);
                showMessage(message, status);
            });
        }

    }, [disabled])


    return (
        <View>
            {redirect ? <Redirect to={PagePath.confirmPhoneNumber}/> : null}
            <ContextAccountConsumer>
                {
                    ({information, updateProfileItem, resetConfirm}) => (
                        <View style={styles.container}>
                            <Item style={styles.item}/>
                            <Item style={styles.item}/>

                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Button
                                    large
                                    transparent
                                    icon
                                    onPress={() => {

                                        if (uploadWaiting) {
                                            return;
                                        }

                                        ImagePicker.launchImageLibrary(options, (response) => {

                                            // Same code as in above section!
                                            if (response.hasOwnProperty('data')) {

                                                setUploadWaiting(true);
                                                UploadProfileImageApi(response, (data, status, error) => {
                                                    if (status) {
                                                        GetProfileApi((data, status, error) => {
                                                            //inja khata dare
                                                            if (status) {
                                                                updateProfileItem(transformAccount.information(data.data));
                                                                setTimeout(() => {
                                                                    showMessage("عکس پروفایل با موفقیت آپلود شد.", true);
                                                                    setUploadWaiting(false);
                                                                }, 1000);
                                                            } else {
                                                                showMessage("خطا در آپدیت اطلاعات", false);
                                                                setUploadWaiting(false);
                                                            }
                                                        });
                                                    } else {
                                                        showMessage("خطا در آپلود عکس", false);
                                                        setUploadWaiting(false);
                                                    }
                                                })


                                                // const storageAccount = new StorageAccount();
                                                // storageAccount.get().then(account => {
                                                //     const url = ApiUrl.api.clients.profileImage + "?username=" + account.information.username + "&token=" + account.token;
                                                //     let data = new FormData();
                                                //     data.append('file', {
                                                //         name: response.fileName,
                                                //         fileName: response.fileName,
                                                //         type: response.type,
                                                //         uri: response.uri,
                                                //         data: response.data
                                                //     })
                                                //     const config = {
                                                //         method: 'POST',
                                                //         headers: {
                                                //             'Accept': 'application/json',
                                                //             'Content-Type': 'multipart/form-data',
                                                //         },
                                                //         body: data,
                                                //     }
                                                //     fetch(url, config)
                                                //         .then(res => {
                                                //             if (res.status === 200) {
                                                //                 GetProfileApi((data, status, error) => {
                                                //                     //inja khata dare
                                                //                     if (status) {
                                                //                         updateProfileItem(transformAccount.information(data.data));
                                                //                         setTimeout(() => showMessage("عکس پروفایل با موفقیت آپلود شد.", true), 1000);
                                                //                     } else {
                                                //                         showMessage("خطا در آپدیت اطلاعات", false);
                                                //                     }
                                                //                 });
                                                //             } else {
                                                //                 showMessage("خطا در آپلود عکس", false);
                                                //             }
                                                //             setUploadWaiting(false);
                                                //         })
                                                //         .catch(err => {
                                                //             showMessage("خطا در آپلود عکس", false);
                                                //             setUploadWaiting(false);
                                                //         });
                                                // });

                                            }
                                        });
                                    }}>

                                    {uploadWaiting ? <Spinner/> :

                                        <Thumbnail
                                            onError={e => e.target.source = require("./../../../../public/avatar.png")}
                                            source={information.image !== "" ? {uri: information.image} : require("./../../../../public/avatar.png")}
                                            style={{
                                                minWidth: 70,
                                                minHeight: 90,
                                                padding: 5,
                                            }}
                                        />}
                                </Button>
                            </View>

                            <Item style={styles.item}/>

                            <TextBox
                                text={dic.username.label}
                                visible={true}
                                readOnly={true}
                                values={[information.username]}
                                onChange={value => updateProfileItem({username: value})}/>

                            <Item style={styles.item}/>
                            <TextBox
                                text={dic.nationalCode.label}
                                visible={true}
                                readOnly={true}
                                values={[information.nationalCode]}
                                onChange={value => updateProfileItem({nationalCode: value})}/>
                            <Item style={styles.item}/>
                            <NumberBox
                                text={"شماره شناسنامه"}
                                visible={true}
                                values={[information.numberId]}
                                onChange={value => updateProfileItem({numberId: value})}/>
                            <Item style={styles.item}/>
                            <TextBox
                                text={dic.firstName.label}
                                visible={true}
                                readOnly={disabled}
                                maxLength={25}
                                placeholder={'نام'}
                                values={[information.firstName]}
                                onChange={value => updateProfileItem({firstName: value})}/>
                            <Item style={styles.item}/>
                            <TextBox
                                text={dic.lastName.label}
                                visible={true}
                                readOnly={disabled}
                                maxLength={35}
                                placeholder={'نام خانوادگی'}
                                values={[information.lastName]}
                                onChange={value => updateProfileItem({lastName: value})}/>
                            <Item style={styles.item}/>
                            <TextBox
                                text={dic.fatherName.label}
                                visible={true}
                                readOnly={disabled}
                                maxLength={25}
                                placeholder={'نام پدر'}
                                values={[information.fatherName]}
                                onChange={value => updateProfileItem({fatherName: value})}/>
                            <Item style={styles.item}/>
                            <DatePicker
                                visible={true}
                                text={"تاریخ تولد"}
                                values={[information.birthday]}
                                onChange={value => updateProfileItem({birthday: value})}/>
                            <Item style={styles.item}/>
                            <PickerBox
                                text={dic.gender.label}
                                visible={true}
                                readOnly={disabled}
                                options={[{text: 'مرد', value: 1}, {text: 'زن', value: 2}]}
                                iconName={null}
                                values={[information.gender]}
                                onChange={value => updateProfileItem({gender: value})}/>
                            <Item style={styles.item}/>
                            <MobilePhoneBox
                                readOnly={true}
                                visible={true}
                                values={[information.phoneNumber]}
                                text={dic.phoneNumber.label}
                                onChange={newValue => updateProfileItem({phoneNumber: newValue})}
                                component={
                                    <Button
                                        onPress={openAlertSheet}
                                        icon
                                        light
                                        transparent
                                    >
                                        <Icon name={'pencil'} type={"Entypo"} size={12}/>
                                    </Button>
                                }
                            />
                            <Item style={styles.item}/>
                            <PrimaryButton
                                label={dic.save.label}
                                wait={disabled}
                                onPress={() => setDisabled(true)}/>
                            <Item style={styles.item}/>
                            <Item style={styles.item}/>
                            <AlertSheet
                                height={200}
                                component={
                                    <CloseMessage
                                        message={'آیا می خواهید شماره تلفن خود را تغییر دهید؟\n\nبرای این کار باید عملیات احراز شماره تلفن را تکرار کنید.'}
                                        onAccept={() => {
                                            closeAlertSheet();
                                            resetConfirm(() => setRedirect(true));
                                        }}
                                        onReject={closeAlertSheet}/>
                                }
                                refSheet={refSheet}
                            />
                        </View>
                    )}
            </ContextAccountConsumer>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginTop: 20
    },
    labelCenter: {
        justifyContent: 'center',
        paddingRight: 5,
        width: 100,
    },
});
