import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import LinearGradient from 'react-native-linear-gradient';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersCollection = await firestore().collection('userAuth').get();
            const fetchedUsers = usersCollection.docs.map((doc) => doc.data());
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            Alert.alert('Error fetching users:', error.message);
        }
    };

    const deleteUser = async (userId) => {
        console.log('Deleting User:',userId)
        try {
            // Delete user from userAuth collection
            await firestore().collection('userAuth').doc(userId).delete();
            
            // Delete user from auth
            const user = auth().currentUser;
            if (user) {
                await user.delete();
                Alert.alert('User deleted successfully!');
            }
            
            // Fetch updated users
            fetchUsers();
        } catch (error) {
            Alert.alert('Error deleting user:', error);
            console.error('Error deleting user:', error.message);
        }
    };

    return (
        <LinearGradient colors={['#C9D6FF', '#E2E2E2']} style={styles.container}>  
        <StatusBar barStyle="dark-content" backgroundColor={'#C9D6FF'} />   
        <View style={styles.container}>
            <Text style={styles.heading}>Admin Users Page</Text>
            {users.map((user) => (
                <View key={user.id} style={styles.userContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Button title="Delete" onPress={() => deleteUser(user.uid)} />
                </View>
            ))}
        </View>
        </LinearGradient>
    );
};

export default Users;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
      },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:'80%'
    },
    userName:{
        color:'black',
        fontWeight:'bold',
        
    }
    
});