import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faUser,
} from "@fortawesome/free-solid-svg-icons";

let deviceWitdh = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const PostDetails = ({ route }) => {
    const { post } = route.params
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{post?.title}</Text>
            <View>
                <Text>Harita</Text>
            </View>
            <View style={styles.rightAlign}>
                <FontAwesomeIcon
                    icon={faUser}
                    color="#776B5D"
                    style={styles.iconStyle}
                />
                <Text style={styles.postedBy}>@{post?.postedBy.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.scrollContainer}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>   {post?.description}</Text>
                    </View>
                </View>
                {/* Diğer post detayları */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 50
    },
    title: {
        fontSize: 25,
        fontWeight: "900",
        marginBottom: 10,
        color: "#332f2a",
        textTransform: "uppercase"
    },
    scrollContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    descriptionContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2ece1",
        width: deviceWitdh - 20,
        minHeight: deviceHeight * 0.15,
        borderRadius: 5,
        padding: 15,
    },
    description: {
        fontSize: 19,
        fontWeight: "300",
        textTransform: "none",
        color: "#4d453c"
    },
    postedBy: {
        fontSize: 16,
        fontWeight: "200",
        marginTop: 10,
        color: "#332f2a",
    },
    rightAlign: {
        flexDirection: "row",
        alignSelf: "flex-end",
        marginRight: 20,
    },
    iconStyle: {
        color: "#776B5D",
        fontSize: 12,
        paddingTop: 40,
        marginRight: 10
    }
})
