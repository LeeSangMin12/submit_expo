import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons'


import { exec_request_multipart } from '@/shared/js/api';
import COLORS from '@/shared/js/colors';
import { Chip, Date_time_picker, File_select, Design_chip } from '@/components/components';

const Submit_assignment = ({ navigation, route }) => {
  const { assignment_id } = route.params;

  const [submit_method, set_submit_method] = useState('email');
  const [assignment_email_input, set_assignment_email_input] = useState({
    method: 'email',
    submit_date_time: new Date(),
    email_address: '',
    title: '',
    description: '',
    file_list: [],
  });
  const [assignment_lms_input, set_assignment_lms_input] = useState({
    method: 'lms',
    url: '',
    file_list: [],
  });

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
          on_press={submit_assignment}
          container_style={{
            paddingHorizontal: 14,
            paddingVertical: 9,
            borderRadius: 50,
          }}
        />)
    });
  }, [navigation, submit_method, assignment_email_input, assignment_lms_input]);

  const submit_assignment = async () => {
    switch (submit_method) {
      case 'email':
        console.log('email');
        break;
      case 'lms':
        await api_assignment_submit_lms();
        break;
    }
  };

  const api_assignment_submit_lms = async () => {
    const form_data = new FormData();
    form_data.append('assignment_id', assignment_id);
    form_data.append('method', assignment_lms_input.method);
    form_data.append('url', assignment_lms_input.url);
    Array.from(assignment_lms_input.file_list).forEach((file) => {
      form_data.append('file_list', file);
    });

    const params = {
      url: 'assignment/submit_lms',
      form_data: form_data
    };

    const result = await exec_request_multipart(params, navigation);
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
                value={assignment_email_input.email_address}
                onChangeText={(label) => set_assignment_email_input((prev_state) => {
                  return { ...prev_state, email_address: label }
                })}
                style={styles.input}
                placeholder='제출할 메일주소'
                placeholderTextColor={COLORS.gray_500} />
            </View>

            <View style={styles.input_container}>
              <TextInput
                value={assignment_email_input.title}
                onChangeText={(label) => set_assignment_email_input((prev_state) => {
                  return { ...prev_state, title: label }
                })}
                style={styles.input}
                placeholder='메일 제목'
                placeholderTextColor={COLORS.gray_500} />
            </View>

            <View style={styles.input_container} >
              <TextInput
                value={assignment_email_input.description}
                onChangeText={(label) => set_assignment_email_input((prev_state) => {
                  return { ...prev_state, description: label }
                })}
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
                value={set_assignment_lms_input.url}
                onChangeText={(label) => set_assignment_lms_input((prev_state) => {
                  return { ...prev_state, url: label }
                })}
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