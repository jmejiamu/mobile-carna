import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, } from 'react-native';
import Register from '../Register';
import Singin from '../Singin';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import restapi from '../url/url';
import EnglishLecture from '../screens/EnglishLecture';
import Lectures from '../screens/Lectures';




const Stack = createStackNavigator();
const Driver = ({ navigation }) => {
    const [isloggedin, setLogged] = useState(null)
    const [isAuthenticated, setAuthenticated] = useState(false);
    const setAuth = (boolean) => {
        setAuthenticated(boolean);
    }

    const isAuth = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await fetch(restapi.carna + '/isverify', {
                method: 'GET',
                headers: { token: token }
            })
            const data = await response.json()
            data === true ? setAuthenticated(true) : setAuthenticated(false)
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        isAuth()

    }, [])
    const LoginScreens = (props) => <Singin {...props} setLogged={setAuth} />
    const RegisterScreens = (props) => <Register {...props} setLogged={setAuth} />
    const HomeScreens = (props) => <Home {...props} setLogged={setAuth} />
    const LecuterScreens = (props) => <Lectures {...props} setLogged={setAuth} />
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="Signin" >
                {isAuthenticated ? (
                    <>
                        <Stack.Screen
                            name="home"
                            component={HomeScreens}
                            options={{
                                headerTintColor: 'white',
                                headerStyle: { backgroundColor: '#1D1B28' }
                            }} />
                        <Stack.Screen
                            name="english"
                            component={EnglishLecture}
                            options={{
                                headerTintColor: 'white',
                                headerStyle: { backgroundColor: '#1D1B28' }
                            }} />
                        <Stack.Screen
                            name="lecture"
                            component={LecuterScreens}
                            options={{
                                headerTintColor: 'white',
                                headerStyle: { backgroundColor: '#1D1B28' }
                            }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Signin"
                            component={LoginScreens}
                            options={{
                                headerTintColor: 'white',
                                headerStyle: { backgroundColor: '#1D1B28' },
                            }} />

                        <Stack.Screen
                            name="Register"
                            component={RegisterScreens}
                            options={{
                                headerTintColor: 'white',
                                headerStyle: { backgroundColor: '#1D1B28' }
                            }} />
                    </>
                )

                }

            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
});

export default Driver;