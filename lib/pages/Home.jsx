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
        Alert.alert('Error fetching name from storage:', error);
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
    <LinearGradient colors={['#C9D6FF', '#E2E2E2']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#C9D6FF'} />
      <Text style={styles.title}>Profile</Text>
      {userData ? (
        <>
          <Image
            source={
              userData.profilePicture
                ? { uri: userData.profilePicture }
                : require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')
            }
            style={styles.profilePicture}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Name: {userData.name}</Text>
            <Text style={styles.userInfoText}>Email: {userData.email}</Text>
            <Text style={styles.userInfoText}>Phone: {userData.phone}</Text>
            <Text style={styles.userInfoText}>Address: {userData.address}</Text>
            <Text style={styles.userInfoText}>Gender: {userData.gender}</Text>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
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
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20
  },
  userInfo: {
    width: '80%',
    marginBottom: 20
  },
  userInfoText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    
  },
  logoutButton: {
    backgroundColor: '#C9D6FF',
    width: '50%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    margin: 10
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }


})