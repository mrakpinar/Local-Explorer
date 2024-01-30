import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const Coffee = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Coffee</Text>
        </SafeAreaView>
    )
}

export default Coffee

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    header: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold"
    }
})