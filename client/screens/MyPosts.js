import React, { useContext, useEffect, useState } from "react";
import { ScrollView, RefreshControl, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { PostContext } from "../context/postContext";
import MyModalComponents from "../components/MyModalComponents";


const PostItem = ({ title, description, name, postId, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeletePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{title}</Text>
      <MyModalComponents
        postId={postId}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          onDelete(postId);
          setModalVisible(false);
        }}
      />
      <View style={{ borderWidth: 0.19, borderColor: "#000", marginBottom: 15 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.postDescription}>{description}</Text>
        <View style={{ flexDirection: "row" }}>
          <Icon name="user" style={{ color: "#E78895", fontSize: 17, marginTop: 10, position: "absolute", bottom: -15, right: 15 }} />
          <Text style={styles.postName}> {name}</Text>
        </View>
      </View>

    </View>
  );
};


const MyPosts = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [posts, setPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get(`http://192.168.1.191:8080/api/v1/post/get-posts-by-user/${state.user?._id}`);
      setPosts(response.data.posts);
      setRefreshing(false);
    } catch (error) {
      console.log("Bir hata oluştu!", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getPosts();
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://192.168.1.191:8080/api/v1/post/delete/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert("Başarıyla silindi!")
        // Silinen gönderiyi güncelle
        const updatedPosts = posts.filter(post => post._id !== postId);
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log("Bir hata oluştu!", error)
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      style={{ backgroundColor: "#BED1CF" }}
    >
      {posts.length === 0 ? (
        <View>
          <Text style={styles.noPostsText}>Henüz postunuz bulunmamaktadır.</Text>
          <TouchableOpacity style={{ borderWidth: 1, marginTop: 20, marginHorizontal: 100, borderRadius: 20, backgroundColor: "#E78895" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ textAlign: "center", padding: 20, color: "#fff", fontWeight: "600", fontSize: 15 }}>Post Paylaş</Text>
              <Icon name="plus" style={{ color: "#fff", fontSize: 20 }} />
            </View>
          </TouchableOpacity>

        </View>

      ) : (
        posts.map(post => (
          <PostItem
            key={post._id}
            title={post.title}
            description={post.description}
            name={state.user.name}
            postId={post._id}
            onDelete={handleDelete}
          />
        ))
      )}
    </ScrollView>
  );
};

export default MyPosts;


const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 0.5,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    paddingVertical: 40,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E78895",
    paddingLeft: 10,
    marginBottom: 5
  },
  postDescription: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "400",
    color: "#000",
    paddingLeft: 10
  },
  postName: {
    marginTop: 5,
    fontSize: 17,
    position: "absolute",
    bottom: -18,
    right: 1
  },
  noPostsText: {
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "#F8FAE5",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20
  }
});
