import { useEffect } from "react";
import { View, Image, StyleSheet, SafeAreaView, Pressable, Button, Text } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

import { exec_login } from "@/shared/js/api";
import { GOOGLE_AUTH_URL } from '@/config/config.js';
import On_boarding from "@/pages/login/onboarding/Onboarding";
import btn_google_login from "@/assets/img/login/btn_google_login.png"

// WebBrowser.maybeCompleteAuthSession();

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth'; // 외부 서비스의 인증 URL
const clientId = '155502759784-acllog24skbdl2ml05vldv38844muegm.apps.googleusercontent.com'; // 외부 서비스에서 발급한 클라이언트 ID

const redirectUri = AuthSession.makeRedirectUri();

const Login_page = () => {
  const [request, response, prompt_async] = Google.useAuthRequest(GOOGLE_AUTH_URL);

  useEffect(() => {
    if (response?.type === 'success') {
      console.log('response', response)
      // const access_token = response.authentication.accessToken;
      // api_login_google(access_token);
    }
  }, [response]);

  const api_login_google = async (access_token) => {
    const params = {
      url: 'login/google',
      access_token: access_token,
    };

    await exec_login(params);
  }

  const handleGoogleLogin = async () => {
    const result = await prompt_async(); // Prompt for an auth code
    console.log('result', result);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <On_boarding />
        </View>
        <Pressable style={{ flex: 0.2 }} onPress={handleGoogleLogin}>
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