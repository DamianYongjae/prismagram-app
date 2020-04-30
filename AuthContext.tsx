import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext: React.Context<any> = createContext(0);

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  const logUserIn = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = (): boolean => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogin = (): object => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};
export const useLogOut = (): object => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};
