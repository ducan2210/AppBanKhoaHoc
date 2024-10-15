import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import Router from './navigator/router';
import Login from './screen/loginScreen'
import LearningScreen from './screen/learningScreen'
import CreateAccountScreen from './screen/createAccountScreen'
export default function App() {
  return (
    <NavigationContainer>
      {/* <StartScreen></StartScreen> */}
      <Router></Router>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
