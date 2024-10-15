import { Alert } from 'react-native';
import apiconnect from '../API/apiUtils';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GvInformationHook = (magv) => {
    const api = apiconnect();
    const [gvProfile, setgvProfile] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(magv){api.get(`GiangVien/lay-thong-tin-giang-vien-theo-ma?maGV=${magv}`)
            .then(response => {
                setgvProfile(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }}, [magv]);
    

    return {
        isLoading,gvProfile,
    };
};


export default GvInformationHook;
