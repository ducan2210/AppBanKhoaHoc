import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View, Button, useWindowDimensions,Dimensions } from 'react-native';
import apiconnect from '../API/apiUtils';
import style from '../styles/deepSearchScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderHTML from 'react-native-render-html';
import useCourseSelection from '../API/hook';
import { useNavigation } from '@react-navigation/native';
import shoppingCartHook from '../API/shoppingCartHook';
import userHook from '../API/userHook';
import freeHook from '../API/freeHook';

const KhoaHocPreviewScreen = ({route}) => {

  const contentWidth = Dimensions.get('window').width;

  const { maKh } = route.params;
  const { width } = useWindowDimensions();
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [ProfileItem, setProfileItem] = useState([])
  const [mt, setmt] = useState('')
  const [mgv, setmgv] = useState('')

  const {

    formatDate

  } = freeHook();

  const {

    userID, userName

  } = userHook(setIsLoading);



  const {

    RatingStars,

  } = useCourseSelection();

  const api = apiconnect();
  const [openChapters, setOpenChapters] = useState({});

  useEffect(() => {
    api.get(`KhoaHoc/lay-thong-tin-khoa-hoc-theo-ma?maKhoaHoc=${maKh}`)
      .then(response => {
        setProfileItem(response.data);
        setmt(response.data.moTa);
        setmgv(response.data);
      })
      .catch(error => {
        // Xử lý lỗi
      });
  }, [maKh]);

  const toggleChapter = (maChuong) => {
    setOpenChapters(prevState => ({
      ...prevState,
      [maChuong]: !prevState[maChuong]
    }));
  };



  return (
    <KeyboardAwareScrollView>
          <View style={{ ...style.header, alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          </View>

          <View style={style.body}>
            <View>
              <View>
                <Image style={{ borderRadius: 8, height: 250 }} source={{ uri: ProfileItem.hinh }} />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{ProfileItem.tenKh}</Text>
              </View>
              <View style={style.rate}>
                <Text style={{ fontSize: 15, marginRight: 5 }}>{ProfileItem.tongSao}</Text>
                <View style={{ paddingTop: 3, marginRight: 5 }}>
                  <RatingStars rating={ProfileItem.tongSao} />
                </View>
                <Text style={{ marginRight: 5 }}>({ProfileItem.tongDanhGia} xếp hạng)  {ProfileItem.soLuongThamGia} học viên</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>Do </Text>
                <TouchableOpacity>
                  <Text style={{ color: '#5646a9' }}>{ProfileItem.tenGV} </Text>
                </TouchableOpacity>
                <Text> tạo</Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Chương trình giảng dạy</Text>
                {ProfileItem.dsChuong && ProfileItem.dsChuong.map(Chuong => (
                  <View key={Chuong.maChuong}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 20, color: 'grey' }}>
                        Phần {Chuong.phan} - {Chuong.tenChuong}</Text>
                      <TouchableOpacity onPress={() => toggleChapter(Chuong.maChuong)}>
                        {!openChapters[Chuong.maChuong] ? (
                          <AntDesign name="up" size={20} color="blue" />
                        ) : (
                          <AntDesign name="down" size={20} color="blue" />
                        )}
                      </TouchableOpacity>
                    </View>
                    {
                      !openChapters[Chuong.maChuong] && (
                        <View style={{ marginTop: 5 }}>
                          {Chuong.noiDungChuongs && Chuong.noiDungChuongs.map(noiDungChuong => (
                            <View key={noiDungChuong.maNoiDung} style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                              <Text style={{ marginLeft: 30 }}>{noiDungChuong.phan}</Text>
                              <Text style={{ width: '80%' }}> {noiDungChuong.tenNoiDung}</Text>
                            </View>
                          ))}
                        </View>
                      )
                    }
                  </View>
                ))}
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Mô tả</Text>
                {showAll ? (
                  <View style={{ marginTop: 5 }}>
                    <RenderHTML contentWidth={width} source={{ html: mt }} />
                    <TouchableOpacity onPress={() => setShowAll(false)}>
                      <Text style={{ color: 'blue' }}>Ẩn bớt</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <ScrollView style={{ maxHeight: 150 }}>
                      <RenderHTML contentWidth={width} source={{ html: mt }} />
                    </ScrollView>
                    <TouchableOpacity onPress={() => setShowAll(true)}>
                      <Text style={{ color: 'blue' }}>Hiển thị thêm</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              

              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Giảng viên</Text>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>{ProfileItem.tenGV}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <View>
                    <Image style={{ height: 100, width: 100 }} source={ProfileItem.hinhGV ? { uri: `${ProfileItem.hinhGV}` } : require('./images/user.png')} />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text>{ProfileItem.tenGV}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('GvInformation', { magv: ProfileItem.maGV })}>
                  <View style={{ height: 50, marginTop: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Xem hồ sơ</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 20 }}>
                    <View>
                      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Phản hồi của học viên</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <View>
                        {ProfileItem.dsdg && ProfileItem.dsdg.slice(0, 3).map(danhGia => (

                          <View key={danhGia.maDG}>
                            <View>
                              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{danhGia.tenHV}</Text>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                < RatingStars rating={danhGia.soSao} />

                                <Text style={{ color: 'grey', marginLeft: 5 }}>
                                  vào ngày {formatDate(danhGia.ngayDG)}
                                </Text>
                              </View>
                              <RenderHTML contentWidth={contentWidth} source={{ html: danhGia.noiDung }} />


                            </View>
                          </View>
                        ))}
                      </View>

                      <TouchableOpacity>
                        <View style={{ height: 50, marginTop: 20, marginBottom: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontWeight: 'bold' }}>Xem thêm đánh giá</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
  )
}

export default KhoaHocPreviewScreen
