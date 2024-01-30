import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#E5E1DA",
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
        color: "#776B5D",
        marginBottom: 45,
    },
    headerContainer: {
        backgroundColor: "#294B29",
        elevation: 3,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 2,
        borderRadius: 8,
        borderColor: "white",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginBottom: 20
    },
    header: {
        color: "#F3EEEA",
        fontSize: 24,
        fontWeight: "800",
        textAlign: "justify",
        fontWeight: "300",
        margin: 5,
        backgroundColor: "#789461",
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#789461',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: "800",
        fontSize: 14
    },
    footerContainer: {
        flexDirection: "row",
        margin: 10,
        justifyContent: "space-between",
        backgroundColor: "#294B29",
        paddingRight: 40,
        paddingLeft: 40
    },
    footerIconStyle: {
        alignSelf: "center",
        fontSize: 30,
        margin: 4,
    },
    card: {
        width: "97%",
        backgroundColor: "#f0f0f0f0",
        borderWidth: 0.8,
        borderColor: "gray",
        padding: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    cardTitleStyle: {
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#776B5D",
        fontSize: 17,
        width: "50%",
    },
    cardityName: {
        fontSize: 12,
        color: "#776B5D"
    },
    cardIconStyle: {
        color: "#776B5D",
        fontSize: 12,
    },
    headerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    // Diğer stil tanımlamalarını ekleyebilirsiniz
});

export default globalStyles;
