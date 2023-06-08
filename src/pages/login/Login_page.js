import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Pressable } from "react-native";
import axios from "axios";

import Login_modal from "@/pages/login/login_modal/Login_modal";
import { GOOGLE_AUTH_URL } from "@/config/config";
import On_boarding from "@/pages/login/onboarding/Onboarding";
import btn_google_login from "@/assets/img/login/btn_google_login.png";


const GOOGLE_CLIENT_ID = '155502759784-lc91rr15k6sh8qr7m97prlsogkc2ts88.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:3000/google';

const Login_page = () => {
  const [login_modal, set_login_modal] = useState(false);
  const [login_method, set_login_method] = useState('');
  const [uri, set_uri] = useState('');

  const handle_login = (login_method) => {
    if (login_method === 'google') {
      set_login_method('google');
      // set_uri(
      //   `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=google&scope=openid`,
      // );

      set_uri(
        GOOGLE_AUTH_URL
      );
      set_login_modal(true);
    }
  };

  useEffect(() => {
    const authorization_code = '4%2F0AbUR2VOXh-CtqsOvgQGrBtFOnlfNCXKWm_7hGNp0EOZfQTYyV53u3Fqt914GGgui3uBFvQ';

    const get_token = async (authorization_code) => {
      const auth_url =
        `https://www.googleapis.com/oauth2/v4/token?` +
        `grant_type=authorization_code&` +
        `code=${authorization_code}&` +
        `client_id=155502759784-lc91rr15k6sh8qr7m97prlsogkc2ts88.apps.googleusercontent.com&` +
        `client_secret=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&` +
        `redirect_uri=https://auth.expo.io/@sangminleee/submit_expo&`;

      const token_info = await axios
        .post(auth_url, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((el) => {
          console.log('el', el);
          return el.data;
        })
        .catch((err) => {
          console.log("err", err);
        });

      return token_info;
    }

    get_token(authorization_code);
  }, [])

  /**
   * 웹 뷰에서 응답 받은 결과를 핸들링
   * : onMessage 함수는 로그인 화면으로 접속할 때와, 로그인 후 결과 화면에서 전부 실행
   * : 로그인 후의 값이 필요하기 때문에 분기문을 통하여 처리
   */
  const get_login_code = async (event) => {
    const data = event.nativeEvent.url;
    console.log('data', data)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>

          <On_boarding />
        </View>
        <Pressable style={{ flex: 0.2 }} onPress={() => handle_login('google')}>
          <Image
            source={btn_google_login}
          />
        </Pressable>
      </View>

      <Login_modal
        uri={uri}
        modal_visible={login_modal}
        modal_close={() => set_login_modal(false)}
        login_method={login_method}
        on_message={event => get_login_code(event)}
      />
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