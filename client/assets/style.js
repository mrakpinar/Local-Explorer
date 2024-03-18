import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
        color: "#776B5D",
        marginBottom: 45,
    },
    headerContainer: {
        backgroundColor: "#6420AA",
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
        fontWeight: "900",
        margin: 5,
        backgroundColor: "#FF7ED4",
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#FF3EA5',
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
        backgroundColor: "#6420AA",
        paddingRight: 40,
        paddingLeft: 40
    },
    footerIconStyle: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 30,
        margin: 4,
        // backgroundColor: "black",
        padding: 5,
        borderRadius: 10,
        width: "100%",
    },
    card: {
        width: "97%",
        backgroundColor: "#fff",
        borderWidth: 0.4,
        borderColor: "black",
        padding: 20,
        borderRadius: 5,
        marginVertical: 3,
    },
    cardTitleStyle: {
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#000",
        fontSize: 17,
        width: "50%",
    },
    cardityName: {
        fontSize: 12,
        color: "#000"
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
