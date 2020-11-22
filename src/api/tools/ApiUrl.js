const root = 'http://fisheman.ir';
const api = root + '/api';
const clients = api + '/clients';

const ApiUrl = {
    api: {
        index: root + '/api',
        clients: {
            index: clients,
            requested: clients + "/Requested",
            login: clients + '/Login',
            profile: clients + '/Profile',
            salarySlips: clients + '/SalarySlips',
            dashboard: clients + '/Dashboard',
            sendVerifyCode: clients + "/SendVerifyCode",
            verfiyPhonenumber: clients + "/VerfiyPhonenumber",
            changePassword: clients + "/changePassword",
            profileImage: clients + '/profileImage',
            checkNewVersion: clients + "/checkNewVersion",
        },
    },
};

export default ApiUrl;
