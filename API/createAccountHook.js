import { useState } from 'react';
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiconnect from '../API/apiUtils';
import { isValiEPassword, isValiEPasswordUsed, isValiEmail } from '../validation/validation';

const CreateAccountHook = (navigation) => {
    const api = apiconnect();
    
    const [dateofbirth, setDateofbirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPassword2, setErrorPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateofbirth;
        setShowDatePicker(false);
        setDateofbirth(currentDate);
    };

    const resultCreate = () => {
        api.post(`NguoiDung/tao-tai-khoan-hoc-vien-bang-email-appMobile?email=${email}&mk=${password}&tenHV=${name}&ngaySinh=${formatDate(dateofbirth)}`)
            .then(response => {
                if (response.data.message === "Succes") {
                    Alert.alert("Thông báo", "Đăng ký thành công, tự động chuyển hướng đến trang đăng nhập!")
                    navigation.navigate("Login");
                } else {
                    Alert.alert("Thông báo", "Địa chỉ email đã tồn tại, vui lòng nhập email khác!");
                }
            })
            .catch(error => {
                console.error('Error creating account:', error);
            });
    };

    const isValidEmailPassword = () => {
        return email.length > 0 && password.length > 0 && isValiEmail(email) && isValiEPassword(password);
    };

    const checkName = () => {
        return name.length > 0;
    };

    const checkPass = () => {
        return isValiEPasswordUsed(password, password2);
    };

    const okAccCount = () => {
        return checkName() && checkPass();
    };

    return {
        dateofbirth,
        showDatePicker,
        errorEmail,
        errorPassword,
        errorPassword2,
        email,
        name,
        password,
        password2,
        setShowDatePicker,
        setEmail,
        setName,
        setPassword,
        setPassword2,
        setErrorEmail,
        setErrorPassword,
        setErrorPassword2,
        onChange,
        formatDate,
        resultCreate,
        isValidEmailPassword,
        checkName,
        checkPass,
        okAccCount,
    };
};

export default CreateAccountHook;
