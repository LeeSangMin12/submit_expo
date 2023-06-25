import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { exec_request } from '@/shared/js/api';
import Set_basic from '@/components/setting/Set_basic';
import Set_university from '@/components/setting/Set_university';
import Set_nickname from '@/components/setting/Set_nickname';
import COLORS from '@/shared/js/colors';
import { Button } from '@/components/components';

const Setting_page = ({ page_count, set_page_count, }) => {
  const navigation = useNavigation();
  const {
    name,
    age,
    gender,
    university,
    department,
    admission_year,
    nickname
  } = useSelector((state) => state.user);
  const [progress, set_progress] = useState(0);
  const [btn_next_disabled, set_btn_next_disabled] = useState(true);
  const [err_nickname, set_err_nickname] = useState('');

  /**
   * progress bar 업데이트
   * : 데이터 입력시 progress bar 증가
   */
  useEffect(() => {
    const input_data = [name, age, gender, university, department, admission_year, nickname];
    const filled_data_count = input_data.filter(item => item).length;
    const progress = filled_data_count / input_data.length;
    set_progress(progress);
  }, [name, age, gender, university, department, admission_year, nickname]);

  /**
   * button disabled 상태 업데이트
   */
  useEffect(() => {
    set_btn_next_disabled(check_btn_next_disabled());
  }, [page_count, name, age, gender, university, department, admission_year, nickname]);

  /**
   * 유저가 모든 데이터를 입력했는지 확인 후 disabled 풀어줌
   */
  const check_btn_next_disabled = () => {
    if (page_count === 1 && name && age && gender) {
      return false;
    } else if (page_count === 2 && university && department && admission_year) {
      return false;
    } else if (page_count === 3 && nickname) {
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
    if (page_count === 3 && await check_nickname()) {
      if (await api_user_initial_setting()) {  //유저정보 저장 성공
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
    if (nickname.length < 2) {
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
      nickname: nickname
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
      name,
      age,
      gender,
      university,
      department,
      admission_year,
      nickname,
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
            page_count === 1 ? <Set_basic name={name} age={age} gender={gender} /> :
              page_count === 2 ? <Set_university university={university} department={department} admission_year={admission_year} /> :
                page_count === 3 ? <Set_nickname nickname={nickname} err_nickname={err_nickname} /> : null
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