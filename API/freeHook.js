import { useEffect, useState } from 'react';
import apiconnect from '../API/apiUtils';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FreeHook = () => {

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
};

  // Export các giá trị và hàm cần sử dụng từ hook
  return {
    RatingStars,
    formatDate
  };
};

export default FreeHook;
