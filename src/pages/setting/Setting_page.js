import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { exec_request } from '@/shared/js/api';
import COLORS from '@/shared/js/colors';
import { Button } from '@/components/components';
import Set_basic from '@/components/setting/Set_basic';
import Set_university from '@/components/setting/Set_university';
import Set_nickname from '@/components/setting/Set_nickname';

const Setting_page = ({
  page_count,
  set_page_count
}) => {
  const navigation = useNavigation();

  const [user_input, set_user_input] = useState({
    name: '',
    age: '',
    gender: '',
    university: '',
    department: '',
    admission_year: '',
    nickname: '',
  });
  const [progress, set_progress] = useState(0);
  const [btn_next_disabled, set_btn_next_disabled] = useState(true);
  const [err_nickname, set_err_nickname] = useState('');

  /**
   * progress bar 업데이트
   * : 데이터 입력시 progress bar 증가
   */
  useEffect(() => {
    const input_data = [user_input.name, user_input.age, user_input.gender, user_input.university, user_input.department, user_input.admission_year, user_input.nickname];
    const filled_data_count = input_data.filter(item => item).length;
    const progress = filled_data_count / input_data.length;
    set_progress(progress);
  }, [user_input.name, user_input.age, user_input.gender, user_input.university, user_input.department, user_input.admission_year, user_input.nickname]);

  /**
   * button disabled 상태 업데이트
   */
  useEffect(() => {
    set_btn_next_disabled(check_btn_next_disabled());
  }, [user_input.page_count, user_input.name, user_input.age, user_input.gender, user_input.university, user_input.department, user_input.admission_year, user_input.nickname]);

  /**
   * 유저가 모든 데이터를 입력했는지 확인 후 disabled 풀어줌
   */
  const check_btn_next_disabled = () => {
    if (page_count === 1 && user_input.name && user_input.age && user_input.gender) {
      return false;
    } else if (page_count === 2 && user_input.university && user_input.department && user_input.admission_year) {
      return false;
    } else if (page_count === 3 && user_input.nickname) {
      return false;
    }
    return true;
  };

  /**
   * 값이 비어있지 않을시 세팅페이지 넘어감
   * : 마지막 페이지에선 
   * : 1. 닉네임 검사
   * : 2. 유저 초기 정보 서버 전송
   * : 후 홈화면으로 이동
   */
  const handle_page_count = async () => {
    if (page_count === 3) {
      if (await check_nickname() === false) return;

      if (await api_user_initial_setting()) {  //유저정보 저장 성공
        set_page_count(1);
        navigation.navigate('Bottom_navigation', { screen: '홈' });
      }
      return false;
    }

    set_page_count(page_count + 1);
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
   * 유저 초기 정보 저장
   */
  const api_user_initial_setting = async () => {
    const params = {
      url: "user/initial_setting",
      name: user_input.name,
      age: user_input.age,
      gender: user_input.gender,
      university: user_input.university,
      department: user_input.department,
      admission_year: user_input.admission_year,
      nickname: user_input.nickname,
      img_url: ''  //처음에 설정하지 않기에 빈값으로 보냄.
    };

    const result = await exec_request(params, navigation);

    if (result.status === "ok") {
      return true;
    } else {  //중복닉네임 존재
      console.log('err');
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.progress_container}>
        <LinearProgress
          style={styles.linear_progress}
          value={progress}
          color={COLORS.primary_500}
          animation={{ duration: 700 }}
          variant='determine' />
      </View>

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

          {
            page_count === 1 ? <Set_basic name={user_input.name} age={user_input.age} gender={user_input.gender} set_value={set_user_input} /> :
              page_count === 2 ? <Set_university admission_year={user_input.admission_year} set_value={set_user_input} /> :
                page_count === 3 ? <Set_nickname nickname={user_input.nickname} err_nickname={err_nickname} set_value={set_user_input} /> : null
          }

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.btn_next_container}>
        <Button
          title="다음으로"
          style={styles.btn_next}
          on_press={handle_page_count}
          disabled={btn_next_disabled} />
      </View>
    </View >
  );
}

export default Setting_page;

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
  btn_next_container: {
    paddingVertical: 30,
  },
  btn_next: {
    height: 56,
  }
});