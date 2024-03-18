import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { PostProvider } from "./context/postContext";

const RootNavigation = ({ initialRoute }) => {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu initialRoute={initialRoute} />
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
