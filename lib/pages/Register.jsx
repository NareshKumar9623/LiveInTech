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

  const handleRegister = async () => {
    console.log('====================================');
    console.log('Registering user...');
    console.log('====================================');
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('userAuth').doc(user.uid).set({
        name,
        email,
        password,
        uid: user.uid,
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
      console.error('Error registering user:', error);
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
        placeholder="Set a Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
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
});