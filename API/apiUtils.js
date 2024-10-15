import axios from 'axios';

const baseURL = 'http://192.168.1.186:8081/api/'; // Địa chỉ cơ sở của máy chủ API

const apiconnect = () => {
    return axios.create({
        baseURL: baseURL,
        timeout: 10000,
    });
};

export default apiconnect;