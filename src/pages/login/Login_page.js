import { useEffect, useState } from "react";
import { View, Image, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { exec_login, check_exp_token } from "@/shared/js/api";
import Login_modal from "@/pages/login/login_modal/Login_modal";
import { REDIRECT_URI, GOOGLE_AUTH_URL } from "@/config/config";
import On_boarding from "@/pages/login/onboarding/Onboarding";
import btn_google_login from "@/assets/img/login/btn_google_login.png";

const Login_page = () => {
  const navigation = useNavigation();

  const [login_modal, set_login_modal] = useState(false);
  const [login_method, set_login_method] = useState('');
  const [uri, set_uri] = useState('');

  useEffect(() => {
    auto_login();
  }, []);

  /**
   * 자동로그인
   * : 엑세스 토큰이 있을 경우만, 토큰 검증 후 홈화면으로 이동
   */
  const auto_login = async () => {
    const IS_AUTO_LOGIN = true;
    const token = await check_exp_token(IS_AUTO_LOGIN);

    if (token !== 'token_expired') {  //토큰이 존재할 경우
      navigation.navigate('Bottom_navigation', { screen: '홈' });
    }
  }

  const handle_login = (login_method) => {
    if (login_method === 'google') {
      set_login_method('google');
      set_uri(GOOGLE_AUTH_URL);
      set_login_modal(true);
    }
  };

  /**
   * 웹 뷰에서 응답 받은 결과를 핸들링
   * : on_message 함수는 로그인 화면으로 접속할 때와, 로그인 후 결과 화면에서 전부 실행
   * : 로그인 후의 값이 필요하기 때문에 분기문을 통하여 처리
   */
  const get_login_code = async (event) => {
    const url = event.nativeEvent.url;
    if (url.startsWith(REDIRECT_URI) === false) return; //로그인 후 결과하면이 아닌 경우 

    const extract_code_from_url = () => {
      const start_index = url.indexOf("code=") + 5;
      const end_indx = url.indexOf("&", start_index);
      return url.substring(start_index, end_indx);
    }
    const code = extract_code_from_url(url);
    api_login_google(code);
  };

  /**
  * 구글 로그인
  */
  const api_login_google = async (authorization_code) => {
    const params = {
      url: 'login/google',
      authorization_code: authorization_code,
    };

    const result = await exec_login(params);

    if (result.registered === "false") {
      set_login_modal(false);
      navigation.navigate('회원가입');
    } else {
      set_login_modal(false);
      navigation.navigate('Bottom_navigation', { screen: '홈' });
    }
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