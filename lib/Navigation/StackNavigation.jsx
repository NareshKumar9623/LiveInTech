import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {

    const [isFirstLaunch, setIsFirstLaunch] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('isFirstLaunch')
            .then(value => {
                if (value === null || value === 'true') {
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
                console.log('isFirstLaunch value:', value);
            })
            .catch(error => {
                console.log('Error retrieving isFirstLaunch value:', error);
            });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false
                }}
            >
                {isFirstLaunch ? (
                    <Stack.Screen name="Login1" component={Login} />
                    
                ) : (
                    <Stack.Screen name="Home1" component={Home} />
                )}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
