import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, } from 'react-native';
import Register from '../Register';
import Singin from '../Singin';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator();
const Driver = () => {
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="Signin" >
                <Stack.Screen
                    name="Singin"
                    component={Singin}
                    options={{
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#1D1B28' },
                    }} />

                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#1D1B28' }
                    }} />


            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
});

export default Driver;