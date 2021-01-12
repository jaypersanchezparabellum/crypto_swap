import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  TouchableHighlight, 
  SafeAreaView, 
  Dimensions, 
  Image, 
  Switch, 
  ScrollView 
} from 'react-native';
import AppContainer from './navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

export default function App() {
  return (
    <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    marginHorizontal: Dimensions.get('window').height * 0.01,
    marginVertical: Dimensions.get('window').width * 0.1
  },
});
