import { Alert } from 'react-native';
import apiconnect from '../API/apiUtils';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedbackComponent } from 'react-native';


const KhHook = (setIsLoading) => {
    const api = apiconnect();
    const [listKhoaHoc, setListKhoaHoc] = useState([]);
    const [openChapters, setOpenChapters] = useState({});
    const [listKhoaHocDM, setListKhoaHocDM] = useState([]);
    const toggleChapter = (maChuong) => {
        setOpenChapters(prevState => ({
            ...prevState,
            [maChuong]: !prevState[maChuong]
        }));
    };

    const layListKHTheoDM = (maDanhMuc) => {
        api.get(`KhoaHoc/lay-danh-sach-khoa-hoc-theo-ma-danh-muc?maDM=${maDanhMuc}`)
            .then(response => {
                setListKhoaHocDM(response.data);
                setIsLoading(false);
           
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error fetching courses:', error);
            });
    }

    useEffect(() => {
        api.get('KhoaHoc/lay-danh-sach-khoa-hoc')
            .then(response => {
                setListKhoaHoc(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error fetching courses:', error);
            });
    }, []);

    return {
        listKhoaHoc,
        toggleChapter,
        openChapters,
        layListKHTheoDM,
        listKhoaHocDM,
    };
};


export default KhHook;
