import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import COLORS from '@/shared/js/colors';
import { add_attached_file, remove_attached_file } from '@/store/modules/assignment_submit_slice';
import { Chip, Date_time_picker, File_select } from '@/components/components';

const Submit_assignment = () => {
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

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 9, }}>
          <Chip
            label="E-mail"
            selected={submit_method === 'email'}
            on_press={() => set_submit_method('email')} />

          <Chip
            label="LMS"
            selected={submit_method === 'lms'}
            on_press={() => set_submit_method('lms')} />
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ height: 5, backgroundColor: COLORS.gray_480, width: '95%' }} />
        </View>

        {submit_method === 'email' ?
          < >
            <View style={styles.input_container}>
              <Date_time_picker />
            </View>

            <View style={{ alignItems: 'center' }}>
              <TextInput
                style={styles.input}
                placeholder='제출할 메일주소'
                placeholderTextColor={COLORS.gray_500} />
            </View>

            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder='메일 제목'
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
                numberOfLines={4}
                maxLength={100}
                placeholder='과제내용'
                placeholderTextColor={COLORS.gray_500} />
            </View>

            <File_select
              file_name='email_attached_files'
              file_list={email_attached_files}
              select={select_file}
              de_select={de_select_File}
              container_style={{ marginTop: 30, marginBottom: 10 }}
            />
          </>
          :
          <>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder='링크를 입력해주세요'
                placeholderTextColor={COLORS.gray_500} />
            </View>

            <File_select
              file_name='lms_attached_files'
              file_list={lms_attached_files}
              select={select_file}
              de_select={de_select_File}
              container_style={{ marginTop: 30, marginBottom: 10 }}
            />
          </>
        }

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Submit_assignment;

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
});