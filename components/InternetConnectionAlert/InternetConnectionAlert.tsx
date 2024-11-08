import React, { useEffect, useState } from "react";
import { StatusBar, Alert } from "react-native";
import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";

import colors from "@/constants/Colors";

export default function InternetConnectionAlert() {
  const [isConnected, setConnected] = useState<boolean>(true);

  const showAlert = () => {
    Alert.alert(
      "Internet Connection",
      "You are offline. Some features may not be available."
    );
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected ?? false);
      if (!state.isConnected) {
        showAlert();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <StatusBar
      backgroundColor={isConnected ? undefined : colors.danger}
      networkActivityIndicatorVisible={isConnected}
      hidden={!isConnected}
      animated={true}
      barStyle={isConnected ? undefined : "default"}
      showHideTransition={"slide"}
      translucent={isConnected}
    />
  );
}
