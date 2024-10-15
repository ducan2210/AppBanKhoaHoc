import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View, useWindowDimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import style from '../styles/learningStyle';
import { AntDesign, Feather, Fontisto, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import apiconnect from '../API/apiUtils';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Animatable from 'react-native-animatable';

const LearningScreen = ({ route }) => {

  const contentWidth = Dimensions.get('window').width;
  const [selectedContent, setSelectedContent] = useState('');
  const [progress, setProgress] = useState(1);
  const api = apiconnect();
  const { maKh, userID } = route.params;
  const navigation = useNavigation();
  const [khoaHocProfile, setKhoaHocProfile] = useState({});
  const [videoUri, setVideoUri] = useState('');
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const video = useRef(null); // Ref để truy cập video component
  const [contentType, setContentType] = useState(''); // Lưu loại nội dung: 'video' hoặc 'exercise'
  const [exerciseContent, setExerciseContent] = useState([]); // Nội dung bài tập trắc nghiệm
  const [isProgressUpdated, setIsProgressUpdated] = useState(false);

  const [tenND, settenND] = useState('')

  // Effect để tải thông tin khóa học khi component được mount
  useEffect(() => {
    api.get(`KhoaHoc/lay-thong-tin-khoa-hoc-theo-ma-da-mua?maKhoaHoc=${maKh}&maHV=${userID}`)
      .then(response => {
        const profileData = response.data;
        setKhoaHocProfile(profileData);
        const loadedProgress = profileData.tienTrinh || 1;
        setProgress(loadedProgress);

        // Tìm nội dung video đầu tiên để phát
        let initialContent;
        for (const chuong of profileData.dsChuong) {
          for (const noiDung of chuong.noiDungChuongs) {
            if (noiDung.phan === loadedProgress) {
              initialContent = noiDung;
              break;
            }
          }
          if (initialContent) break;
        }

        // Kiểm tra loại nội dung và đặt state tương ứng
        if (initialContent) {
          if (initialContent.maLoaiNoiDung === 'LND01' && initialContent.video && initialContent.video.length > 0) {
            setVideoUri(initialContent.video[0].videoUlr);
            setSelectedContent(initialContent.maNoiDung);
            settenND(initialContent.tenNoiDung)
            setContentType('video');
          } else if (initialContent.maLoaiNoiDung === 'LND02') {
            setExerciseContent(initialContent.tracNghiem);

            setSelectedContent(initialContent.maNoiDung);
            settenND(initialContent.tenNoiDung)
            setContentType('exercise');
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [maKh]);

  // Hàm chọn nội dung (bài giảng hoặc bài tập)
  const choseND = (noiDungChuong) => {
    if (noiDungChuong.maLoaiNoiDung === 'LND01' && noiDungChuong.video[0]) {
      setVideoUri(noiDungChuong.video[0].videoUlr);
      setSelectedContent(noiDungChuong.maNoiDung);
      settenND(noiDungChuong.tenNoiDung)
      setContentType('video');
    } else if (noiDungChuong.maLoaiNoiDung === 'LND02') {
      setExerciseContent(noiDungChuong.tracNghiem);
      setSelectedContent(noiDungChuong.maNoiDung);
      settenND(noiDungChuong.tenNoiDung)
      setContentType('exercise');
    }

  };

  // Định nghĩa các route (tab) cho TabView
  const FirstRoute = () => (
    <View style={style.content}>
      <View style={{ marginTop: 20 }}>
        {khoaHocProfile.dsChuong && khoaHocProfile.dsChuong.map(chuong => (
          <View key={chuong.maChuong}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20, color: 'grey' }}>
                Phần {chuong.phan} - {chuong.tenChuong}
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              {chuong.noiDungChuongs && chuong.noiDungChuongs.map((noiDungChuong, index) => (
                <TouchableOpacity
                  onPress={() => choseND(noiDungChuong)}
                  key={noiDungChuong.maNoiDung}
                  disabled={noiDungChuong.phan > progress}
                >
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: selectedContent === noiDungChuong.maNoiDung ? '#bebfc3' : 'transparent',
                    opacity: noiDungChuong.phan > progress ? 0.5 : 1
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ alignContent: 'center' }}>{noiDungChuong.phan}. {noiDungChuong.tenNoiDung}   </Text>
                      {noiDungChuong.phan < progress && (
                        <AntDesign name="checkcircle" size={17} color="gray" />
                      )}
                    </View>
                    {noiDungChuong.phan > progress && (
                      <AntDesign name="lock" size={20} color="black" />
                    )}
                    {selectedContent === noiDungChuong.maNoiDung && noiDungChuong.maLoaiNoiDung === 'LND01' && (
                      <AntDesign style={{ alignItems: 'center' }} name="playcircleo" size={20} color="black" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={style.content}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('KhoaHocPreview', { maKh: khoaHocProfile.maKh })} style={{ marginTop: 40, ...style.rowContent }}>
          <MaterialCommunityIcons name="dots-horizontal" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Giới thiệu về khóa học</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.rowContent}>
          <Feather name="share" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Chia sẻ khóa học này</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.rowContent}>
          <Fontisto name="onenote" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Ghi chú</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.rowContent}>
          <Feather name="list" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Tài nguyên</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Index', { title: 'Thông báo' })} style={style.rowContent}>
          <Feather name="bell" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.rowContent}>
          <Feather name="star" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Thêm khóa học vào danh sách yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.rowContent}>
          <MaterialIcons name="save-alt" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Lưu trữ khóa học này</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.rowContent}>
          <MaterialCommunityIcons name="bug" size={30} color="grey" />
          <Text style={{ width: '88%', fontSize: 20 }}>Báo cáo sự cố phát lại</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Hàm render các tab
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  // Custom TabBar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: '#ffffff' }}
      indicatorStyle={{ backgroundColor: 'black' }}
      labelStyle={{ color: 'black', fontSize: 20 }}
    />
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Bài giảng' },
    { key: 'second', title: 'KHÁC' },
  ]);

  // Hàm này sẽ được gọi mỗi khi trạng thái phát lại của video thay đổi
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setVideoProgress(status.positionMillis / 1000);
      setVideoDuration(status.durationMillis / 1000);
    }
  };

  const [percentageWatched, setPercentageWatched] = useState(0)

  // Effect để log tỷ lệ phần trăm đã xem khi nó thay đổi
  useEffect(() => {
    setPercentageWatched((videoProgress / videoDuration) * 100);
  }, [videoProgress, videoDuration]);

  // Effect để log loại nội dung khi nó thay đổi
  useEffect(() => {
    console.log(contentType)
  }, [contentType]);

  // Effect để cập nhật video progress và duration mỗi giây
  useEffect(() => {
    const interval = setInterval(async () => {
      if (video.current) {
        const status = await video.current.getStatusAsync();
        if (status.isLoaded) {
          setVideoProgress(status.positionMillis / 1000);
          setVideoDuration(status.durationMillis / 1000);
        }
      }
    }, 1000);

    // Cleanup interval khi component bị unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(percentageWatched)
    if (percentageWatched >= 80 && !isProgressUpdated) {
      // Tìm nội dung hiện tại dựa trên tiến trình
      let currentContent = '';
      for (const chuong of khoaHocProfile.dsChuong) {
        for (const noiDung of chuong.noiDungChuongs) {
          if (noiDung.phan === progress) {
            currentContent = noiDung.maNoiDung;
            break;
          }
        }
        if (currentContent) break;
      }
      // So sánh mã nội dung hiện tại với nội dung đã chọn
      if (selectedContent === currentContent) {
       
        api.put(`KhoaHoc/cap-nhat-tien-trinh-hoc?maKhoaHoc=${maKh}&maHV=${userID}`)
          .then(response => {
            console.log("Thông báo", response.data.message);
            video.current.pauseAsync();
            Alert.alert("Thông báo", "Bạn đã có thể tiến tới nội dung tiếp theo", [
              { text: "OK", onPress: () => video.current.playAsync() } // Thiết lập để tiếp tục phát video khi nhấn OK
            ]);
            // Đánh dấu là đã cập nhật tiến trình
            setProgress(progress + 1)
          })
          .catch(error => {
            console.error('Error searching courses:', error);
          });
      }
    }
  }, [percentageWatched, selectedContent, progress, khoaHocProfile]);

  const [selectedDapAn, setselectedDapAn] = useState('')
  const [dapAnDung, setdapAnDung] = useState('')
  // Định nghĩa hàm xử lý sự kiện khi nút được nhấn xác nhận trả lời câu hỏi
  const handleDapAn = (dapAnChon, dapAnDung) => {

    // Thực hiện các thao tác cần thiết khi nút được nhấn
    setdapAnDung(dapAnDung);
    setselectedDapAn(dapAnChon);
    console.log('Đáp án chọn:', dapAnChon);
    console.log('Đáp án đúng:', dapAnDung);
  };


  const [showConfetti, setShowConfetti] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const wrongAnswerRefs = useRef({});

  const handleXacNhan = () => {
    console.log('Xác nhận đáp án:', selectedDapAn, dapAnDung);
    if (selectedDapAn === dapAnDung) {

      let currentContent = '';
      for (const chuong of khoaHocProfile.dsChuong) {
        for (const noiDung of chuong.noiDungChuongs) {
          if (noiDung.phan === progress) {
            currentContent = noiDung.maNoiDung;
            break;
          }
        }
        if (currentContent) break;
      }
      // So sánh mã nội dung hiện tại với nội dung đã chọn
      if (selectedContent === currentContent) {
        setShowConfetti(true);
        api.put(`KhoaHoc/cap-nhat-tien-trinh-hoc?maKhoaHoc=${maKh}&maHV=${userID}`)
          .then(response => {
            console.log("Thông báo", response.data.message);
            setProgress(progress + 1)
            setShowAlert(true); // Hiển thị cảnh báo sau khi hiệu ứng chúc mừng kết thúc
            // Đánh dấu là đã cập nhật tiến trình
          })
          .catch(error => {
            console.error('Error searching courses:', error);
          });
      }
    }
    else {
      handleWrongAnswerAnimation(selectedDapAn);
    }
  };

  // Hiển thị hiệu ứng chúc mừng và cảnh báo
  useEffect(() => {
    if (showConfetti) {
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 1500);
      return () => clearTimeout(confettiTimer);
    }
    if (showAlert) {
      const alertTimer = setTimeout(() => {
        Alert.alert("Thông báo", "Câu trả lời chính xác!!! Bây giờ bạn đã có thể tiến tới nội dung tiếp theo")
        setShowAlert(false);
      }, 500); // Thiết lập thời gian hiển thị cảnh báo
      return () => clearTimeout(alertTimer);
    }
  }, [showConfetti, showAlert]);


  // Hiển thị hiệu ứng rung cho đáp án sai
  const handleWrongAnswerAnimation = (stt) => {
    const ref = wrongAnswerRefs.current[stt];
    if (ref) {
      ref.shake(800);
      const alertTimer = setTimeout(() => {
        Alert.alert("Thông báo", "Câu trả lời của bạn chưa đúng rồi, hãy cố gắng thử lại nhé!")
      }, 500);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Khu vực hiển thị video hoặc bài tập trắc nghiệm */}
      <View style={{ height: 280 }}>
        {contentType === 'video' && videoUri ? (
          <Video
            ref={video}
            style={style.video}
            source={{
              uri: videoUri,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        ) : (
          <ScrollView style={{ height: 300, paddingHorizontal: 20, paddingTop: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{tenND}</Text>
              {/* Hiển thị nội dung bài tập trắc nghiệm */}
              {exerciseContent && exerciseContent.map((noiDungTN) => (
                <View key={noiDungTN.maTN} style={{}}>


                  <RenderHTML contentWidth={contentWidth} source={{ html: noiDungTN.cauHoi }} />

                  {noiDungTN.dapAn && noiDungTN.dapAn.map((dapAn) => (

                    <TouchableOpacity key={dapAn.maDa} style={{
                      ...style.button,
                      backgroundColor: selectedDapAn === dapAn.stt ? '#c2e8f5' : '#DDDDDD', // Đổi màu nếu được chọn
                      borderWidth: selectedDapAn === dapAn.stt ? 2 : 0, // Thêm border nếu được chọn
                      borderColor: selectedDapAn === dapAn.stt ? '#6cb8d6' : 'transparent' // Màu của border
                    }}
                      onPress={() => handleDapAn(dapAn.stt, noiDungTN.dapAnDung)}>
                      <Animatable.View
                        ref={(ref) => {
                          wrongAnswerRefs.current[dapAn.stt] = ref;
                        }}
                      >
                        <RenderHTML contentWidth={contentWidth} source={{ html: dapAn.tenDa }} />
                      </Animatable.View>
                    </TouchableOpacity>

                  ))}

                </View>
              ))}

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 3 }}>
                <TouchableOpacity onPress={handleXacNhan} style={{ backgroundColor: '#61affe', borderRadius: 5, alignItems: 'center', width: 100, justifyContent: 'center' }}>
                  <Text style={{ paddingVertical: 5, color: 'white' }}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        )}
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      {showConfetti && <ConfettiCannon count={75} origin={{ x: -10, y: 0 }} />}
    </View>

  );
};

export default LearningScreen;
