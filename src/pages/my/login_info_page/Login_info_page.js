import { useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';

import { async_storage_remove_data } from "@/shared/js/common_function.js";
import { Custom_text, Custom_modal } from "@/components/components";
import COLORS from '@/shared/js/colors';
import google_logo from '@/assets/img/logo/google_logo.png';

const Login_info_page = ({ navigation }) => {
  const { user_email } = useSelector((state) => state.user);

  const [log_out_modal, set_log_out_modal] = useState(false);

  const Modal_log_out = () => {
    return (
      <>
        <Custom_text style={styles.modal_log_out.title}>로그아웃</Custom_text>
        <Custom_text style={styles.modal_log_out.sub_title}>정말 로그아웃 하시겠나요?</Custom_text>

        <Pressable
          onPress={async () => {
            await async_storage_remove_data('token');
            navigation.navigate('Login_page');
          }}
          style={[styles.modal_log_out.button_container, { backgroundColor: COLORS.primary_500, marginBottom: 6 }]}>
          <Custom_text style={{ fontFamily: 'bold', color: COLORS.white }}>로그아웃</Custom_text>
        </Pressable>

        <Pressable
          onPress={() => set_log_out_modal(false)}
          style={[styles.modal_log_out.button_container, { backgroundColor: COLORS.white_500 }]}>
          <Custom_text style={{ fontFamily: 'bold', color: COLORS.black_500 }}>닫기</Custom_text>
        </Pressable >
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Custom_text style={{ fontSize: 12 }}>로그인 계정</Custom_text>

        <View style={styles.login_account_contianer}>
          <Image source={google_logo} style={styles.login_account_contianer.google_img} />
          <Custom_text style={{ fontSize: 16 }}>{user_email}</Custom_text>
        </View>
      </View>

      <Pressable
        onPress={() => set_log_out_modal(true)}
        style={styles.setting_container.sub_title_container}>
        <Custom_text style={styles.setting_container.sub_title}>로그아웃</Custom_text>
        <Ionicons name="chevron-forward" size={25} color={COLORS.gray_500} />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Withdrawal_page')}
        style={styles.setting_container.sub_title_container}>
        <Custom_text style={styles.setting_container.sub_title}>탈퇴하기</Custom_text>
        <Ionicons name="chevron-forward" size={25} color={COLORS.gray_500} />
      </Pressable>

      <Custom_modal
        modal_visible={log_out_modal}
        position='center'
        content_component={() => <Modal_log_out />}
      />
    </View >
  );
}

export default Login_info_page;

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
    paddingHorizontal: 20,
  },
  setting_container: {
    paddingHorizontal: 20,
    paddingTop: 22,
    title: {
      fontSize: 18,
      fontFamily: 'semi_bold'
    },
    sub_title_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

    },
    sub_title: {
      fontSize: 16,
      paddingVertical: 20
    }
  },
  login_account_contianer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: 50,
    marginTop: 13,
    marginBottom: 20,
    position: 'relative',
    google_img: {
      position: 'absolute',
      left: 40,
      width: 24,
      height: 24
    },
  },
  modal_log_out: {
    title: {
      fontSize: 16,
      marginBottom: 4,
    },
    sub_title: {
      fontSize: 14,
      marginBottom: 30
    },
    button_container: {
      width: 250,
      height: 30,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.gray_490_inactive
    }
  }
});