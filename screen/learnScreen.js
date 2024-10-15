import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View, useWindowDimensions, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderHTML from 'react-native-render-html';
import apiconnect from '../API/apiUtils';
import style from '../styles/learnStyle';
import useCourseSelection from '../API/hook'
import freeHook from '../API/freeHook'

export default function LearnScreen({ navigation }) {

  const contentWidth = Dimensions.get('window').width;

  const api = apiconnect();
  const [myListKH, setmyListKH] = useState([])
  const [userName, setuserName] = useState("")
  const [userID, setuserID] = useState("")

  const { width } = useWindowDimensions();
  const [openChapters, setOpenChapters] = useState({});
  const [showAll, setShowAll] = useState(false);

  const {

    formatDate

  } = freeHook();


  const {
    khoaHocProfile,
    selectedCourse,
    isCourseSelected,
    mota,
    maGV,
    RatingStars,
    handleCourseSelection,
    handleBackToCourseList,
  } = useCourseSelection();

  const toggleChapter = (maChuong) => {
    setOpenChapters(prevState => ({
      ...prevState,
      [maChuong]: !prevState[maChuong]
    }));
  };

  useEffect(() => {
    AsyncStorage.getItem('UserID').then(result => {
      setuserID(result)
    })
    AsyncStorage.getItem('UserName').then(result => {
      setuserName(result)
    })
  }, [])

  useEffect(() => {
    // Gửi yêu cầu API khi component được tạo
    api.get(`KhoaHoc/lay-danh-sach-khoa-hoc-da-mua?maHv=${userID}`)
      .then(response => {
        // Cập nhật danh sách khóa học khi nhận được phản hồi từ API
        setmyListKH(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
          // Yêu cầu được gửi đi, nhưng máy chủ trả về mã trạng thái không thành công
          console.error('Error response from server:', error.response.data);
        } else if (error.request) {
          // Yêu cầu không được gửi đi hoặc không nhận được phản hồi
          console.error('No response received:', error.request);
        } else {
          // Có lỗi xảy ra khi thiết lập yêu cầu
          console.error('Error setting up the request:', error.message);
        }
      })
  }, [userID]); // [] để useEffect chỉ gửi yêu cầu khi component được tạo

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView>
        {!isCourseSelected ? (
          <View>
            <View style={style.header}>
              <View style={style.boxSearch}>
                <View style={style.iconSearch}>
                  <Ionicons name="search" size={30} color={'black'} />
                </View>
                <View style={style.textSearch}>
                  <TextInput placeholder='Tìm kiếm'></TextInput>
                </View>
              </View>
              <View style={style.iconShop}>
                <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
                  <AntDesign name="shoppingcart" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={style.body}>
              <ScrollView>
                <View>
                  {/* Hiển thị danh sách khóa học */}
                  {myListKH.map(khoaHoc => (
                    <View key={khoaHoc.maKh}>
                      <TouchableOpacity
                        onPress={() => handleCourseSelection(khoaHoc)}
                        style={style.item}>
                        <View style={style.itemImage}>
                          <Image style={{ borderRadius: 8, height: '100%', width: '100%' }} source={{ uri: `${khoaHoc.hinhAnh}` }} />
                        </View>
                        <View style={style.itemContent}>
                          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{khoaHoc.tenKh}</Text>
                          <Text style={{ color: '#98999b', fontSize: 15 }}>{khoaHoc.tenGv}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        ) : (
          <KeyboardAwareScrollView>

            <View style={style.header}>
              <View style={style.goBack}>
                <TouchableOpacity onPress={handleBackToCourseList}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={style.body}>
              <View >
                <View>
                  <Image style={{ borderRadius: 8, height: 250 }} source={{ uri: `${khoaHocProfile.hinh}` }} />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{selectedCourse.tenKh}</Text>
                </View>
                <View style={style.rate}>
                  <Text style={{ fontSize: 15, marginRight: 5 }}>{khoaHocProfile.tongSao}</Text>
                  <View style={{ paddingTop: 3, marginRight: 5 }}>
                    <RatingStars rating={khoaHocProfile.tongSao} />
                  </View>
                  <Text style={{ marginRight: 5 }}>({khoaHocProfile.tongDanhGia} xếp hạng)  {khoaHocProfile.soLuongThamGia} học viên</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Do </Text>
                  <TouchableOpacity>
                    <Text style={{ color: '#5646a9' }}>{khoaHocProfile.tenGV} </Text>
                  </TouchableOpacity>
                  <Text> tạo</Text>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Button title={'Bắt đầu học ngay'} height="100" onPress={() => {
                    navigation.navigate('Learning', { maKh: khoaHocProfile.maKh, userID: userID })  }}></Button>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Chương trình giảng dạy</Text>
                  {khoaHocProfile.dsChuong && khoaHocProfile.dsChuong.map(Chuong => (
                    <View key={Chuong.maChuong}>
                      <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>
                          Phần {Chuong.phan} - {Chuong.tenChuong}</Text>
                        <TouchableOpacity onPress={() => toggleChapter(Chuong.maChuong)}>
                          {!openChapters[Chuong.maChuong] ? (
                            <AntDesign name="up" size={20} color={'blue'} />
                          ) : (
                            <AntDesign name="down" size={20} color={'blue'} />
                          )}
                        </TouchableOpacity>
                      </View>
                      {
                        !openChapters[Chuong.maChuong] && (<View style={{ marginTop: 5 }}>
                          {Chuong.noiDungChuongs && Chuong.noiDungChuongs.map(noiDungChuong => (
                            <View key={noiDungChuong.maNoiDung} style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                              <Text style={{ marginLeft: 30 }}>{noiDungChuong.phan}</Text>
                              <Text style={{ width: '80%' }}> {noiDungChuong.tenNoiDung}</Text>
                            </View>
                          ))}
                        </View>)
                      }
                    </View>
                  ))}
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Mô tả</Text>
                  {showAll ? (
                    <View style={{ marginTop: 5 }}>
                      <RenderHTML
                        contentWidth={width}
                        source={{ html: `${mota}` }}
                      />
                      <TouchableOpacity onPress={() => setShowAll(false)}>
                        <Text style={{ color: 'blue' }}>Ẩn bớt</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View >
                      <ScrollView style={{ maxHeight: 150 }}>
                        <RenderHTML
                          contentWidth={width}
                          source={{ html: `${mota}` }}
                        />
                      </ScrollView>
                      <TouchableOpacity onPress={() => setShowAll(true)}>
                        <Text style={{ color: 'blue' }}>Hiển thị thêm</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View >

                <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Giảng viên</Text>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>{khoaHocProfile.tenGV}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <View>
                    <Image style={{ height: 100, width: 100 }} source={khoaHocProfile.hinhGV ? { uri: `${khoaHocProfile.hinhGV}` } : require('./images/user.png')} />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text>{khoaHocProfile.tenGV}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('GvInformation', { magv: khoaHocProfile.maGV })}>
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

                    <TouchableOpacity onPress={() => navigation.navigate('Assessment', { khoaHocProfile: khoaHocProfile })}>
                      <View style={{ height: 50, marginTop: 20, marginBottom: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Xem thêm đánh giá</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}