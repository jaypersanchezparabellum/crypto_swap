import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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

function Login({navigation}) {

    const [email, setEmail] = useState("bogus@email.com");
    const [password, setPassword] = useState("boguspassword");

    function handleEmailChange() {
        setEmail(email);
    }

    function handlePasswordChange() {
        setPassword(password)
    }

    function onLogin() {
        //alert(`${email} :: ${password}`)
        try {
            if (email.length > 0 && password.length > 0) {
              navigation.navigate('App')
            }
        } catch (error) {
            alert(error)
        }
    }

    function goToSignup() {
        navigation.navigate('Signup')
    }

    return (
        <View style={styles.container}>
                <View style={{ margin: 10 }}>
                    <TextInput
                        name='email'
                        value={email}
                        placeholder='Enter email'
                        autoCapitalize='none'
                        onChangeText={setEmail}
                        style={styles.textInput}
                    />
                    </View>
                    <View style={{ margin: 10 }}>
                    <TextInput
                        name='password'
                        value={password}
                        placeholder='Enter password'
                        secureTextEntry
                        onChangeText={setPassword}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.buttonAlign}>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={onLogin}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>Login</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={goToSignup}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>Signup</Text>
                    </TouchableHighlight>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //backgroundColor: '#6A6463',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      marginHorizontal: Dimensions.get('window').height * 0.01,
      marginVertical: Dimensions.get('window').width * 0.1
    },
    buttonAlign: {
        flex: 2, 
        flexDirection: 'row',
    },
    textInput: {
        paddingLeft: 10,
        height: 30,
        borderWidth: 2
    },
    submit:{
        marginRight:20,
        marginLeft:20,
        marginTop:10,
        width: "50%", 
        alignContent: 'left'
    },
    submitText:{
        paddingTop:20,
        paddingBottom:20,
        color:'#fff',
        textAlign:'center',
        backgroundColor:'#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    }
})

export default Login
