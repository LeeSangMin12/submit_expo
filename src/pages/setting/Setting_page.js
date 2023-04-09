import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { LinearProgress } from '@rneui/themed';

import { Button, Chip } from '@/components/index';
import COLORS from '../../shared/js/colors';

const progress = 0.2;

const Setting_page = () => {
  const [state, setState] = useState({
    name: '',
    age: '',
    gender: ''
  });

  /**
   * Chip 컴포넌트 클릭 시, 선택된 성별 값 업데이트
   * @param {string} label - 선택한 Chip의 라벨 값
   */
  const handle_chip_press = (label) => {
    setState({ ...state, gender: (label === state.gender ? '' : label) });
  };

  /**
   * 
   */
  const handle_press = () => {
    console.log('hi');
  }

  return (
    <View style={styles.container}>

      <View style={styles.progress_container}>
        <LinearProgress
          style={styles.linear_progress}
          value={progress}
          color={COLORS.primary_500} />
      </View>

      <ScrollView>
        <View style={styles.input_container}>
          <Text style={styles.label}>이름</Text>
          <TextInput style={styles.input} placeholder='이름을 입력해주세요' />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.label}>나이</Text>
          <TextInput keyboardType='number-pad' returnKeyType="done" style={styles.input} placeholder='나이를 선택해주세요' />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.label}>성별을 선택해주세요</Text>
          <View style={styles.button_container}>
            <Chip
              label="남성"
              selected={state.gender === 'male'}
              on_press={() => handle_chip_press('male')}
            />
            <Chip
              label="여성"
              selected={state.gender === 'female'}
              on_press={() => handle_chip_press('female')}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.btn_next_container}>
        <Button title="다음으로" style={styles.btn_next} on_press={handle_press}></Button>
      </View>

    </View>
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