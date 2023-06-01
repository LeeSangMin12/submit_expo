import { useEffect } from "react";
import { View, Image, StyleSheet, SafeAreaView, Pressable, Button, Text } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { exec_login } from "@/shared/js/api";
import { GOOGLE_AUTH_URL } from '@/config/config.js';
import On_boarding from "@/pages/login/onboarding/Onboarding";
import btn_google_login from "@/assets/img/login/btn_google_login.png"

WebBrowser.maybeCompleteAuthSession();

const Login_page = () => {
  const [request, response, prompt_async] = Google.useAuthRequest(GOOGLE_AUTH_URL);

  useEffect(() => {
    google_login();
  }, [response]);

  const google_login = async () => {
    console.log('response.authentication', response.authentication);
    if (response?.type === 'success') {
      const params = {
        token: response.authentication.accessToken,
      };
      await exec_login(params);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <On_boarding />
        </View>
        <Pressable style={{ flex: 0.2 }} onPress={() => prompt_async()}>
          <Image
            source={btn_google_login}
          />
        </Pressable>
      </View>
    </SafeAreaView >
  );
}

export default Login_page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});