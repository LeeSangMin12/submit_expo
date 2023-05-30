import { useState, useEffect } from "react";
import { View, Image, StyleSheet, SafeAreaView, Pressable, Button, Text } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";

import On_boarding from "@/pages/login/onboarding/Onboarding";
import btn_google_login from "@/assets/img/login/btn_google_login.png"

WebBrowser.maybeCompleteAuthSession();

const Login_page = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "155502759784-acllog24skbdl2ml05vldv38844muegm.apps.googleusercontent.com",
    androidClientId: "155502759784-3cmortjrsecugber03afvnana9arlgl2.apps.googleusercontent.com",
    iosClientId: "155502759784-dd6blvf1to4thrtnol1qhd5q567b0n1o.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <On_boarding />
        </View>
        <Pressable style={{ flex: 0.2 }}>
          {/* <Image
            source={btn_google_login}
          /> */}

          {userInfo === null ? (
            <Button
              title="Sign in with Google"
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            />
          ) : (
            <>
              <Text style={styles.text}>{userInfo.name}</Text>
              <Button title='로그아웃' onPress={() => setUserInfo(null)} />
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Login_page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});