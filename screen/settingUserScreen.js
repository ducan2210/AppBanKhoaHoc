import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ScrollView, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import apiconnect from '../API/apiUtils';
import style from '../styles/settingUserStyle';
import * as ImagePicker from 'expo-image-picker';

const SettingUserScreen = () => {
    const api = apiconnect();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    const [userImage, setUserImage] = useState("");
    const [userProfile, setUserProfile] = useState({});
    const [originalUserProfile, setOriginalUserProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    const [flag, setFlag] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [dateofbirth, setDateofbirth] = useState('');

    const [newUserName, setNewUserName] = useState('');

    const [refresh, setrefresh] = useState(true)

    const [maxDate, setMaxDate] = useState(new Date()); // State cho ngày tháng năm tối đa

    useEffect(() => {
        // Lấy ngày tháng năm hiện tại và đặt làm ngày tháng năm tối đa
        setMaxDate(new Date());
      }, []);

    const resultSave = () => {
        console.log(userProfile.maHv,userProfile.hoTen,userProfile.sdt,dateofbirth.toLocaleDateString())
        api.put(`HocVien/chinh-sua-thong-tin-ca-nhan-appMobile?maHv=${userProfile.maHv}&tenHV=${userProfile.hoTen}&sdt=${userProfile.sdt}&ngaySinh=${dateofbirth.toLocaleDateString()}`)
       .then(response => {
         if(response.data.status === "Succes") {
           Alert.alert("Thông báo","Chỉnh sửa thông tin thành công! Tự động chuyển về trang 'Tài Khoản'")
            setNewUserName(userProfile.hoTen);
            AsyncStorage.setItem('UserName', userProfile.hoTen);
            AsyncStorage.setItem('UserID', userProfile.maHv);
            navigation.navigate('User');
            setIsEditing(false);
            setFlag(false);    
         } else  {
           Alert.alert("Thông báo",response.data.message);
         }
       })
       .catch(error => {
         console.error('Error searching courses:', error);
       });
     }

    useEffect(() => {
        AsyncStorage.getItem('UserID').then(result => {
            setUserID(result);
        });
        AsyncStorage.getItem('UserName').then(result => {
            setUserName(result);
        });
    }, []);

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
    };

    useEffect(() => {
        if (userID) {
            api.get(`HocVien/lay-thong-tin-hoc-vien-theo-mahv?maHv=${userID}`)
                .then(response => {
                    setUserProfile(response.data);
                    setOriginalUserProfile(response.data); // Save the initial user profile
                    const userBirthday = response.data.ngaySinh ? new Date(response.data.ngaySinh) : new Date();
                    setDateofbirth(userBirthday);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error searching courses:', error);
                });
        }
    }, [userID, refresh]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        setDateofbirth(currentDate);
    };

    const handleUpdate = () => {
        Alert.alert(
            "Lưu thông tin",
            "Bạn có chắc muốn cập nhật lại thông tin cá nhân không?",
            [
                {
                    text: "Không",
                    onPress: () => {
                        
                        setIsEditing(true);
                        setFlag(true);
                    },
                    style: "cancel"
                },
                {
                    text: "Có",
                    onPress: () => {
                        resultSave();
                        
                    }
                }
            ]
        );
    };
    const handleCancel = () => {
        Alert.alert(
            "Huỷ thay đổi",
            "Bạn có chắc chắn muốn huỷ bỏ các thay đổi?",
            [
                {
                    text: "Không",
                    onPress: () => {
                        setIsEditing(true);
                        setFlag(true);
                    }
                },
                { text: "Có",onPress: () => {
                    setUserProfile(originalUserProfile); // Reset user profile to initial values
                    setDateofbirth(new Date(originalUserProfile.ngaySinh));
                    setIsEditing(false);
                    setFlag(false);
                },
                style: "cancel"}
            ]
        );
    };

    const updateAvatar = async (selectedImage ) => {
        try {
            const formData = new FormData();
            formData.append('maHv', userProfile.maHv);
            formData.append('avata', {
                uri: selectedImage,
                type: 'image/jpeg', // Loại ảnh của bạn có thể thay đổi tùy theo yêu cầu của API
                name: 'avatar.jpg', // Tên file của ảnh được chọn
            });
    
            const response = await api.put('HocVien/cap-nhat-anh-dai-dien-appMobile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo set header Content-Type là multipart/form-data
                },
            });
    
            if (response.data.status === 'Success') {
                setrefresh(!refresh)
                Alert.alert("Thông báo","Cập nhật ảnh đại diện thành công.")
            } else {
                // Xử lý trường hợp cập nhật không thành công
                console.log('Cập nhật ảnh đại diện không thành công.');
            }
        } catch (error) {
            // Xử lý trường hợp lỗi khi gửi yêu cầu
            console.error('Lỗi khi cập nhật ảnh đại diện:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0].uri;
            Alert.alert(
                "Thông báo",
                "Bạn có chắc chắn muốn thay đổi hình đại diện?",
                [
                    {
                        text: "Có",
                        onPress: () => {
                            updateAvatar(selectedImage); // Gọi hàm để cập nhật ảnh đại diện
                        }
                    },
                    { text: "Không",onPress: () => {
                       
                    },
                    style: "cancel"}
                ]
            );
            
        }
    };

    return (
        <KeyboardAwareScrollView style={style.container}>
            <View style={style.top}>
                <Text style={{ color: '#8eaaf7', fontWeight: 'bold', fontSize: 25, }}>THÔNG TIN HỌC VIÊN</Text>
            </View>
            <ScrollView style={style.center}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <View style={style.settingImage}>
                            <View>
                                <Image style={style.userImage} source={userProfile.avata ? { uri: `${userProfile.avata}` } : require('./images/user.png')} />
                            </View>
                            <View style={{marginLeft: 10}}>
                                <TouchableOpacity onPress={pickImage}>
                                    <View style={style.Button}>
                                        <Text style={style.txtLogin}>Chọn hình</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ marginTop: 20 }}>Họ tên:</Text>
                        <TextInput 
                            editable={flag} 
                            style={style.input} 
                            value={userProfile.hoTen} 
                            onChangeText={text => setUserProfile({ ...userProfile, hoTen: text })} 
                        />

                        <Text style={{ marginTop: 20 }}>Ngày sinh:</Text>
                        <TouchableOpacity
                            disabled={!flag}
                            onPress={() => setShowDatePicker(true)}>
                            <Text style={style.input}>{dateofbirth.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                maximumDate={maxDate} // Đặt ngày tháng năm tối đa cho phép chọ
                                onChange={onChange}
                            />
                        )}

                        <Text style={{ marginTop: 20 }}>Email:</Text>
                        <TextInput 
                            editable={false} 
                            style={style.input} 
                            value={userProfile.email} 
                            onChangeText={text => setUserProfile({ ...userProfile, email: text })} 
                        />

                        <Text style={{ marginTop: 20 }}>Số điện thoại:</Text>
                        <TextInput 
                            editable={flag} 
                            style={style.input} 
                            value={userProfile.sdt} 
                            onChangeText={text => setUserProfile({ ...userProfile, sdt: text })} 
                        />
                    </>
                )}
            </ScrollView>
            <View style={style.bottom}>
                {!isEditing && (
                    <Button title="Chỉnh sửa thông tin" onPress={() => { setIsEditing(true); setFlag(true); }} />
                    
                )}
                {isEditing && (
                    <View style={style.questSetting}>
                        <Button title="Lưu thông tin" onPress={handleUpdate} />
                        <Button title="Huỷ" onPress={handleCancel} />
                    </View>
                )}
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SettingUserScreen;
