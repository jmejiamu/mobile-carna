import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import InputComponent from './InputComponent';


const Singin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        const body = {
            email: email,
            password: password
        }
        props.signin(body)

        setEmail('')
        setPassword('')
        console.log('user logged in');
        props.navigation.navigate('HomeOption')
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>

            <View style={styles.container}>
                <View style={styles.inputStyle}>
                    <View style={styles.logoStyle} >
                        <FontAwesome5 name="user-circle" size={40} color="white" />
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
                        <Text style={styles.textSingStyle} >Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                        <Text style={styles.textSingStyle} >Register Here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262432',
        justifyContent: "center"
    },
    inputStyle: {
        marginLeft: 20,
        marginRight: 50
    },
    // inputStyle: {
    //     height: 40,
    //     borderColor: 'gray',
    // borderBottomWidth: 4,
    //     padding: 10,
    //     // marginBottom: 15,
    //     color: "white",
    //     width: "100%",
    //     marginLeft: 5
    // },
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
    logoStyle: {
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        alignItems: "center",
        marginBottom: 60
    }

})

export default Singin
