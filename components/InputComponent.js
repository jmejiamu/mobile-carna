import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const InputComponent = (props) => {
    return (<TextInput {...props} style={{ ...styles.inputStyle, ...props.style }} />
    )
}

export default InputComponent;

const styles = StyleSheet.create({
    inputStyle: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 10,
        // marginBottom: 15,
        color: "white",
        width: "100%",
        marginLeft: 5,

    },
})
