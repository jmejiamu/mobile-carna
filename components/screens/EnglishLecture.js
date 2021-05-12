import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import restapi from '../url/url';

import { useRoute, useNavigation } from '@react-navigation/native'

const EnglishLecture = () => {

    const navigation = useNavigation();
    const [contentData, setContentData] = useState([]);
    const getData = async () => {
        try {
            const response = await fetch(restapi.carna + '/allenglish')

            const dataResponse = await response.json()

            setContentData(dataResponse);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <FlatList
            data={contentData}
            keyExtractor={(item, index) => index.toString()}

            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('lecture', { id: item.id }) }} >
                        <Image style={styles.image} source={{ uri: 'https://img.icons8.com/clouds/100/000000/groups.png' }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>{item.title}</Text>
                            <Text style={styles.count}>Basic Lecture</Text>
                            <TouchableOpacity style={styles.followButton}>
                                <Text style={styles.followButtonText}>Explore now</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export default EnglishLecture;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#ebf0f7"
    },
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#ebf0f7"
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#6666ff"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "#dcdcdc",
        fontSize: 12,
    },
})
