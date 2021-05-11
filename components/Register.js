import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import InputComponent from './InputComponent';
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';

const Register = (props) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // console.log(props.register);

    const handleSubmit = () => {
        const data = {
            name: userName,
            email: email,
            password: password
        }

        setUserName('')
        setEmail('')
        setPassword('')

    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }} >
            <View style={styles.container}>
                <View style={styles.inputStyle} >
                    <View style={styles.logoStyle} >
                        <FontAwesome5 name="user-circle" size={40} color="white" />
                    </View>
                    <View style={styles.iconStyles}>
                        <FontAwesome5 name="user" size={24} color="white" />
                        <InputComponent
                            // style={styles.inputStyle}
                            placeholder="User name"
                            // keyboardType="username"
                            placeholderTextColor='gray'
                            value={userName}
                            onChangeText={e => setUserName(e)}
                        />
                    </View>
                    <View style={styles.iconStyles}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="white" />

                        <InputComponent
                            // style={styles.inputStyle}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor='gray'
                            value={email}
                            onChangeText={e => setEmail(e)}

                        />
                    </View>
                    <View style={styles.iconStyles} >
                        <AntDesign name="lock1" size={24} color="white" />

                        <InputComponent
                            // style={styles.inputStyle}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor='gray'
                            value={password}
                            onChangeText={e => setPassword(e)}
                        />

                    </View>
                </View>
                <View style={{ marginLeft: 20, marginRight: 20 }}>

                    <TouchableOpacity style={styles.siginButtonStyle}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.textSingStyle} >Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('Singin')
                    }} >
                        <Text style={styles.textSingStyle} >Sign in Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262432',
        justifyContent: "center"
    },
    siginButtonStyle: {
        padding: 10,
        backgroundColor: '#1D1B28',
        marginBottom: 15
    },
    textSingStyle: {
        color: 'white',
        textAlign: "center",

    },
    iconStyles: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 60
    },
    inputStyle: {
        marginLeft: 20,
        marginRight: 50
    },
    logoStyle: {
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        alignItems: "center",
        marginBottom: 60
    }

})
