import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View, Button, useWindowDimensions, Alert } from 'react-native';
import apiconnect from '../API/apiUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderHTML from 'react-native-render-html';
import gvInformationHook from '../API/gvInformationHook';
import freeHook from '../API/freeHook';
import { useNavigation } from '@react-navigation/native';
import style from '../styles/gvInformationStyle';

const GvInformationScreen = ({ route }) => {
  const { magv } = route.params;
  const navigation = useNavigation();
  const { RatingStars } = freeHook();
  const { isLoading, gvProfile } = gvInformationHook(magv);

  const handerKH = (maKH) => {
    navigation.navigate('DeepSearch', {flagChose: '1', maKh: maKH })
  }

  return (
    <KeyboardAwareScrollView style={style.container}>
      <View style={style.header}>
        <View>
          <Image style={style.userImage} source={gvProfile.avt ? { uri: `${gvProfile.avt}` } : require('./images/user.png')} />
        </View>
        <View >
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{gvProfile.hoTen}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Tổng số học viên</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{gvProfile.soHv}</Text>
            </View>
            <View style={{ marginLeft: 30 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Đánh giá</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 12 }}></Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={style.body}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Giới thiệu về tôi</Text>
              <Text style={{}}></Text>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Các khoá học của tôi ({gvProfile.soKh})</Text>

              {gvProfile.dskh.map(khoaHoc => (
                <View key={khoaHoc.maKh}>
                  <TouchableOpacity onPress={() => { handerKH(khoaHoc.maKh) }} style={style.item}>
                    <View style={style.itemImage}>

                      <Image style={{ borderRadius: 8, height: '100%', width: '100%' }} source={{ uri: `${khoaHoc.hinhAnh}` }} />
                    </View>
                    <View style={style.itemContent}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{khoaHoc.tenKh}</Text>
                      <Text style={{ color: '#98999b', fontSize: 15 }}>{gvProfile.hoTen}</Text>
                      <View style={style.rate}>
                        <Text style={{ fontSize: 15, color: "gold", marginRight: 5 }}>{khoaHoc.tongSao}</Text>
                        <View style={{ paddingTop: 3, marginRight: 5 }}>
                          <RatingStars rating={khoaHoc.tongSao} />
                        </View>
                        <Text style={{ marginRight: 5, color: '#98999b' }}>({khoaHoc.tongDg})</Text>
                      </View>
                      <View style={style.price}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                          {khoaHoc.donGia !== null ? khoaHoc.donGia.toLocaleString() : '0'}
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline', marginLeft: 5 }}>đ</Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View >
              <TouchableOpacity>
                <View style={{ ...style.danhMuc }}>
                  <Text style={{ fontSize: 20, marginTop: 10 }}>Website </Text>
                  <AntDesign name="right" size={20} color={'black'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{ ...style.danhMuc }}>
                  <Text style={{ fontSize: 20, marginTop: 10 }}>Facebook </Text>
                  <AntDesign name="right" size={20} color={'black'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{ ...style.danhMuc }}>
                  <Text style={{ fontSize: 20, marginTop: 10 }}>Youtube </Text>
                  <AntDesign name="right" size={20} color={'black'} />
                </View>
              </TouchableOpacity>
            </View>

          </>
        )}
      </ScrollView>
    </KeyboardAwareScrollView>

  )
}

export default GvInformationScreen

