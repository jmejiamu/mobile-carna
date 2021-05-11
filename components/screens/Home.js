import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { useEffect, useState } from 'react'
import {
    StyleSheet, Text, View, Button, Image,
    TouchableOpacity
} from 'react-native'
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

    const logout = () => {
        AsyncStorage.removeItem("token").then(() => {
            props.setLogged(false)
            navigation.replace("Signin")
        })
    }
    return (

        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.info}>UX Designer / Mobile developer</Text>
                    <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Opcion 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Opcion 2</Text>
                    </TouchableOpacity>
                </View>
                <Text>{userName}</Text>
                <Button
                    title="logout"
                    mode="contained"
                    style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                    onPress={() => logout()}
                />
            </View>
        </View>
    )
}
export default Home;
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
})
