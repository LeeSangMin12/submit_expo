import { Modal, StyleSheet, View, Text, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons'

import COLORS from '@/shared/js/colors';

const SCRAPE_URL =
  '(function() {{window.ReactNativeWebView.postMessage((`document.URL`));}})();';

/**
 * modal 생성
 * @param {obj} modal_visible - modal 표시 여부
 * @param {component} content_component - modal안에 들어갈 component값
 */
const Login_modal = ({ uri, modal_visible, modal_close, login_method, on_message }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal_visible}>
      <View style={styles.bottom_view.container}>
        <MaterialIcons
          name="cancel"
          size={32}
          color="gray"
          onPress={() => {
            modal_close()
          }}
          style={{
            marginVertical: 5,
            marginLeft: 10,
          }}
        />

        <WebView
          source={{ uri: uri }}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          originWhitelist={['*']}
          /* ********************************************** */
          // 해당 props를 아래의 방식으로 주면,
          // 소셜 로그인 시 자동 로그인이 되지 않음.
          cacheMode={'LOAD_NO_CACHE'}
          cacheEnabled={false}
          incognito={true}
          /* ********************************************** */
          // 웹 뷰가 열릴 때 실행 될 script
          // postMessage로 데이터를 보냅니다.
          injectedJavaScript={SCRAPE_URL}
          // 웹뷰에서 보내는 데이터를 받습니다.
          onMessage={(e) => on_message(e)}
          // google 로그인 일 경우, 디바이스에서 웹 뷰 방식으로 로그인 하는 것을 막았기 때문에,
          // 로그인 방식이 google 일 경우에만 userAgent를 설정해줍니다.
          // expo GoogleSignIn 라이브러리를 통하여 userAgent 조작 없이 로그인 가능.
          userAgent={
            login_method === 'google'
              ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
              : undefined
          }
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottom_view: {
    container: {
      flex: 1,
      height: '90%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: COLORS.gray_500,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  },
});

export default Login_modal;