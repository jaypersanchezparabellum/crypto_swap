import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Signup({navigation}) {

    function goToLogin() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
        <Button title='Go to Login' onPress={goToLogin} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default Signup
