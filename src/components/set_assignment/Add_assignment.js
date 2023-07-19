import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'

import { exec_request_multipart } from '@/shared/js/api';
import COLORS from '@/shared/js/colors';
import { show_toast } from '@/shared/js/common';
import { Date_time_picker, Design_chip, File_select } from '@/components/components';

const Add_assignment = ({ navigation }) => {
  const {
    default_semester_id,
  } = useSelector((state) => state.semester);

  const [assignment_input, set_assignment_input] = useState({
    title: '',
    registration_date: new Date(),
    class_name: '',
    professor_name: '',
    assignment_description: '',
    file_list: [],
  })

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
          on_press={add_assignment}
          container_style={{
            paddingHorizontal: 14,
            paddingVertical: 9,
            borderRadius: 50,
          }}
        />)
    });
  }, [navigation, assignment_input]);

  const select_file = (file) => {
    const new_file = {
      name: file.name,
      size: file.size,
      uri: file.uri
    };

    set_assignment_input((prev_state) => ({
      ...prev_state,
      file_list: [...prev_state.file_list, new_file]
    }));
  };

  const de_select_File = (file_num) => {
    set_assignment_input((prev_state) => ({
      ...prev_state,
      file_list: prev_state.file_list.filter((file, idx) => idx !== file_num)
    }));
  };

  const add_assignment = async () => {
    const { file_list, ...rest } = assignment_input;  //파일빼고 나머지 값 비어있는지 확인
    const any_empty = Object.values(rest).some((value) => value === '');
    if (any_empty) {
      Alert.alert('값이 비어있습니다.');
      return;
    }

    const add_assignment = await api_assignment_add_assignment();

    if (add_assignment) {
      navigation.navigate('Bottom_navigation', { screen: '홈' });
      show_toast('과제가 등록되었습니다.');
    }
  }

  const api_assignment_add_assignment = async () => {
    const form_data = new FormData();

    form_data.append('semester_id', default_semester_id);
    form_data.append('status', '예정');
    form_data.append('completion_status', false);
    form_data.append('title', assignment_input.title);
    form_data.append('registration_date', assignment_input.registration_date.toLocaleDateString("ko-KR"));
    form_data.append('class_name', assignment_input.class_name);
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
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        style={styles.content_container}
        automaticallyAdjustKeyboardInsets={true}>

        <View style={styles.input_container}>
          <TextInput
            style={[styles.input, { fontSize: 20 }]}
            placeholder='과제 제목'
            placeholderTextColor={COLORS.gray_500}
            value={assignment_input.title}
            onChangeText={(label) => set_assignment_input((prev_state) => {
              return { ...prev_state, title: label }
            })}
          />
        </View>

        <View style={styles.input_container}>
          <Date_time_picker
            value={assignment_input.registration_date}
            set_value={set_assignment_input}
            picker_mode='date'
            date_title='등록날짜' />
        </View>

        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder='수업명'
            placeholderTextColor={COLORS.gray_500}
            value={assignment_input.class_name}
            onChangeText={(label) => set_assignment_input((prev_state) => {
              return { ...prev_state, class_name: label }
            })}
          />
        </View>

        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder='교수명'
            placeholderTextColor={COLORS.gray_500}
            value={assignment_input.professor_name}
            onChangeText={(label) => set_assignment_input((prev_state) => {
              return { ...prev_state, professor_name: label }
            })}
          />
        </View>

        <View style={styles.input_container} >
          <TextInput
            style={{
              padding: 10,
              height: 120,
              fontSize: 15,
              borderWidth: 1,
              borderColor: COLORS.gray_480,
              width: '100%'
            }}
            multiline
            textAlignVertical="top"
            numberOfLines={4}
            maxLength={100}
            placeholder='과제 설명'
            placeholderTextColor={COLORS.gray_500}
            value={assignment_input.assignment_description}
            onChangeText={(label) => set_assignment_input((prev_state) => {
              return { ...prev_state, assignment_description: label }
            })}
          />
        </View>

        <View style={styles.divider} />

        <File_select
          file_list={assignment_input.file_list}
          select={select_file}
          de_select={de_select_File}
          container_style={{ marginTop: 15, marginBottom: 10 }}
        />

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Add_assignment;

const styles = StyleSheet.create({
  content_container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  input_container: {
    marginTop: 25,
    alignItems: 'center'
  },
  input: {
    height: 50,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.gray_480,
    paddingHorizontal: 6,
    width: '100%'
  },
  divider: {
    height: 1,
    marginVertical: 25,
    backgroundColor: COLORS.gray_490_inactive
  },
});