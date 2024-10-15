import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import apiconnect from '../API/apiUtils';
import style from '../styles/searchStyle';



export default function SearchScreen({ navigation }) {
  const api = apiconnect();
  const [keyword, setKeyword] = useState(''); // State để lưu trữ từ khóa nhập vào
  const [listDanhMucKH, setlistDanhMucKH] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Biến state để kiểm soát việc hiển thị phần body hoặc danh sách kết quả tìm kiếm
  const [flag, setflag] = useState('')

  const handleSearch = () => {
    if (keyword.trim() === '') {
      setShowSearchResults(false); // Nếu từ khóa rỗng, hiển thị phần body mặc định
    } else {
      search(keyword);
    }
  };

  const handerDM = (maDM, tenDM) => {
    navigation.navigate('DeepSearch', { flagChose: '2', maDanhMuc: maDM, tenDanhMuc: tenDM })
  }

  const handerKH = (maKH) => {
    navigation.navigate('DeepSearch', { flagChose: '1', maKh: maKH })
  }

  const RatingStars = ({ rating }) => {
    // Tạo một mảng chứa các icon sao dựa trên rating
    const stars = Array.from({ length: 5 }).map((_, index) => {
      if (index < rating) {
        return <FontAwesome name="star" size={15} color="gold" key={index} />;
      }
      return <FontAwesome name="star" size={15} color="grey" key={index} />;
    });

    // Trả về mảng chứa các icon sao
    return (
      <View style={{ flexDirection: 'row' }}>
        {stars}
      </View>
    );
  }

  const search = (keyword) => {
    api.get(`KhoaHoc/tim-kiem-khoa-hoc-moi-cua-an?tuKhoa=${keyword}`)
      .then(response => {
        setSearchResults(response.data);
        // console.log(`${JSON.stringify(response.data, null, 2)}\n`);
        setShowSearchResults(true); // Hiển thị danh sách kết quả tìm kiếm khi có kết quả trả về
      })
      .catch(error => {
        console.error('Error searching courses:', error);
      });
  };

  useEffect(() => {
    // Gửi yêu cầu API khi component được tạo
    api.get('DanhMuc/lay-danh-sach-danh-muc')
      .then(response => {
        // Cập nhật danh sách danh mục khóa học khi nhận được phản hồi từ API
        setlistDanhMucKH(response.data);
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
  }, []); // [] để useEffect chỉ gửi yêu cầu khi component được tạo
  return (
    <View style={style.container}>
      <KeyboardAwareScrollView>
        <View style={style.header}>
          <View style={style.boxSearch}>
            <View style={style.iconSearch}>
              <Ionicons name="search" size={30} color={'black'} />
            </View>
            <View style={style.textSearch}>
              <TextInput
                placeholder='Tìm kiếm'
                onChangeText={(text) => setKeyword(text)}
                value={keyword} // Binding giá trị từ state keyword
                onSubmitEditing={handleSearch}
              />
            </View>
          </View>
          <View style={style.iconShop}>
            <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
              <AntDesign name="shoppingcart" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Sử dụng điều kiện điều khiển để hiển thị phần body hoặc danh sách kết quả tìm kiếm */}
        {showSearchResults ? (
          <View style={style.body}>
            <ScrollView>
              {searchResults.map(khoaHoc => (
                <View key={khoaHoc.maKh}>
                  <TouchableOpacity onPress={() => { handerKH(khoaHoc.maKh) }} style={style.item}>
                    <View style={style.itemImage}>

                      <Image style={{ borderRadius: 8, height: '100%', width: '100%' }} source={{ uri: `${khoaHoc.hinhAnh}` }} />
                    </View>
                    <View style={style.itemContent}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{khoaHoc.tenKh}</Text>
                      <Text style={{ color: '#98999b', fontSize: 15 }}>{khoaHoc.tenGv}</Text>
                      <View style={style.rate}>
                        <Text style={{ fontSize: 15, color: "gold", marginRight: 5 }}>{khoaHoc.soSao}</Text>
                        <View style={{ paddingTop: 3, marginRight: 5 }}>
                          <RatingStars rating={khoaHoc.soSao} />
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
            </ScrollView>
          </View>
        ) :
          <View style={style.body}>
            <ScrollView>
              <View style={style.topSearchBox}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Tìm kiếm hàng đầu</Text>
                <View style={style.topSearchList}>
                  <Text style={style.topSearchIteam}>python</Text>
                  <Text style={style.topSearchIteam}>java</Text>
                  <Text style={style.topSearchIteam}>excel</Text>
                  <Text style={style.topSearchIteam}>sql</Text>
                  <Text style={style.topSearchIteam}>javascript</Text>
                  <Text style={style.topSearchIteam}>digital maketing</Text>
                  <Text style={style.topSearchIteam}>power bi</Text>
                  <Text style={style.topSearchIteam}>aws</Text>
                  <Text style={style.topSearchIteam}>react</Text>
                  <Text style={style.topSearchIteam}>sap</Text>
                  <Text style={style.topSearchIteam}>c#</Text>
                  <Text style={style.topSearchIteam}>photoshop</Text>
                </View>
              </View>
              <View style={style.menuBox}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, }}>Duyệt qua thể loại</Text>
                {/* Hiển thị danh sách danh mục khóa học */}
                {listDanhMucKH.map(danhMuc => (
                  <View key={danhMuc.maDm}>
                    <TouchableOpacity onPress={() => { handerDM(danhMuc.maDm, danhMuc.tenDm) }} style={style.listDm}>
                      <View style={{ ...style.danhMuc }}>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>{danhMuc.tenDm} </Text>
                        <AntDesign name="right" size={20} color={'black'} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        }
      </KeyboardAwareScrollView>
    </View>
  )
}
