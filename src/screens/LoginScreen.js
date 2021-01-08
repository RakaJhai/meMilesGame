import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';


function LoginScreen(props) {
  const [isActive, setActive] = useState(false);
  const [email, setEmail] = useState('csokta@gmail.com');
  const [password, setPassword] = useState('password');
  const [message, setMessage] = useState('');

  const authlogin = () => {
    if (!email || !password) {
      setMessage('Email or Password Failed !');
    } else {
      props.prosesLogin({email: email, password: password})
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={styles.container}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}>
           <View style={{alignContent:'center',alignItems:'center'}}>
        
        <Image source={require('../../icons/logoatas.png')} style={{width:268,height:87,resizeMode:'stretch'}} />
        </View>
        <View style={styles.centerContentStyle}>
       
          <Text style={styles.titleStyle}>Sign In</Text>

          <Text>Email</Text>
          <TextInput
            placeholder="Enter email ..."
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />

          <Text >Password</Text>
          <TextInput
            placeholder="Enter password ..."s
            w
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>

        <Text style={{color: 'red', marginHorizontal: 10, textAlign: 'center'}}>{message}</Text>
        { props.isLoading ? (
            <View style={{borderRadius: 50, backgroundColor: '#f2f2f2', padding: 15}}>
              <ActivityIndicator size="large" color="#7971EA" />
            </View>
          ) : (
            <TouchableOpacity onPress={() => {
                authlogin()
            }} style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          )}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            marginHorizontal: 10,
          }}>
          <TouchableOpacity style={{flex: 1}}>
            <Text>Forgot password ?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Register')}
            style={{alignItems: 'flex-end'}}>
            <Text style={{alignItems: 'flex-end'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading
})

const mapStateDispatchToProps = (dispatch) => ({
  prosesLogin: (data) => dispatch({type: 'LOGIN', payload: data})
})

export default connect(mapStateToProps, mapStateDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  containerActive: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#1e65a7',
    padding: 10,
  },
  centerContentStyle: {
    marginHorizontal: 10,
    marginBottom: 60,
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 5,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1e65a7',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    padding: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
