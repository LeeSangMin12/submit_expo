import { useSelector } from 'react-redux';
import { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { exec_request } from "@/shared/js/api";
import COLORS from '@/shared/js/colors';
import { Button } from '@/components/components';
import Set_nickname from '@/components/setting/Set_nickname';
import Set_image from '@/components/setting/Set_image';

const Edit_profile = () => {
  const navigation = useNavigation();
  const {
    img_url,
    nickname,
  } = useSelector((state) => state.user);

  const [user_input, set_user_input] = useState({
    img_url: img_url,
    nickname: nickname,
  });
  const [err_nickname, set_err_nickname] = useState('');

  /**
   * 닉네임 검사 후 유저 정보를 수정
   */
  const edit_user_info = async () => {
    if (await check_nickname()) {
      console.log('이 닉네임은 정상이네요.');
    }
  }

  /**
   * nickname 값이 올바른지 검사
   */
  const check_nickname = async () => {
    if (user_input.nickname.length < 2) {
      set_err_nickname('2글자 이상 입력해주세요.');
      return false;
    } else if (!await api_check_duplicate_check_nickname()) {
      set_err_nickname('중복된 닉네임입니다.');
      return false;
    } else {
      return true;
    }
  }

  /**
   * 유저 닉네임 검사
   */
  const api_check_duplicate_check_nickname = async () => {
    const params = {
      url: "check/duplicate_check_nickname",
      nickname: user_input.nickname
    };

    const result = await exec_request(params, navigation);

    if (result.status === "ok") {  //중복닉네임 없음
      return true;
    } else {  //중복닉네임 존재
      return false;
    }
  }

  /**
   * 유저 정보 수정
   */
  const api_user_edit_info = async () => {
    const params = {
      url: "user/edit_info",
      img_url: user_input.img_url,
      nickname: user_input.nickname
    };

    const result = await exec_request(params, navigation);
  }

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
            <Set_nickname nickname={user_input.nickname} err_nickname={err_nickname} set_value={set_user_input} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.btn_next_container}>
        <Button
          title="완료하기"
          style={styles.btn_next}
          on_press={edit_user_info}
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