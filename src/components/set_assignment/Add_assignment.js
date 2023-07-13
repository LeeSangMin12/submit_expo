import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, } from 'react-native';

import COLORS from '@/shared/js/colors';
import { Date_time_picker, File_select, Alarm_select } from '@/components/components';

const Add_assignment = () => {

  const [assignment_input, set_assignment_input] = useState({
    title: '',
    registration_date: '',
    class_name: '',
    professor_name: '',
    assignment_description: '',
    alarm_list: [],
    file_list: [],
  })

  const select_file = async (file) => {
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

        <Alarm_select />

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