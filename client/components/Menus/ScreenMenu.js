import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import Post from "../../screens/Post";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Explorer from "../../screens/Explorer";
import Profile from "../../screens/Profile";
import Coffee from "../../screens/CategoriesScreens/Coffee";
import PostDetails from "../../screens/PostDetails";

const ScreenMenu = ({ initialRoute }) => {
  const Stack = createNativeStackNavigator();

  const [state] = useContext(AuthContext);

  const authenticatedUser = state?.user && state?.token;

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            // options={{
            //   title: "Local Explorer",
            //   headerRight: () => <HeaderMenu />,
            //   headerStyle: {
            //     backgroundColor: "#F3EEEA",
            //   },
            // }}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Explorer"
            component={Explorer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            // options={{
            //   headerBackTitle: "Back",
            //   headerRight: () => <HeaderMenu />,
            //   headerStyle: {
            //     backgroundColor: "#F3EEEA",
            //   },
            // }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={{ headerShown: true , title:"Post"}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />

        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
