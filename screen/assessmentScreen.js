import React, { useEffect, useState, } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import freeHook from '../API/freeHook';
import RenderHTML from 'react-native-render-html';
import style from '../styles/assessmentStyle';
const AssessmentScreen = ({ route }) => {
  const { khoaHocProfile } = route.params || {}; // Lấy giá trị title từ tham số được truyền vào
  const contentWidth = Dimensions.get('window').width;

  const {

    formatDate,
    RatingStars
  } = freeHook();

  return (
    <View style={style.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#8eaaf7', marginTop: 10 }}>ĐÁNH GIÁ CỦA HỌC VIÊN</Text>
      </View>
      <ScrollView style={style.body}>
        <View>
          {khoaHocProfile.dsdg && khoaHocProfile.dsdg.slice(0, 3).map(danhGia => (

            <View key={danhGia.maDG}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={style.userImage} source={danhGia.avata ? { uri: `${danhGia.avata}` } : require('./images/user.png')} />
                  <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 5 }}>{danhGia.tenHV}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  < RatingStars rating={danhGia.soSao - 1} />

                  <Text style={{ color: 'grey', marginLeft: 5 }}>
                    vào ngày {formatDate(danhGia.ngayDG)}
                  </Text>
                </View>
                <RenderHTML contentWidth={contentWidth} source={{ html: danhGia.noiDung }} />


              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>

  );
};

export default AssessmentScreen;
