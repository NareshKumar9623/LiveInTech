import React, { useState } from 'react';
import { View, Button, StatusBar, TextInput, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: '196605133572-28k2uc9g5639trqirontqucv881qn1i8.apps.googleusercontent.com',
});

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);



  const handleGoogleSignup = async () => {
      try {
          console.log('Google signup initiated...');
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          await auth().signInWithCredential(googleCredential);

          const userInfo = await GoogleSignin.getCurrentUser();
          const { name, email } = userInfo.user;

          if(photo === null) {
              setPhoto('');
          }

          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('isFirstLaunch', 'false');
          await AsyncStorage.setItem('uid', auth().currentUser.uid);

          const userRef = firestore().collection('userAuth').doc(auth().currentUser.uid);

          const userDoc = await userRef.get();

          if (userDoc.exists) {
              console.log('Existing user:', userDoc.data());
          } else {
              console.log('New user:', name, email, photo);
              await userRef.set({
                  name,
                  email,
                  photo,
              });
          }
          console.log('Google user info:', userInfo);
          console.log('Google user name:', name, email, photo);
          console.log('Google signup successful!');

          navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
          });

      } catch (error) {
          console.error('Google signup error:', error);
      }
  };

  const handleEmailLogin = async () => {
    console.log('====================================');
    console.log('Email login initiated...');
    console.log('====================================');
    try {
      const userRef = firestore().collection('userAuth');
      const querySnapshot = await userRef.where('email', '==', email).get();

      if (!querySnapshot.empty) {
        // Email is already registered
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log('User data:', userData, password);
        if (userData.password === password) {
          console.log('Email login successful!');
          console.log('User data:', userData.uid);
          Alert.alert('Login Successfully');
          AsyncStorage.setItem('isFirstLaunch', 'false');
          AsyncStorage.setItem('uid', userData.uid);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home',  }],
          });
        } else {
          console.log('Wrong password');
          Alert.alert('Wrong password');
        }
      } else {
        // Email is not registered
        console.log('Email is not registered');
        Alert.alert('Email is not registered');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Register' }],
        });
      }
    } catch (error) {
      console.error('Email login error:', error);
    }
  }



  return (
    <LinearGradient colors={['#C9D6FF','#E2E2E2']} style={{ flex: 1 }}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#C9D6FF'} />

      <Text style={styles.heading}>Login</Text>

      <Image source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')} style={{ width: 200, height: 200 }} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter the Email"
          placeholderTextColor="#000"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the Password"
          placeholderTextColor="#000"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <GoogleSigninButton
        style={{ width: '70%', height: 60, borderRadius: 24, marginTop: 20,}}
        size={GoogleSigninButton.name === 'standard' ? GoogleSigninButton.Size.Standard : GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleGoogleSignup}
        disabled={false}
        />
    </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        margin: 20,
    },
    heading: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },

    text : {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#C9D6FF',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
})