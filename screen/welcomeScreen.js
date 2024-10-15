import React from 'react';
import { Image, Text, View } from 'react-native';
import style from '../styles/welcomeScreenStyle';

const Welcome = () => {
  
  return (
    <View style={style.container}>
    <Image style={style.icon} source={require('./images/education.png')}></Image>
      <Text style={style.title}>EDU START</Text>
    </View>
  )
}

export default Welcome