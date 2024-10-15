import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';


import { Feather, Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screen/homeScreen';
import Lean from '../screen/learnScreen';
import Search from '../screen/searchScreen';
import Use from '../screen/userScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Nổi bật',headerShown:false, tabBarVisible: false, tabBarIcon: ({ color, size }) => (     <Ionicons name="star" size={20} color={'black'} />), }}/>
                <Tab.Screen name="Search" component={Search} options={{tabBarLabel: 'Tìm kiếm',headerShown:false, tabBarVisible: false,tabBarIcon: ({ color, size }) => (     <Ionicons name="search" size={20} color={'black'} />),  }}/>
                <Tab.Screen name="Lean" component={Lean} options={{tabBarLabel: 'học tập',headerShown:false, tabBarVisible: false,tabBarIcon: ({ color, size }) => (     <Ionicons name="play-circle" size={20} color={'black'} />), }}/>
                <Tab.Screen name="User" component={Use} options={{tabBarLabel: 'Tài khoản',headerShown:false, tabBarVisible: false,tabBarIcon: ({ color, size }) => (     <Feather name="user" size={20} color={'black'} />), }}/>
            </Tab.Navigator>
   
    );
}

export default TabNavigator;
