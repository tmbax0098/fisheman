import Message from "../../api/tools/Message";
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';


const checkPermission = async (downloadImage, onAnswer = console.log) => {

    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission

    if (Platform.OS === 'ios') {
        downloadImage();
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'دسترسی به حافظه',
                    message: 'کاربر گرامی برای ذخیره دیتا بر روی گوشی نیازمند دسترسی می باشیم.',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //Once user grant the permission start downloading
                downloadImage();
            } else {
                //If permission denied then show alert 'Storage Permission Not Granted'
                onAnswer({message: Message.permission.denied}, false, true);
            }
        } catch (err) {
            //To handle permission related issue
            onAnswer({message: err.message}, false, true);
        }
    }
};

const download = (fileUrl, fileName, onAnswer) => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    //Getting the extention of the file
    //Get config and fs from RNFetchBlob
    //config: To pass the downloading related options
    //fs: To get the directory path in which we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.DownloadDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            //Related to the Android only
            useDownloadManager: true,
            notification: true,
            path: PictureDir + '/' + fileName,
            description: 'Image',
        },
    };

    config(options)
        .fetch('GET', fileUrl)
        .then(res => {
            //Showing alert after successful downloading
            onAnswer({message: Message.download.compelate}, true, false);
        })
        .catch(error => onAnswer({message: Message.download.fail}, false, true));
};

const downloadFile = (data, onAnswer) => {
    if (data.url !== null) {
        checkPermission(() => download(data.url, data.fileName, onAnswer), onAnswer);
    } else {
        onAnswer(data, false, false);
    }
}

export default downloadFile;
