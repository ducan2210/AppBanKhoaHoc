import React from 'react'
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import style from '../styles/createAccountStyle'
import DateTimePicker from '@react-native-community/datetimepicker';
import createAccountHook from '../API/createAccountHook';
import { isValiEPassword, isValiEPasswordUsed, isValiEmail } from '../validation/validation';
const CreateAccount = ({ navigation }) => {

    const [maxDate, setMaxDate] = useState(new Date()); // State cho ngày tháng năm tối đa

    useEffect(() => {
        // Lấy ngày tháng năm hiện tại và đặt làm ngày tháng năm tối đa
        setMaxDate(new Date());
      }, []);

    const {
        dateofbirth,
        showDatePicker,
        errorEmail,
        errorPassword,
        errorPassword2,
        password,
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
        okAccCount,

    } = createAccountHook(navigation);

    return (
        <View style={style.container}>
            <KeyboardAwareScrollView>
                <View style={style.top}>
                    <Text style={style.title}>ĐĂNG KÝ TÀI KHOẢN</Text>
                </View>
                <View style={style.center}>
                    <Text style={{ marginTop: 20, }}>Họ tên:</Text>
                    <TextInput style={style.input} onChangeText={(text) => { setName(text) }}></TextInput>

                    <Text style={{ marginTop: 20, }}>Ngày sinh:</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={style.input} >{formatDate(dateofbirth)}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateofbirth}
                            mode="date"
                            display="spinner"
                            maximumDate={maxDate} // Đặt ngày tháng năm tối đa cho phép chọ
                            onChange={onChange}
                        />
                    )}

                    <Text style={{ marginTop: 20, }}>Email:</Text>
                    <TextInput onChangeText={(text) => {
                        setErrorEmail(isValiEmail(text) ? '' : 'Định dạng email không hợp lệ!')
                        setEmail(text)
                    }} style={style.input}></TextInput>
                    <Text style={{ color: 'red', fontSize: 12 }}>{errorEmail}</Text>
                    <Text style={{ marginTop: 30, }}>Mật khẩu:</Text>

                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setErrorPassword(isValiEPassword(text) ? '' : 'Mật khẩu không hợp lệ!')
                            setPassword(text)
                        }} style={style.input}></TextInput>
                    <Text style={{ color: 'red', fontSize: 12 }}>{errorPassword}</Text>
                    <Text style={{ marginTop: 30, }}>Nhập lại mật khẩu:</Text>
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setPassword2(text)
                            setErrorPassword2(isValiEPasswordUsed(password, text) ? '' : 'Mật khẩu không trùng khớp!')
                        }} style={style.input}></TextInput>
                    <Text style={{ color: 'red', fontSize: 12 }}>{errorPassword2}</Text>

                </View>
                <View style={style.bottom}>
                    <View>
                        <TouchableOpacity
                            onPress={() => resultCreate()}
                            disabled={!okAccCount()}>
                            <View style={style.Button}>
                                <Text style={style.txtLogin}>Đăng ký tài khoản</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={style.usedAcc}>
                            <Text style={{ fontSize: 20 }}>Đã có tài khoản? </Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Login')
                            }}>
                                <Text style={style.login}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default CreateAccount;
