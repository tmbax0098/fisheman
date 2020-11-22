import React, {useEffect, useState} from 'react';
import {Button, Container, Content, Footer, Header, Icon, Left, Right, Text} from "native-base";
import styles from "../../components/v2/ControlStyleSheet";
import {Link} from "react-router-native";
import PagePath from "../PagePath";
import PrimaryButton from "../../components/PrimaryButton";
import downloadFile from "../../components/v2/DownloadFile";
import showMessage from "../../api/tools/showMessage";
import CheckNewVersionApi from "../../api/CheckNewVersionApi";
import TransformResult from "../../transform/TransformResult";


const transformResult = new TransformResult();

export default function PageAbout() {


    const [wait, setWait] = useState(true);
    const [updateExist, setUpdateExist] = useState(transformResult.downloadResult());
    const [waitDownload, setWaitDownload] = useState(false);


    const downloadUpdate = () => {

        if (waitDownload) {
            return;
        }

        setWaitDownload(true);
        downloadFile(updateExist, (data, status) => {

            if (status) {
                showMessage(data.message, status);
            } else {
                showMessage(data, status);
            }

            setWaitDownload(false);
        });
    }

    const checkNewVersion = () => CheckNewVersionApi((data, status) => {
        if (status) {

            setUpdateExist(transformResult.downloadResult(data));
            setWait(false);
        } else {
            setTimeout(checkNewVersion, 1000);
            //showMessage(data, status);
        }
    })

    useEffect(checkNewVersion, []);

    return (
        <Container>
            <Header>
                <Left>
                    <Link
                        component={Button}
                        primary
                        transparent
                        replace={true}
                        to={PagePath.panel.index}
                    >
                        <Icon name={'arrow-back'}/>
                    </Link>
                </Left>
                <Right style={{paddingRight: 15}}>
                    <Text style={styles.textHeaderRight}>
                        درباره ما
                    </Text>
                </Right>
            </Header>
            <Content padder scrollEnabled style={{paddingHorizontal: 20,}}>
                <Text style={{...styles.text, lineHeight: 30, marginTop: 20}}>
                    فیش من یک سامانه آنلاین است که در ابتدا به منظور دریافت فیش حقوقی کارکنان یک سازمان بدون نیاز به وب
                    سایت و خدمات هاستینگ در بستر خدمات ابری توسط شرکت عامل سیستم راه اندازی شد، سپس در پاسخ به نیازهای
                    کاربران، خدمات: درخواست مرخصی، درخواست گواهی اشتغال و دریافت حکم کارگزینی با قابلیت ارجاع پویا برای
                    مدیریت بهینه نیز به آن افزوده شد.
                </Text>

                <Text style={{...styles.text, lineHeight: 30, marginTop: 20}}>
                    ایده اولیه طراحی این سامانه علاوه بر ارائه خدمات کاربردی به سازمان ها؛ بر اساس کاهش مصرف کاغذ و کمک
                    به حفظ محیط زیست در قالب حذف کاغذ بازی های رایج در سازمان ها شکل گرفته است.
                </Text>

                <Text style={{...styles.text, lineHeight: 30, marginTop: 20}}>
                    سازمان های متقاضی این خدمات با ورود به وبسایت این سامانه به آدرس www.fisheman.ir پس از ثبت نام و
                    پرداخت هزینه ی مربوط به خدمات مورد نیاز خود، نسبت به ایجاد پروفایل اختصاصی سازمان خود اقدام نموده و
                    بصورت کاملا داینامیک فیش حقوقی و فرم های مورد نیاز خود را طراحی و استفاده نمایند. لازم به توضیح است
                    پرسنل هر سازمان با استفاده از اپلیکیشن این سامانه به اطلاعات مربوط به خود بصورت کاملا محرمانه دسترسی
                    خواهند داشت.
                </Text>
            </Content>
            {
                wait ?
                    null :
                    <Footer style={{padding: 0, margin: 0}}>
                        <PrimaryButton
                            color={'transparent'}
                            additionalStyle={{flex: 1, padding: 0, margin: 0}}
                            onPress={downloadUpdate}
                            visible={updateExist}
                            wait={waitDownload}
                            label={"دانلود بروزرسانی"}
                        />
                    </Footer>
            }
        </Container>

    );
};