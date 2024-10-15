import { Alert } from 'react-native';
import apiconnect from '../API/apiUtils';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserHook = (setIsLoading) => {
    const api = apiconnect();
    const [userID, setuserID] = useState('');
    const [userName, setuserName] = useState('');
    const [userProfile, setuserProfile] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await AsyncStorage.getItem('UserID');
                const name = await AsyncStorage.getItem('UserName');
                if (id && name) {
                    setuserID(id);
                    setuserName(name);
                    setIsLoading(true);
                    const response = await api.get(`HocVien/lay-thong-tin-hoc-vien-theo-mahv?maHv=${id}`);
                    setuserProfile(response.data);
                    setIsLoading(false);
                } else {
                    setIsLoading(false); // Stop loading if userID or userName is not available
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        userID,userName,userProfile
    };
};

export default UserHook;
