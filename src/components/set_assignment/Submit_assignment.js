import { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, } from 'react-native';

import COLORS from '@/shared/js/colors';
import { Chip, Date_time_picker, File_select } from '@/components/components';

const Submit_assignment = ({ navigation, route }) => {
  const { assignment_id } = route.params;

  const [submit_method, set_submit_method] = useState('email');
  const [assignment_email_input, set_assignment_email_input] = useState({
    email_address: '',
    submit_date_time: new Date(),
    title: '',
    description: '',
    file_list: [],
  });
  const [assignment_lms_input, set_assignment_lms_input] = useState({
    url: '',
    file_list: [],
  });

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
              <Date_time_picker
                value={assignment_email_input.submit_date_time}
                set_value={set_assignment_email_input}
                picker_mode='date_time'
                date_title='제출날짜'
                time_title='제출시간'
              />
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
                textAlignVertical="top"
                numberOfLines={4}
                maxLength={100}
                placeholder='과제내용'
                placeholderTextColor={COLORS.gray_500} />
            </View>

            <File_select
              value={assignment_email_input.file_list}
              set_value={set_assignment_email_input}
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
              value={assignment_lms_input.file_list}
              set_value={set_assignment_lms_input}
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