import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import restapi from '../url/url'
import { useRoute, useNavigation } from '@react-navigation/native'

const Home = (props) => {
    console.log('<<<<>>', props);
    const [userId, setUserId] = useState("")
    const [picture, setPicture] = useState("")
    const [userName, setUserName] = useState("");

    const [isAuthenticated, setAuthenticated] = useState(false);

    const navigation = useNavigation();

    const getUserInfo = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await fetch(restapi.carna + '/data', {
                method: 'GET',
                headers: { token: token }
            })
            const data = await response.json()

            console.log(data);
            setUserName(data.name)
            setPicture(data.picture)
            setUserId(data.id)
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        getUserInfo()

    }, [])

    // const logout = async () => {
    //     try {
    //         await AsyncStorage.removeItem("token")
    //         props.navigation.replace("login")
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }
    const logout = () => {
        AsyncStorage.removeItem("token").then(() => {
            props.setLogged(false)
            navigation.replace("Signin")
        })
    }
    return (
        <View>
            <Text>Home</Text>
            <Text>{userName}</Text>
            <Button
                title="logout"
                mode="contained"
                style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                onPress={() => logout()}
            />


        </View>
    )
}
export default Home;
const styles = StyleSheet.create({})
