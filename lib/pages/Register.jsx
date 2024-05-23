import { StyleSheet, Text, View, TextInput, Button, StatusBar, Touchable, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }; 

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    console.log('====================================');
    console.log('Registering user...');
    console.log('====================================');
    try {
      if (!validatePassword(password)) {
        return;
      }

      if(name === '' || email === '' || password === '') {
        Alert.alert('Please fill all fields!');
        return;
      }

      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('userAuth').doc(user.uid).set({
        name,
        email,
        password,
        uid: user.uid,
        address,
        phone,
        gender,
        
      });
      AsyncStorage.setItem('uid', user.uid);
      AsyncStorage.setItem('isFirstLaunch', 'false');
      Alert.alert('User registered successfully!');
      console.log('User registered successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      Alert.alert('Error registering user:', error.message);
    }
  };

  return (
    <LinearGradient colors={['#C9D6FF','#E2E2E2']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'#C9D6FF'} />
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a Name"
            placeholderTextColor="#000"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter a Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Gender"
            placeholderTextColor="#000"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Phone"
            placeholderTextColor="#000"
            value={phone}
            keyboardType='numeric'
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            placeholderTextColor="#000"
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Set a Password"
              placeholderTextColor="#000"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={handleTogglePasswordVisibility}
              style={styles.passwordVisibilityButton}
            >
              <Text style={styles.passwordVisibilityButtonText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
        </View>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: '#C9D6FF',
    width: '50%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordVisibilityButton: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
  passwordVisibilityButtonText: {
    color: '#000',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOptionLabel: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },


});