import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootNavigation from "./navigation";

const App = () => {
  const [initialRoute, setInitialRoute] = useState("Login");
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const checkAuthData = async () => {
      try {
        const authData = await AsyncStorage.getItem("@auth");
        if (authData) {
          setInitialRoute("Home");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCheckedAuth(true);
      }
    };

    checkAuthData();
  }, []);

  if (!checkedAuth) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootNavigation initialRoute={initialRoute} />
    </NavigationContainer>
  );
};

export default App;
