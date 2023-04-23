import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import Custom_modal from "@/components/ui/Custom_modal";
import { Button } from '@/components/components';
import COLORS from '@/shared/js/colors';


const User_setting = () => {
  const [log_out_modal, set_log_out_modal] = useState(false);

  return (
    <>
      <Custom_modal
        title='로그아웃 하시겠습니까?'
        control_modal={{
          modal_visible: log_out_modal,
          set_modal_visible: set_log_out_modal
        }}
        btn_1={{
          title: '뒤로가기',
          on_press: () => set_log_out_modal(false)
        }}
        btn_2={{
          title: '로그아웃',
          on_press: () => console.log('logout')
        }}
      />

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
  }
});