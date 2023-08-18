import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'


import { async_storage_remove_data } from "@/shared/js/common_function.js";
import { Custom_text, Button, Custom_modal } from "@/components/components";
import COLORS from '@/shared/js/colors';

const User_setting = () => {
  const navigation = useNavigation();

  const [log_out_modal, set_log_out_modal] = useState(false);

  const Modal_log_out = () => {
    return (
      <>
        <Custom_text style={styles.Modal_log_out.title}>로그아웃 하시겠습니까?</Custom_text>
        <View style={styles.Modal_log_out.button_container}>
          <Button
            title='취소'
            on_press={() => set_log_out_modal(false)}
            style={styles.Modal_log_out.btn_cancel} />
          <Button
            title='로그아웃'
            on_press={async () => {
              await async_storage_remove_data('token');
              navigation.navigate('Login_page');
            }}
            style={styles.Modal_log_out.btn_logout} />
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.setting_container}>
        <Custom_text style={styles.setting_container.title}>정보 및 설정</Custom_text>
        <Pressable style={styles.setting_container.sub_title_container} onPress={() => navigation.navigate('Login_info_page')}>
          <Custom_text style={styles.setting_container.sub_title}>로그인 정보</Custom_text>
          <Ionicons
            name="chevron-forward"
            size={25}
            color={COLORS.gray_500}
          />
        </Pressable>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Custom_text style={styles.setting_container.title}>공지 및 서비스 정보</Custom_text>
        <Pressable style={styles.setting_container.sub_title_container}>
          <Custom_text style={styles.setting_container.sub_title}>공지사항</Custom_text>
          <Ionicons name="chevron-forward" size={25} color={COLORS.gray_500} />
        </Pressable>
        <Pressable style={styles.setting_container.sub_title_container}>
          <Custom_text style={styles.setting_container.sub_title}>이용약관</Custom_text>
          <Ionicons name="chevron-forward" size={25} color={COLORS.gray_500} />
        </Pressable>
        <Pressable style={styles.setting_container.sub_title_container}>
          <Custom_text style={styles.setting_container.sub_title}>개인정보 처리방침</Custom_text>
          <Ionicons name="chevron-forward" size={25} color={COLORS.gray_500} />
        </Pressable>
        <Pressable style={styles.setting_container.sub_title_container}>
          <Custom_text style={styles.setting_container.sub_title}>오픈소스 라이센스</Custom_text>
          <Ionicons name="chevron-forward" size={25} color={COLORS.gray_500} />
        </Pressable>
        <Pressable style={styles.setting_container.sub_title_container}>
          <Custom_text style={styles.setting_container.sub_title}>버전정보</Custom_text>
          <Custom_text style={{ fontSize: 16 }}>V.2.1</Custom_text>
        </Pressable>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Custom_text style={styles.setting_container.title}>문의 및 지원</Custom_text>
        <Pressable style={styles.setting_container.sub_title_container}>
          <Custom_text style={styles.setting_container.sub_title}>카카오톡 문의</Custom_text>
          <Ionicons name="chevron-forward" size={25} color={COLORS.gray_500} />
        </Pressable>
      </View>

      <Custom_modal
        modal_visible={log_out_modal}
        position='center'
        content_component={() => <Modal_log_out />}
      />
    </>
  );
};

export default User_setting;

const styles = StyleSheet.create({
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
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
  Modal_log_out: {
    title: {
      marginBottom: 15,
      fontSize: 17,
      fontFamily: 'bold',
      textAlign: 'center',
    },
    button_container: {
      flexDirection: 'row'
    },
    btn_cancel: {
      margin: 10,
      height: 45,
      backgroundColor: 'gray'
    },
    btn_logout: {
      margin: 10,
      height: 45,
    }
  }
});