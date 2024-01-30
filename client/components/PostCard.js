import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLocationDot,
  faUser,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import globalStyles from "../assets/style";


const PostCard = ({ posts, onPress }) => {
  return (
    <View>
      {posts?.map((post, i) => (
        <TouchableOpacity
          key={post?._id || i}
          style={globalStyles.card}
          onPress={() => onPress(post)}
        >
          <View style={globalStyles.headerStyle}>
            <Text style={globalStyles.cardTitleStyle}>{post?.title}</Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "#776B5D",
              }}
            >
              {" "}
              <FontAwesomeIcon
                icon={faLocationDot}
                color="#776B5D"
                style={style.iconStyle}
              />
              {"  "}
              <Text style={globalStyles.cardCityName}>
                {post?.location?.address
                  ? post.location.address.split(",")[0].trim()
                  : "Unknown"}
              </Text>
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "#ffffff",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />
          <Text
            style={{
              textTransform: "capitalize",
              paddingTop: 5,
              fontWeight: "600",
              fontSize: 13,
              color: "#776B5D",
              padding: 20
            }}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {post?.description}
          </Text>
          <View style={style.footer}>
            <Text style={{ color: "grey", fontWeight: "300" }}>
              <FontAwesomeIcon
                icon={faUser}
                color="#776B5D"
                style={globalStyles.cardIconStyle}
              />
              {"  "}
              {post?.postedBy?.name || "Unknown"}
            </Text>
            <Text style={{ color: "gray", fontWeight: "500" }}>
              <FontAwesomeIcon
                icon={faCalendar}
                color="#776B5D"
                style={globalStyles.cardIconStyle}
              />{" "}
              {"  "}
              {moment(post?.createdAt).format("DD/MM/YY")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBE3D5",
  },
  footerStyle: {
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },



});

export default PostCard;
