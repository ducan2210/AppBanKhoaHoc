import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateAccount from '../screen/createAccountScreen';
import Login from '../screen/loginScreen';
import StartScreen from '../screen/startScreen';
import Welcome from '../screen/welcomeScreen';
import Learning from '../screen/learningScreen';
import Assessment from '../screen/assessmentScreen';
import DeepSearch from '../screen/deepSearchScreen';
import SettingUser from '../screen/settingUserScreen';
import ShoppingCart from '../screen/shoppingCartScreen';
import GvInformation from '../screen/gvInformationScreen';
import KhoaHocPreview from '../screen/khoaHocPreviewScreen';


const Stack = createNativeStackNavigator();

const Router = () => {
    
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
        setRedirectToLogin(true);
        }, 2000);

       
    }, []);

  return (
    
        <Stack.Navigator>
        {!redirectToLogin ? (
            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: 'Welcome',headerShown: false }}
           
            />
        ) : null}
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{title:'Đăng nhập',headerShown: false }}
          
        />
        <Stack.Screen 
          name="CreateAcc" 
          component={CreateAccount} 
          options={{title:'Đăng ký'}}
        />
         <Stack.Screen 
          name="StartScreen" 
          component={StartScreen} 
          options={{title:'Quay lại',headerShown: false }}
        />
         <Stack.Screen 
          name="Learning" 
          component={Learning} 
          options={{title:'' }}
        />
        <Stack.Screen 
          name="Assessment" 
          component={Assessment} 
          options={{title:'' }}
        />
         <Stack.Screen 
          name="DeepSearch" 
          component={DeepSearch} 
          options={{title:'' }}
        />
        <Stack.Screen 
          name="SettingUser" 
          component={SettingUser} 
          options={{title:'Cài đặt tài khoản' }}
        />
        <Stack.Screen 
          name="ShoppingCart" 
          component={ShoppingCart} 
          options={{title:'Giỏ hàng' }}
        />
        <Stack.Screen 
          name="GvInformation" 
          component={GvInformation} 
          options={{title:'Thông tin giảng viên' }}
        />
        <Stack.Screen 
          name="KhoaHocPreview" 
          component={KhoaHocPreview} 
          options={{title:'Thông tin khoá học' }}
        />
        </Stack.Navigator>
    
  )
}

export default Router