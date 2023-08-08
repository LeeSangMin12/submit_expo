import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { async_storage_remove_data } from "@/shared/js/common_function.js";
import { Button, Custom_modal } from "@/components/components";
import COLORS from '@/shared/js/colors';

const User_setting = () => {
  const navigation = useNavigation();

  const [log_out_modal, set_log_out_modal] = useState(false);

  const Modal_log_out = () => {
    return (
      <>
        <Text style={styles.Modal_log_out.title}>로그아웃 하시겠습니까?</Text>
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
        <Text style={styles.setting_text}>공지사항</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>이벤트</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>이용약관</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>운영정책</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>자주 묻는 질문</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>개인정보 처리방침</Text>
      </View>
      <View style={styles.divider} />

      <Pressable onPress={() => set_log_out_modal(true)}>
        <View style={styles.setting_container}>
          <Text style={styles.setting_text}>로그아웃</Text>
        </View>
      </Pressable>
      <View style={styles.divider} />

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
    padding: 25,
    justifyContent: 'center',
  },
  setting_text: {
    fontWeight: 'bold',
    fontSize: 16
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_480
  },
  Modal_log_out: {
    title: {
      marginBottom: 15,
      fontSize: 17,
      fontWeight: 'bold',
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