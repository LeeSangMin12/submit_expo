import { useEffect, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'

import { exec_request } from "@/shared/js/api";
import { set_store_info } from '@/shared/js/common_function';
import COLORS from '@/shared/js/colors';
import { Custom_text_input, Design_chip } from '@/components/components';

const Add_semester = ({ navigation }) => {
  const [semester_name, set_semester_name] = useState('')
  const [semester_list, set_semester_list] = useState([]);
  const [selected_semester, set_selected_semester] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="chevron-back"
          size={35}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />),
      headerRight: () => (
        <Design_chip
          title='완료'
          background_color={COLORS.primary_500}
          container_style={{
            paddingHorizontal: 14,
            paddingVertical: 9,
            borderRadius: 50,
          }}
          on_press={submit_semester}
        />)
    });
  }, [navigation, semester_name, selected_semester]);

  useEffect(() => {
    const semester_list = make_semester_list();
    set_semester_list([...semester_list]);
    set_selected_semester(semester_list[3].value);  //현재 년도의 1학기
  }, []);

  /**
   * 학기 리스트를 생성
   */
  const make_semester_list = () => {
    let now_year = String(new Date().getFullYear());
    let year_arr = [];

    for (let i = Number(now_year); i >= 2010; i--) {
      year_arr.push(i);
    }

    const make_semester_list = year_arr.flatMap((year) => [
      {
        label: `${year}년 겨울학기`,
        value: `${year}년 겨울학기`
      },
      {
        label: `${year}년 2학기`,
        value: `${year}년 2학기`
      },
      {
        label: `${year}년 여름학기`,
        value: `${year}년 여름학기`
      },
      {
        label: `${year}년 1학기`,
        value: `${year}년 1학기`
      },
    ]);

    return make_semester_list;
  }

  /**
   * 학기 정보를 전송
   */
  const submit_semester = async () => {
    if (semester_name === '') {
      Alert.alert('캘린더 이름을 설정해주세요.');
      return;
    }

    const add_semester = api_semester_add_semester();
    if (add_semester) {
      const semesters = await api_semester_get_semester_list();

      set_store_info('semester', 'semester_list', semesters);
      navigation.goBack();
    }
  };

  /**
   * 캘린더를 추가해준다.
   */
  const api_semester_add_semester = async () => {
    const params = {
      url: 'semester/add_semester',
      semester_name: semester_name,
      semester: selected_semester,
      default_semester: 'false'
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  /**
   * 캘린더 리스트를 조회해온다.
   */
  const api_semester_get_semester_list = async () => {
    const params = {
      url: 'semester/get_semester_list'
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data.semester_list;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        <Custom_text_input
          style={styles.input}
          placeholder='캘린더 이름'
          value={semester_name}
          onChangeText={(label) => set_semester_name(label)} />
      </View>

      <View>
        <Picker
          selectedValue={selected_semester}
          onValueChange={(semester) => set_selected_semester(semester)}
        >
          {semester_list.map((val, idx) =>
            <Picker.Item label={val.label} value={val.value} key={idx} />
          )}
        </Picker>
      </View>
    </View >
  );
};

export default Add_semester;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input_container: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
});