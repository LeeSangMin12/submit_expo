import { useSelector } from 'react-redux';
import { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';

import { exec_request } from "@/shared/js/api";
import COLORS from '@/shared/js/colors';
import { Button } from '@/components/components';
import Set_nickname from '@/components/setting/Set_nickname';
import Set_image from '@/components/setting/Set_image';

const Edit_profile = () => {
  const {
    img_url,
    nickname,
  } = useSelector((state) => state.user);

  const [user_input, set_user_input] = useState({
    img_url: img_url,
    nickname: nickname,
  });


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="safe"
          contentContainerStyle={{ flexGrow: 1 }}>

          <Set_image img_url={user_input.img_url} set_value={set_user_input} />

          <View style={styles.set_nickname_container}>
            <Set_nickname nickname={user_input.nickname} set_value={set_user_input} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.btn_next_container}>
        <Button
          title="완료하기"
          style={styles.btn_next}
        // on_press={() => set_page_count(page_count + 1)}
        // disabled={btn_next_disabled} 
        />
      </View>
    </View >
  );
};

export default Edit_profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  progress_container: {
    alignItems: 'center',
  },
  linear_progress: {
    width: '90%',
    backgroundColor: COLORS.gray_490_inactive,
    height: 8,
    borderRadius: 4,
    marginVertical: 20
  },
  set_nickname_container: {
    marginTop: 0
  },
  btn_next_container: {
    paddingVertical: 30,
  },
  btn_next: {
    height: 56,
  }
});