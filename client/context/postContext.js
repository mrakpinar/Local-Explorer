import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  // states
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // get posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://192.168.137.240:8080/api/v1/post/get-all-post"
      );
      setLoading(false);
      // console.log("Fetched Posts:", data.posts);
      // setPosts(data?.posts.location.address);
    } catch (error) {
      console.log("Error Fetching Posts:", error);
      setLoading(false);
    }
  };

  // initial posts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
