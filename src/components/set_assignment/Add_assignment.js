import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import COLORS from '@/shared/js/colors';
import { add_attached_file, remove_attached_file } from '@/store/modules/assignment_submit_slice';
import { Chip, Date_time_picker, File_select, Alarm_select } from '@/components/components';

const Add_assignment = () => {
  const dispatch = useDispatch();
  const {
    email_attached_files,
    lms_attached_files
  } = useSelector((state) => state.assignment_submit);

  const [submit_method, set_submit_method] = useState('email');

  const select_file = async (file_name, file) => {
    dispatch(add_attached_file({
      method: file_name,
      new_file: {
        name: file.name,
        size: file.size,
        uri: file.uri
      }
    }));
  };

  const de_select_File = (file_name, file_num) => {
    dispatch(remove_attached_file({
      method: file_name,
      file_num
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
            placeholderTextColor={COLORS.gray_500} />
        </View>

        <View style={styles.input_container}>
          <Date_time_picker
            picker_mode='date_time'
            date_title='등록날짜'
            time_title='등록시간' />
        </View>

        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder='수업명'
            placeholderTextColor={COLORS.gray_500} />
        </View>

        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder='교수명'
            placeholderTextColor={COLORS.gray_500} />
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
            placeholderTextColor={COLORS.gray_500} />
        </View>

        <View style={styles.divider} />

        <Alarm_select />

        <File_select
          file_name='email_attached_files'
          file_list={email_attached_files}
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