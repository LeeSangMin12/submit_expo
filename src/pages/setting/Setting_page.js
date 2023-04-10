import { useState, } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@rneui/themed';

import Set_basic from '@/components/setting/Set_basic';
import Set_university from '@/components/setting/Set_university';
import Set_nickname from '@/components/setting/Set_nickname';
import COLORS from '@/shared/js/colors';
import { Button } from '@/components/components';

const Setting_page = () => {
  const {
    name,
    age,
    gender,
    nickname
  } = useSelector((state) => state.user);
  const [state, setState] = useState({
    progress: 0,
  });
  const btn_next_disabled = (name === '' || age === '' || gender === '');

  /**
   * 다음으로 버튼 클릭시 다음 세팅 페이지로 넘어감
   */
  const handle_press = () => {
    console.log('안녕');
  }

  return (
    <View style={styles.container}>

      <View style={styles.progress_container}>
        <LinearProgress
          style={styles.linear_progress}
          value={state.progress}
          color={COLORS.primary_500}
          variant='determine' />
      </View>

      <ScrollView>
        {/* <Set_basic name={name} age={age} gender={gender} /> */}
        {/* <Set_university /> */}
        <Set_nickname nickname={nickname} />
      </ScrollView>

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
  input_container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 17,
  },
  input: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  button_container: {
    flexDirection: 'row',
  },
  btn_next_container: {
    paddingVertical: 10,
  },
  btn_next: {
    height: 56,
  }
});