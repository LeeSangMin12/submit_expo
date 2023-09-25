import { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, StatusBar, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons'
import { FAB } from '@rneui/themed';

import { exec_request, exec_request_multipart } from '@/shared/js/api';
import { set_store_info, show_toast, do_once, kor_iso_string } from '@/shared/js/common_function';
import { Custom_text, Custom_text_input, Date_time_picker, File_select } from '@/components/components';
import COLORS from '@/shared/js/colors';

const Edit_assignment = ({ navigation, route }) => {
  const { default_semester_id } = useSelector((state) => state.semester);

  const [assignment_input, set_assignment_input] = useState({
    assignment_id: '',
    completion_status: '',
    registration_date: new Date(),
    assignment_name: '',
    professor_name: '',
    assignment_description: '',
    file_list: [],
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Feather
            name="x"
            size={30}
            color="white"
          />
        </Pressable>),
      headerRight: () => (
        <Pressable onPress={do_once(edit_assignment)}>
          <Feather
            name="check"
            size={30}
            color="white"
          />
        </Pressable>)
    });
  }, [navigation, assignment_input]);

  useEffect(() => {
    const fetch_data = async () => {
      const assignment_info = await api_assignment_get_assignment(route.params.assignment_id);
      set_assignment_input({
        assignment_id: route.params.assignment_id,
        completion_status: assignment_info.completion_status,
        registration_date: new Date(assignment_info.registration_date),
        assignment_name: assignment_info.assignment_name,
        professor_name: assignment_info.professor_name,
        assignment_description: assignment_info.assignment_description,
        file_list: assignment_info.file_list,
      });
    }
    fetch_data();
  }, []);

  const edit_assignment = async () => {
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

    await api_assignment_edit_assignment();

    const assignment_list = await api_assignment_get_assignment_list();

    set_store_info('assignment', 'assignment_list', assignment_list);
    navigation.navigate('Bottom_navigation', { screen: '홈' });
    show_toast('과제가 수정되었습니다.');
  };

  const delete_assignment = () => {
    Alert.alert('삭제하시겠습니까?', '삭제후 되돌릴 수 없습니다', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제', onPress: async () => {
          const delete_assignment = await api_assignment_delete_assignment();
          if (delete_assignment) {
            const assignment_list = await api_assignment_get_assignment_list();

            set_store_info('assignment', 'assignment_list', assignment_list);
            navigation.navigate('Bottom_navigation', { screen: '홈' });
          }
        }
      }
    ]);
  };

  const api_assignment_edit_assignment = async () => {
    const form_data = new FormData();
    form_data.append('assignment_id', assignment_input.assignment_id);
    form_data.append('semester_id', default_semester_id);
    form_data.append('completion_status', assignment_input.completion_status);
    form_data.append('registration_date', kor_iso_string(assignment_input.registration_date));
    form_data.append('assignment_name', assignment_input.assignment_name);
    form_data.append('professor_name', assignment_input.professor_name);
    form_data.append('assignment_description', assignment_input.assignment_description);
    Array.from(assignment_input.file_list).forEach((file) => {
      form_data.append('file_list', file);
    });

    const params = {
      url: "assignment/edit_assignment",
      form_data: form_data
    };

    const result = await exec_request_multipart(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  const api_assignment_get_assignment = async (assignment_id) => {
    const params = {
      url: 'assignment/get_assignment',
      assignment_id: assignment_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  const api_assignment_delete_assignment = async () => {
    const params = {
      url: 'assignment/delete_assignment',
      assignment_id: assignment_input.assignment_id,
    };

    const result = await exec_request(params, navigation);

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
        {/* FAB 요소 가림방지 */}
        <View style={{ marginBottom: 300 }} />
      </ScrollView>
      <FAB
        visible={true}
        onPress={() => {
          delete_assignment();
        }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        icon={{ name: 'delete', color: 'white' }}
        color="#FF5454"
      />
    </KeyboardAvoidingView >
  )
};

export default Edit_assignment;

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
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
});