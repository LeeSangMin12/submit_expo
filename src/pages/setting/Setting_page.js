import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
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
  const [progress, set_progress] = useState(0);
  const [btn_next_disabled, set_btn_next_disabled] = useState(true);

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
                page_count === 3 ? <Set_nickname nickname={nickname} /> : null
          }

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.btn_next_container}>
        <Button
          title="다음으로"
          style={styles.btn_next}
          on_press={() => set_page_count(page_count + 1)}
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