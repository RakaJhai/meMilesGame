import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

function RegisterScreen(props) {
  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const [isActive, setActive] = useState(false);

//   const checkRegister = () => {
//     if (!fullname || !email) {
//       setMessage('Need Fullname and Email');
//     } else if (!password || !confirmPassword) {
//       setMessage('Need Password');
//     } else if (password != confirmPassword) {
//       setMessage('Password doesnt match');
//     } else {
//       const dataRegister = {
//         fullName: fullname,
//         email: email,
//         password: password,
//         photoProfile:
//           'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png',
//       };

//       props.processRegister(dataRegister);
//     }
//   };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View
          style={isActive ? styles.containerActive : styles.container}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}>
          <View style={styles.centerContentStyle}>
            <Text style={styles.titleStyle}>Sign up</Text>

            <Text>Fullname</Text>
            <TextInput
              placeholder="Enter Fullname ..."
              onChangeText={(text) => setFullname(text)}
              value={fullname}
              style={styles.textInput}
            />

            <Text>Email</Text>
            <TextInput
              placeholder="Enter email ..."
              style={styles.textInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <Text>Password</Text>
            <TextInput
              placeholder="Enter password ..."
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
              style={styles.textInput}
            />

            <Text>Confirm password</Text>
            <TextInput
              placeholder="Confirm password ..."
              onChangeText={(text) => setconfirmPassword(text)}
              secureTextEntry
              value={confirmPassword}
              style={styles.textInput}
            />
          </View>
          <Text style={{textAlign: 'center', color: 'red'}}>{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => checkRegister()}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={{marginVertical: 20, marginHorizontal: 10}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              style={{alignItems: 'flex-end'}}>
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
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
    padding: 10,
  },
  centerContentStyle: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 5,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#7971EA',
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
