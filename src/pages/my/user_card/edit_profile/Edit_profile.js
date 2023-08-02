import { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { exec_request, exec_request_multipart } from "@/shared/js/api";
import { set_store_info } from '@/shared/js/common';
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

    //닉네임을 변갱했을때만 중복 닉네임 검사
    const verify_nickname = (nickname !== user_input.nickname) ? await check_nickname() : true;

    if (verify_nickname) {
      const edit_info = await api_user_edit_info();
      if (edit_info === true) {
        const user_data = await api_user_get_info();
        set_user_info(user_data);
        navigation.navigate('Bottom_navigation', { screen: '마이' });
      }
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
  * redux안에 유저 정보를 넣어준다.
  */
  const set_user_info = (user_data) => {
    set_store_info('user', 'nickname', user_data.nickname);
    set_store_info('user', 'img_url', user_data.img_url);
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
    const form_data = new FormData();
    form_data.append('img_url', user_input.img_url);
    form_data.append('nickname', user_input.nickname);

    const params = {
      url: "user/edit_info",
      form_data: form_data,
    };

    const result = await exec_request_multipart(params, navigation);

    if (result.status === "ok") {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 유저 정보 가져옴
   */
  const api_user_get_info = async () => {
    const params = {
      url: 'user/get_info',
    };

    const result = await exec_request(params);

    if (result.status === 'ok') {
      return result.data;
    }
  };

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