import { useEffect, useState } from 'react';
import apiconnect from '../API/apiUtils';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const useCourseSelection = () => {
  const [khoaHocProfile, setkhoaHocProfile] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [mota, setmota] = useState('');
  const [maGV, setmaGV] = useState('');

  const api = apiconnect();

  useEffect(() => {
    if (selectedCourse) {
      api.get(`KhoaHoc/lay-thong-tin-khoa-hoc-theo-ma?maKhoaHoc=${selectedCourse.maKh}`)
        .then(response => {
          setkhoaHocProfile(response.data);
          setmota(response.data.moTa);
          setmaGV(response.data);
        })
        .catch(error => {
          // Xử lý lỗi
        });
    }
  }, [selectedCourse]);

  const handleCourseSelection = (khoaHoc) => {
    if (khoaHoc) {
      setSelectedCourse(khoaHoc);
      setIsCourseSelected(true);
    }
  };

  const handleBackToCourseList = () => {
    setSelectedCourse(null);
    setIsCourseSelected(false);
  };

  const RatingStars = ({ rating }) => {
    const integerPart = Math.floor(rating); // Phần nguyên của rating
    const decimalPart = rating - integerPart; // Phần thập phân của rating

    // Tạo mảng chứa số lượng sao nguyên và một phần của sao tiếp theo (nếu có)
    const stars = Array.from({ length: 5 }).map((_, index) => {
      // Nếu đang xét sao thập phân và tồn tại phần thập phân
      if (index === integerPart && decimalPart > 0) {
        const color = `rgba(255, 215, 0, ${decimalPart})`; // Tạo màu vàng dựa trên phần thập phân
        return <FontAwesome name="star" size={15} color={color} key={index} />;
      }
      // Nếu đang xét sao nguyên hoặc không tồn tại phần thập phân
      const isFilledStar = index < integerPart || (index === integerPart && decimalPart === 0);
      const color = isFilledStar ? "gold" : "grey"; // Màu của sao tùy thuộc vào xem nó có phải sao đầy hay không
      return <FontAwesome name="star" size={15} color={color} key={index} />;
    });

    return (
      <View style={{ flexDirection: 'row' }}>
        {stars}
      </View>
    );
  };

  // Export các giá trị và hàm cần sử dụng từ hook
  return {
    khoaHocProfile,
    selectedCourse,
    isCourseSelected,
    mota,
    maGV,
    RatingStars,
    handleCourseSelection,
    handleBackToCourseList,
  };
};

export default useCourseSelection;
