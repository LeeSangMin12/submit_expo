/**
 * @todo button disabled 동적으로 설정
 * @todo 설정시 progress bar 증가시키기
 * @todo dropdown 동적으로 생성하기
 * @todo dropdown data 밖으로 빼기
 * @todo autocomplete 2개 구현
 */
import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, KeyboardAvoidingView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@rneui/themed';

import Set_basic from '@/components/setting/Set_basic';
import Set_university from '@/components/setting/Set_university';
import Set_nickname from '@/components/setting/Set_nickname';
import COLORS from '@/shared/js/colors';
import { Button } from '@/components/components';

const Setting_page = ({ page_count, set_page_count }) => {
  const {
    name,
    age,
    gender,
    university,
    department,
    admission_year,
    nickname
  } = useSelector((state) => state.user);
  const [progress, set_progress] = useState(0.3);
  const [btn_next_disabled, set_btn_next_disabled] = useState(true);

  /**
   * button disabled 상태 업데이트
   */
  useEffect(() => {
    set_btn_next_disabled(check_set_info());
  }, [name, age, gender]);

  /**
   * 유저가 모든 정보 입력시 버튼 disabled를 풀어줌.
   */
  const check_set_info = () => {
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
   * 다음으로 버튼 클릭시 다음 세팅 페이지로 넘어감
   */
  const handle_press = () => {
    set_page_count(page_count + 1);
  };

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
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1 }}>

          {
            page_count === 1 ? <Set_basic name={name} age={age} gender={gender} /> :
              page_count === 2 ? <Set_university university={university} department={department} admission_year={admission_year} /> :
                page_count === 3 ? <Set_nickname nickname={nickname} /> : null
          }

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.btn_next_container}>
        <Button
          title="다음으로"
          style={styles.btn_next}
          on_press={handle_press}
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
    paddingVertical: 10,
  },
  btn_next: {
    height: 56,
  }
});