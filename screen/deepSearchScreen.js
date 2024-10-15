import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View, Button, useWindowDimensions, Dimensions } from 'react-native';
import apiconnect from '../API/apiUtils';
import style from '../styles/deepSearchScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderHTML from 'react-native-render-html';
import useCourseSelection from '../API/hook';
import { useNavigation } from '@react-navigation/native';
import shoppingCartHook from '../API/shoppingCartHook';
import userHook from '../API/userHook';
import freeHook from '../API/freeHook';
const DeepSearchScreen = ({ route }) => {

  const contentWidth = Dimensions.get('window').width;

  const { flagChose, maKh, maDanhMuc, tenDanhMuc } = route.params;
  const { width } = useWindowDimensions();
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [ProfileItem, setProfileItem] = useState([])
  const [mt, setmt] = useState('')
  const [mgv, setmgv] = useState('')

  const [saveTenDM, setsaveTenDM] = useState('')

  const {

    formatDate

  } = freeHook();

  const {

    userID, userName

  } = userHook(setIsLoading);

  const {

    handleAddToShoppingCart

  } = shoppingCartHook();

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

  const api = apiconnect();
  const [listKhoaHoc, setListKhoaHoc] = useState([]);
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


  useEffect(() => {
    api.get(`KhoaHoc/lay-danh-sach-khoa-hoc-theo-ma-danh-muc?maDM=${maDanhMuc}`)
      .then(response => {
        setListKhoaHoc(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching courses:', error);
      });
  }, [maDanhMuc]);

  const toggleChapter = (maChuong) => {
    setOpenChapters(prevState => ({
      ...prevState,
      [maChuong]: !prevState[maChuong]
    }));
  };

  const [listKhoaHocDM, setListKhoaHocDM] = useState([]);

  useEffect(() => {
    api.get(`KhoaHoc/lay-danh-sach-khoa-hoc-theo-ma-danh-muc?maDM=${ProfileItem.maDM}`)
      .then(response => {
        setListKhoaHocDM(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching courses:', error);
      });
  }, [ProfileItem]);

  useEffect(() => {
    if (listKhoaHoc && listKhoaHoc.length > 0) {
      // Lấy tenDM từ khóa học đầu tiên trong danh sách (hoặc điều kiện khác phù hợp với logic của bạn)
      setsaveTenDM(listKhoaHoc[0].tenDM);
    }
  }, [listKhoaHoc]);

  const handerDM = (maDM, tenDM) => {
    console.log(maDM, tenDM)
    navigation.navigate('DeepSearch', { flagChose: '2', maDanhMuc: maDM, tenDanhMuc: tenDM })
  }

  const handerKH = (maKH) => {
    navigation.navigate('DeepSearch', { flagChose: '1', maKh: maKH })
  }

  return (
    <View style={style.container}>
      {flagChose === '1' ? (
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
                <View style={style.price}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                    {ProfileItem.donGia ? ProfileItem.donGia.toLocaleString() : '0'}
                  </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline', marginLeft: 5 }}>đ</Text>
                </View>

                <Button title="Mua ngay" />
                <View style={{ flexDirection: 'row', flex: 2, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')} style={{ flex: 1, marginRight: 5 }}>
                    <View style={{ height: 50, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold' }}>Đi tới giỏ hàng</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleAddToShoppingCart(userID, ProfileItem.maKh)} style={{ flex: 1, marginLeft: 5 }}>
                    <View style={{ height: 50, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold' }}>Thêm vào giỏ hàng</Text>
                    </View>
                  </TouchableOpacity>
                </View>
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
                    <RenderHTML contentWidth={contentWidth} source={{ html: mt }} />
                    <TouchableOpacity onPress={() => setShowAll(false)}>
                      <Text style={{ color: 'blue' }}>Ẩn bớt</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <ScrollView style={{ maxHeight: 150 }}>
                      <RenderHTML contentWidth={contentWidth} source={{ html: mt }} />
                    </ScrollView>
                    <TouchableOpacity onPress={() => setShowAll(true)}>
                      <Text style={{ color: 'blue' }}>Hiển thị thêm</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Học viên cũng mua</Text>
                <View style={{ marginTop: 20 }}>
                  {listKhoaHocDM && listKhoaHocDM.slice(0, 3).map(khoaHoc => (
                    <View key={khoaHoc.maKh}>
                      <TouchableOpacity onPress={() => { handerKH(khoaHoc.maKh) }} style={style.item}>
                        <View style={style.itemImage}>
                          {khoaHoc.hinhAnh ? (
                            <Image style={{ borderRadius: 8, height: '100%', width: '100%' }} source={{ uri: `${khoaHoc.hinhAnh}` }} />
                          ) : (
                            <Text>Image not available</Text> // Hoặc bạn có thể hiển thị một hình ảnh placeholder
                          )}
                        </View>
                        <View style={style.itemContent}>
                          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{khoaHoc.tenKh}</Text>
                          <Text style={{ color: '#98999b', fontSize: 15 }}>{khoaHoc.tenGv}</Text>
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
                <TouchableOpacity onPress={() => { handerDM(ProfileItem.maDM, ProfileItem.tenDM) }}>
                  <View style={{ height: 50, marginTop: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Xem tất cả</Text>
                  </View>
                </TouchableOpacity>
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

                    <TouchableOpacity onPress={() => navigation.navigate('Assessment', { khoaHocProfile: ProfileItem })}>
                      <View style={{ height: 50, marginTop: 20, marginBottom: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Xem thêm đánh giá</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

            </View>
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <KeyboardAwareScrollView>
          {!isCourseSelected ? (
            <View>
              <View style={style.header}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#8eaaf7' }}>{tenDanhMuc}</Text>
              </View>
              <View style={style.body}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <ScrollView>
                    <View>
                      {listKhoaHoc.map(khoaHoc => (
                        <View key={khoaHoc.maKh}>
                          <TouchableOpacity onPress={() => handleCourseSelection(khoaHoc)} style={style.item}>
                            <View style={style.itemImage}>
                              {khoaHoc.hinhAnh ? (
                                <Image style={{ borderRadius: 8, height: '100%', width: '100%' }} source={{ uri: `${khoaHoc.hinhAnh}` }} />
                              ) : (
                                <Text>Image not available</Text> // Hoặc bạn có thể hiển thị một hình ảnh placeholder
                              )}
                            </View>
                            <View style={style.itemContent}>
                              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{khoaHoc.tenKh}</Text>
                              <Text style={{ color: '#98999b', fontSize: 15 }}>{khoaHoc.tenGv}</Text>
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
                  </ScrollView>
                )}
              </View>
            </View>
          ) : (
            <KeyboardAwareScrollView>
              <View style={{ ...style.header, alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={style.goBack}>
                  <TouchableOpacity onPress={handleBackToCourseList}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={style.body}>
                <View>
                  <View>
                    <Image style={{ borderRadius: 8, height: 250 }} source={{ uri: khoaHocProfile.hinh }} />
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
                    <View style={style.price}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                        {khoaHocProfile.donGia ? khoaHocProfile.donGia.toLocaleString() : '0'}
                      </Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline', marginLeft: 5 }}>đ</Text>
                    </View>

                    <Button title="Mua ngay" />
                    <View style={{ flexDirection: 'row', flex: 2, marginTop: 10 }}>
                      <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')} style={{ flex: 1, marginRight: 5 }}>
                        <View style={{ height: 50, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontWeight: 'bold' }}>Đi tới giỏ hàng</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleAddToShoppingCart(userID, khoaHocProfile.maKh)} style={{ flex: 1, marginLeft: 5 }}>
                        <View style={{ height: 50, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontWeight: 'bold' }}>Thêm vào giỏ hàng</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
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
                        <RenderHTML contentWidth={contentWidth} source={{ html: mota }} />
                        <TouchableOpacity onPress={() => setShowAll(false)}>
                          <Text style={{ color: 'blue' }}>Ẩn bớt</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <ScrollView style={{ maxHeight: 150 }}>
                          <RenderHTML contentWidth={contentWidth} source={{ html: mota }} />
                        </ScrollView>
                        <TouchableOpacity onPress={() => setShowAll(true)}>
                          <Text style={{ color: 'blue' }}>Hiển thị thêm</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Học viên cũng mua</Text>
                    <View style={{ marginTop: 20 }}>
                      {listKhoaHoc && listKhoaHoc.slice(0, 3).map(khoaHoc => (
                        <View key={khoaHoc.maKh}>
                          <TouchableOpacity onPress={() => { handerKH(khoaHoc.maKh) }} style={style.item}>
                            <View style={style.itemImage}>
                              {khoaHoc.hinhAnh ? (
                                <Image style={{ borderRadius: 8, height: '100%', width: '100%' }} source={{ uri: `${khoaHoc.hinhAnh}` }} />
                              ) : (
                                <Text>Image not available</Text> // Hoặc bạn có thể hiển thị một hình ảnh placeholder
                              )}
                            </View>
                            <View style={style.itemContent}>
                              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{khoaHoc.tenKh}</Text>
                              <Text style={{ color: '#98999b', fontSize: 15 }}>{khoaHoc.tenGv}</Text>
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
                    <TouchableOpacity onPress={() => { handerDM(maDanhMuc, saveTenDM) }}>
                      <View style={{ height: 50, marginTop: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Xem tất cả</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

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
      )}
    </View>
  );
}

export default DeepSearchScreen