import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, StatusBar, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons'

import { exec_request, exec_request_multipart } from '@/shared/js/api';
import { set_store_info, show_toast, do_once, kor_iso_string } from '@/shared/js/common_function';
import { Custom_text, Custom_text_input, Date_time_picker, File_select } from '@/components/components';
import COLORS from '@/shared/js/colors';

const Add_assignment = ({ navigation, route }) => {
  const { default_semester_id } = useSelector((state) => state.semester);

  const [assignment_input, set_assignment_input] = useState({
    registration_date: new Date(route.params?.selected_date ?? new Date()),  //캘린더 날짜 클릭 후 과제 등록시 selected_date값 들어옴
    assignment_name: '',
    professor_name: '',
    assignment_description: '',
    file_list: [],
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate('Bottom_navigation', { screen: '홈' })}>
          <Feather
            name="x"
            size={30}
            color="white"
          />
        </Pressable>),
      headerRight: () => (
        <Pressable onPress={do_once(add_assignment)}>
          <Feather
            name="check"
            size={30}
            color="white"
          />
        </Pressable>)
    });
  }, [navigation, assignment_input]);

  const add_assignment = async () => {
    const { professor_name, assignment_description, file_list, ...rest } = assignment_input;  //파일빼고 나머지 값 비어있는지 확인
    const any_empty = Object.values(rest).some((value) => value === '');
    if (any_empty) {
      Alert.alert('내용을 입력하세요.');
      return;
    }

    const total_file_size = file_list.reduce((total, file) => total + file.size, 0);
    if (52428800 <= total_file_size) {  //50mb보다 많을때
      Alert.alert('파일 용량이 너무 큽니다.');
      return;
    }

    await api_assignment_add_assignment();

    const assignment_list = await api_assignment_get_assignment_list();

    set_store_info('assignment', 'assignment_list', assignment_list);
    navigation.navigate('Bottom_navigation', { screen: '홈' });
    show_toast('과제가 등록되었습니다.');
  };

  const api_assignment_add_assignment = async () => {
    const form_data = new FormData();
    form_data.append('semester_id', default_semester_id);
    form_data.append('completion_status', false);
    form_data.append('registration_date', kor_iso_string(assignment_input.registration_date));
    form_data.append('assignment_name', assignment_input.assignment_name);
    form_data.append('professor_name', assignment_input.professor_name);
    form_data.append('assignment_description', assignment_input.assignment_description);
    Array.from(assignment_input.file_list).forEach((file) => {
      form_data.append('file_list', file);
    });

    const params = {
      url: "assignment/add_assignment",
      form_data: form_data
    };

    const result = await exec_request_multipart(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  const api_assignment_get_assignment_list = async () => {
    const params = {
      url: 'assignment/get_assignment_list',
      semester_id: default_semester_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        style={styles.content_container}
        automaticallyAdjustKeyboardInsets={true}>
        <StatusBar barStyle="light-content" />

        <View style={styles.date_container}>
          <Date_time_picker
            picker_mode='date'
            value={assignment_input.registration_date}
            set_value={(val) => set_assignment_input((prev_state) => {
              return { ...prev_state, registration_date: val }
            })}
            date_title='등록날짜' />
        </View>

        <View style={styles.divider} />

        <View style={{ paddingHorizontal: 20 }}>

          <View style={styles.input_container}>
            <Custom_text style={styles.input_text}>과제명</Custom_text>

            <Custom_text_input
              placeholder='경영학개론'
              placeholderTextColor={COLORS.gray_510}
              style={styles.input}
              value={assignment_input.assignment_name}
              onChangeText={(label) => set_assignment_input((prev_state) => {
                return { ...prev_state, assignment_name: label }
              })}
            />
          </View>

          <View style={styles.input_container}>
            <Custom_text style={styles.input_text}>교수명</Custom_text>

            <Custom_text_input
              placeholder='김정우'
              placeholderTextColor={COLORS.gray_510}
              style={styles.input}
              value={assignment_input.professor_name}

              onChangeText={(label) => set_assignment_input((prev_state) => {
                return { ...prev_state, professor_name: label }
              })}
            />
          </View>

          <View style={styles.input_container}>
            <Custom_text style={styles.input_text}>과제 설명</Custom_text>

            <Custom_text_input
              style={styles.textarea_input}
              multiline
              textAlignVertical="top"
              numberOfLines={4}
              maxLength={100}
              placeholder='5페이지 이상 작성하고 16시까지 제출'
              placeholderTextColor={COLORS.gray_510}
              value={assignment_input.assignment_description}
              onChangeText={(label) => set_assignment_input((prev_state) => {
                return { ...prev_state, assignment_description: label }
              })}
            />
          </View>

          <File_select
            value={assignment_input.file_list}
            set_value={set_assignment_input}
            container_style={styles.file_container}
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView >
  );
};

export default Add_assignment;

const styles = StyleSheet.create({
  content_container: {
    flex: 1,
  },
  date_container: {
    marginVertical: 25,
  },
  input_container: {
    paddingTop: 20,
  },
  input_text: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.gray_510,
    paddingBottom: 12
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_510,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 50
  },
  textarea_input: {
    padding: 10,
    height: 200,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.gray_510,
    borderRadius: 6,
    width: '100%'
  },
  file_container: {
    marginTop: 25,
    marginBottom: 10
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
});