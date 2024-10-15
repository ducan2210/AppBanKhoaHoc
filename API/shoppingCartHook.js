import { useState } from 'react';
import { Alert } from 'react-native';
import apiconnect from '../API/apiUtils';

const ShoppingCartHook = () => {
    const api = apiconnect();
    const [refresh, setRefresh] = useState(false);

    const handleAddToShoppingCart = (maHV, maKH) => {
        Alert.alert(
          "Thông báo",
          "Thêm vào giỏ hàng?",
          [
            {
              text: "Không",
              onPress: () => {},
              style: "cancel"
            },
            {
              text: "Có",
              onPress: () => {
                themKH(maHV, maKH);
              }
            }
          ]
        );
    };

    const themKH = async (maHV, maKH) => {
        try {
            const response = await api.post(`GioHang/them-gio-hang?maHV=${maHV}&maKH=${maKH}`);
            if (response.data.status === "Success") {
                Alert.alert("Thông báo", response.data.message);
            } else {
                Alert.alert("Thông báo", response.data.message);
            }
        } catch (error) {
            console.error('Error adding course to cart:', error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm khóa học vào giỏ hàng.");
        }
    };

    const deleteItem = async (maGh, maKh) => {
        try {
            const response = await api.delete(`GioHang/xoa-ctgh?maGh=${maGh}&maKh=${maKh}`);
            if (response.data.status === "Success") {
                Alert.alert("Thông báo", response.data.message);
                setRefresh(prev => !prev); // Refresh the interface
            } else {
                Alert.alert("Thông báo", response.data.message);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const removeItem = (maGh, maKh) => {
        Alert.alert(
            "Thông báo",
            "Xoá khoá học ra khỏi giỏ hàng?",
            [
                {
                    text: "Không",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Có",
                    onPress: () => deleteItem(maGh, maKh),
                }
            ]
        );
    };

    return {
        handleAddToShoppingCart,
        removeItem,
        refresh, // Export refresh so it can be used in the component
    };
};

export default ShoppingCartHook;
