import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchNameFromStorage = async () => {
      try {
        const user = auth().currentUser;
        console.log('User:', user);
        const uid = await AsyncStorage.getItem('uid');

        console.log("UID: ", uid);
        if (uid) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            uid: uid,
          }));
          const userSnapshot = await firestore().collection('userAuth').doc(uid).get();
          if (userSnapshot.exists) {
            setUserData(userSnapshot.data());
          }
        }
      } catch (error) {
        console.log('Error fetching name from storage:', error);
      }
    };
    fetchNameFromStorage();
  }, []);

  handleLogout = async () => {
    console.log('Logging Out...');
    try {
      const user = auth().currentUser;
      if (user) {
        await auth().signOut();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
        AsyncStorage.clear();
        console.log('Logged out successfully!');
        Alert.alert('Logged out successfully!');
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
        AsyncStorage.clear();
        Alert.alert('Logged out successfully!');
        console.log('No user is currently signed in.');
      }
    } catch (error) {
      console.log('Error logging out:', error);
    }
  }


  return (
    <LinearGradient colors={['#C9D6FF','#E2E2E2']} style={{ flex: 1 }}>
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={'#C9D6FF'} />
    <Text style={styles.title}>Profile</Text>
      {userData ? (
        <>
        <Image
          source={userData.profilePicture ? { uri: userData.profilePicture } : require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
          style={styles.profilePicture}
        />
          <Text style={styles.text}>Name: {userData.name}</Text>
          <Text style={styles.text}>Email: {userData.email}</Text>
        </>
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
      <TouchableOpacity style={styles.footer} onPress={handleLogout }>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#C9D6FF'

  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }
})