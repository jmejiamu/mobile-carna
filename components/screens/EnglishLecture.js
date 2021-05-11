import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import restapi from '../url/url';

const EnglishLecture = () => {

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
                    <View style={{ flex: 1 }}>
                        <View style={styles.card}>
                            <Text style={{ marginLeft: 15 }}>title: {item.title} </Text>

                        </View>
                    </View>
                )
            }}
        />
    )
}

export default EnglishLecture

const styles = StyleSheet.create({})
