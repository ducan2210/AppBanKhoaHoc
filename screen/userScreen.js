import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import apiconnect from '../API/apiUtils';
import style from '../styles/userStyle';

const UserScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const api = apiconnect();

  const loadUserData = async () => {
    try {
      const id = await AsyncStorage.getItem('UserID');
      const name = await AsyncStorage.getItem('UserName');
      if (id && name) {
        setUserID(id);
        setUserName(name);
        setIsLoading(true);
        const response = await api.get(`HocVien/lay-thong-tin-hoc-vien-theo-mahv?maHv=${id}`);
        setUserProfile(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false); // Stop loading if userID or userName is not available
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
    Alert.alert("Đăng xuất thành công! Hẹn gặp lại bạn");
  };

  return (
    <KeyboardAwareScrollView style={style.container}>
      <View style={style.header}>
        <View style={style.title}>
          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Tài khoản</Text>
        </View>
        <View style={style.iconShop}>
          <TouchableOpacity>
            <AntDesign name="shoppingcart" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={style.body}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={style.userProfile}>
              <View>
                <Image style={style.userImage} source={userProfile.avata ? { uri: `${userProfile.avata}` } : require('./images/user.png')} />
              </View>
              <Text style={{ fontSize: 25 }}>{userProfile.hoTen}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Fontisto name="email" size={22} color={'black'} style={{ marginRight: 5 }}></Fontisto>
                <Text style={{ fontSize: 20 }}>Email: {userProfile.email}</Text>
              </View>
            </View>
            <View style={style.settingUserBox}>
              <View>
                <Text style={{ fontSize: 20, color: 'grey' }}>Cài đặt tài khoản</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('SettingUser')}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                  <Text style={{ fontSize: 24, }}>Chỉnh sửa thông tin cá nhân </Text>
                  <AntDesign name="right" size={20} color={'black'} />
                </View>
              </TouchableOpacity>
              <Button title="Đăng xuất" onPress={handleLogout} />
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

export default UserScreen;
