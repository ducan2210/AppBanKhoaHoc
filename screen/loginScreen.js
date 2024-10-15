import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import apiconnect from '../API/apiUtils';
import style from '../styles/loginStyle';
import { isValiEPassword, isValiEmail } from '../validation/validation';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [thongTinHocVien, setthongTinHocVien] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [errorEmail, seterrorEmail] = useState('');
  const [errorPassword, seterrorPassword] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const api = apiconnect();

  // Kiểm tra trạng thái đăng nhập khi ứng dụng được khởi chạy
  useEffect(() => {
    const checkRememberLogin = async () => {
      try {
        const email = await AsyncStorage.getItem('rememberedEmail');
        const password = await AsyncStorage.getItem('rememberedPassword');

        if (email && password) {
          // Tự động đăng nhập với thông tin từ AsyncStorage
          resultsLogin(email, password);
        }
      } catch (error) {
        console.error('Error reading remembered login:', error);
      }
    };

    checkRememberLogin();
  }, []);

  const resultsLogin = (email, password) => {
    api.get(`NguoiDung/dang-nhap-tai-khoan-hoc-vien-moi-cua-an?email=${email}&mk=${password}`)
      .then(response => {
        if(response.data.message === "Succes" && response.data.trangThai === "Đã duyệt") {
          setthongTinHocVien(response.data);
          Alert.alert(`Chào mừng ${response.data.tenHV}`, "Chào mừng bạn đến với ứng dụng..., một ứng dụng học tập đầy tiềm năng!");

          // Lưu trạng thái đăng nhập nếu người dùng đã chọn "ghi nhớ đăng nhập"
          if (isChecked) {
            AsyncStorage.setItem('rememberedEmail', email);
            AsyncStorage.setItem('rememberedPassword', password);
          }

          navigation.navigate("StartScreen");
        } else if (response.data.message === "Succes" && response.data.trangThai !== "Đã duyệt") {
          Alert.alert("Thông báo","Tài khoản chưa được duyệt hoặc bị khóa, vui lòng truy cập website hoặc liên hệ với chúng tôi để biết thêm chi tiết!");
        } else {
          Alert.alert("Thông báo","Tài khoản không hợp lệ!");
        }
      })
      .catch(error => {
        console.error('Error searching courses:', error);
      });
  };

  useEffect(() => {
    if (thongTinHocVien.maHV) {
        AsyncStorage.setItem("UserID", thongTinHocVien.maHV);
        AsyncStorage.setItem("UserName", thongTinHocVien.tenHV);
    }
}, [thongTinHocVien]);

  const isValidEmailPassword = () => email.length > 0 && password.length > 0 && isValiEmail(email) && isValiEPassword(password);

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView>
        <View style={style.top}>
          <Text style={style.title}>ĐĂNG NHẬP</Text>
        </View>
        <View style={style.center}>
          <Text style={{ marginTop: 20 }}>Email:</Text>
          <TextInput
            onChangeText={text => {
              seterrorEmail(isValiEmail(text) ? '' : 'Định dạng email không hợp lệ!');
              setemail(text);
            }}
            style={style.input}
          />
          <Text style={{ color: 'red', fontSize: 12 }}>{errorEmail}</Text>
          <Text style={{ marginTop: 30 }}>Mật khẩu:</Text>
          <TextInput
            secureTextEntry={true}
            onChangeText={text => {
              seterrorPassword(isValiEPassword(text) ? '' : 'Mật khẩu không hợp lệ!');
              setpassword(text);
            }}
            style={style.input}
          />
          <Text style={{ color: 'red', fontSize: 12 }}>{errorPassword}</Text>
          <View style={style.questLogin}>
            <View>
              <BouncyCheckbox
                size={25}
                fillColor="#5985ec"
                text="Ghi nhớ đăng nhập"
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ textDecorationLine: 'none' }}
                onPress={() => setIsChecked(!isChecked)}
              />
            </View>
            <View>
              <TouchableOpacity>
                <Text style={{ color: '#5985ec' }}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={style.bottom}>
          <View>
            <TouchableOpacity
              disabled={!isValidEmailPassword()}
              onPress={() => {
                resultsLogin(email, password);
              }}
            >
              <View style={style.Button}>
                <Text style={style.txtLogin}>Đăng nhập</Text>
              </View>
            </TouchableOpacity>
            <View style={style.createAcc}>
              <Text style={{ fontSize: 20 }}>Chưa có tài khoản? </Text>
              <TouchableOpacity onPress={() => { navigation.navigate('CreateAcc') }}>
                <Text style={style.create}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.login2}>
            <View style={style.line} />
            <Text style={style.textlogin2}>Đăng nhập bằng tài khoản khác</Text>
            <View style={style.line} />
          </View>
          <View style={style.iconlogin2}>
            <View>
              <TouchableOpacity>
                <Image style={style.icon} source={require('./images/facebook.png')} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image style={style.icon} source={require('./images/google.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login;