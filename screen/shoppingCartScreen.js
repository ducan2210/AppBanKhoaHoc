import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions, Alert } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderHTML from 'react-native-render-html';
import apiconnect from '../API/apiUtils';
import style from '../styles/shoppingCartStyle';
import useCourseSelection from '../API/hook';
import shoppingCartHook from '../API/shoppingCartHook';

const ShoppingCartScreen = () => {
    const api = apiconnect();
    const { width } = useWindowDimensions();
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [listGioHang, setListGioHang] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [openChapters, setOpenChapters] = useState({});
    

    const { 
        refresh,removeItem,
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

    const toggleChapter = (maChuong) => {
        setOpenChapters(prevState => ({
            ...prevState,
            [maChuong]: !prevState[maChuong]
        }));
    };

    // Fetch user data from AsyncStorage
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('UserID');
                const userName = await AsyncStorage.getItem('UserName');
                if (userId) setUserID(userId);
                if (userName) setUserName(userName);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    // Fetch cart data
    const fetchCartData = async () => {
        if (!userID) return; // Ensure userID is available
        try {
            setIsLoading(true);
            const response = await api.get(`GioHang/lay-chi-tiet-gio-hang-theo-ma-hoc-vien?maHV=${userID}`);
            setListGioHang(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        if (userID) {
            fetchCartData();
        }
    }, [userID, refresh]);


    const tongTien = listGioHang.reduce((total, khoaHoc) => total + (khoaHoc.donGia || 0), 0);

    return (
        <View style={style.container}>
            <KeyboardAwareScrollView>
                {!isCourseSelected ? (
                    <View>
                        <View style={style.header}></View>
                        <View style={style.body}>
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : (
                                <ScrollView>
                                    <View>
                                        {listGioHang.map(khoaHoc => (
                                            <View key={khoaHoc.maKh}>
                                                <View style={style.headerItem}>
                                                    <View>
                                                        <TouchableOpacity>
                                                            <View style={style.infGv}>
                                                                <Image
                                                                    style={{ borderRadius: 8, height: 20, width: 20, marginRight: 10 }}
                                                                    source={khoaHoc.avt ? { uri: `${khoaHoc.avt}` } : require('./images/user.png')}
                                                                />
                                                                <Text style={{ color: '#98999b', fontSize: 15 }}>{khoaHoc.tenGv}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity onPress={() => removeItem(khoaHoc.maGh, khoaHoc.maKh)}>
                                                            <Feather style={{}} name="trash-2" size={18} color="black" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => handleCourseSelection(khoaHoc)}
                                                    style={style.item}
                                                >
                                                    <View style={style.itemImage}>
                                                        <Image
                                                            style={{ borderRadius: 8, height: '100%', width: '100%' }}
                                                            source={{ uri: `${khoaHoc.hinhAnh}` }}
                                                        />
                                                    </View>
                                                    <View style={style.itemContent}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{khoaHoc.tenKh}</Text>
                                                        <View style={style.price}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                                                {khoaHoc.donGia !== null ? khoaHoc.donGia.toLocaleString() : '0'}
                                                            </Text>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline', marginLeft: 5 }}>đ</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />
                                            </View>
                                        ))}
                                    </View>
                                    <View style={style.tongTien}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Tổng tiền: {tongTien.toLocaleString()} đ</Text>
                                    </View>
                                    <View style={{ marginTop: 30 }}>
                                        <Button title="Tiến hành thanh toán" />
                                    </View>
                                </ScrollView>
                            )}
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
                            <View>
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
                                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Chương trình giảng dạy</Text>
                                    {khoaHocProfile.chuongTrinhs && khoaHocProfile.chuongTrinhs.map(Chuong => (
                                        <View key={Chuong.maChuong} style={{ marginBottom: 10 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={{ fontSize: 20, color: 'grey' }}>Phần {Chuong.phan} - {Chuong.tenChuong}</Text>
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
                                                                <Text style={{ width: '80%' }}>{noiDungChuong.tenNoiDung}</Text>
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
                                            <RenderHTML contentWidth={width} source={{ html: `${mota}` }} />
                                            <TouchableOpacity onPress={() => setShowAll(false)}>
                                                <Text style={{ color: 'blue' }}>Ẩn bớt</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View>
                                            <ScrollView style={{ maxHeight: 150 }}>
                                                <RenderHTML contentWidth={width} source={{ html: `${mota}` }} />
                                            </ScrollView>
                                            <TouchableOpacity onPress={() => setShowAll(true)}>
                                                <Text style={{ color: 'blue' }}>Hiển thị thêm</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Học viên cũng mua</Text>
                                    <View>
                                        <Text>Các khóa học tương tự....</Text>
                                    </View>
                                    <TouchableOpacity>
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
                                            <Image style={{ height: 100, width: 100 }} source={require('./images/education.png')} />
                                        </View>
                                        <View style={{ marginLeft: 20 }}>
                                            <Text>{khoaHocProfile.tenGV}</Text>
                                            <Text>{khoaHocProfile.moTaGV}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <View style={{ height: 50, marginTop: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontWeight: 'bold' }}>Xem hồ sơ</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Phản hồi của học viên</Text>
                                    </View>
                                    <View>
                                        <Text>.... xếp hạng khóa học</Text>
                                        <View>
                                            <Text>Bình luận đánh giá của khóa học....</Text>
                                        </View>
                                        <TouchableOpacity>
                                            <View style={{ height: 50, marginTop: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
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
};

export default ShoppingCartScreen;
