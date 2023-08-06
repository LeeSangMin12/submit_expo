import { useState, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';

import { exec_request, exec_request_multipart } from '@/shared/js/api';
import { show_toast, is_valid_email } from '@/shared/js/common';
import { set_store_info } from '@/shared/js/common';
import COLORS from '@/shared/js/colors';
import { Chip, Date_time_picker, File_select, Design_chip } from '@/components/components';
import { useEffect } from 'react';

const Edit_submit_assignment = ({ navigation, route }) => {
  const assignment_info = route.params;
  const {
    default_semester_id,
  } = useSelector((state) => state.semester);

  const [submit_method, set_submit_method] = useState('E-mail');
  const [assignment_email_input, set_assignment_email_input] = useState({
    submit_date_time: new Date(),
    email_address: '',
    title: '',
    description: '',
    file_list: [],
  });
  const [assignment_lms_input, set_assignment_lms_input] = useState({
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
        <>
          <Design_chip
            title='삭제'
            on_press={delete_submit_assignment}
            background_color={'#FF5454'}
            container_style={{
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 50,
              marginRight: 5
            }}
          />
          <Design_chip
            title='수정'
            on_press={edit_submit_assignment}
            container_style={{
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 50,
            }}
          />
        </>)
    });
  }, [navigation, submit_method, assignment_email_input, assignment_lms_input]);

  useEffect(() => {
    const fetch_data = async () => {
      if (assignment_info.assignment_status === 'LMS') {
        set_submit_method(assignment_info.assignment_status);
        const lms_info = await api_assignment_get_submit_lms();

        set_assignment_lms_input((prev_state) => {
          return {
            ...prev_state,
            url: lms_info.url,
            file_list: lms_info.file_list
          };
        });
      } else {
        const email_info = await api_assignment_get_submit_email();

        set_assignment_email_input((prev_state) => {
          return {
            ...prev_state,
            submit_date_time: new Date(email_info.submit_date_time),
            email_address: email_info.email_address,
            title: email_info.title,
            description: email_info.description,
            file_list: email_info.file_list
          };
        });
      }
    }
    fetch_data();
  }, []);

  const edit_submit_assignment = async () => {
    if (submit_method === 'E-mail') {
      const { file_list, ...rest } = assignment_email_input;  //파일빼고 나머지 값 비어있는지 확인
      const any_empty = Object.values(rest).some((value) => value === '');
      if (any_empty) {
        Alert.alert('값이 비어있습니다.');
        return;
      }

      const edit_email = await api_assignment_edit_submit_email();
      if (edit_email) {
        if (!is_valid_email(assignment_email_input.email_address)) {
          Alert.alert('이메일 형식이 틀렸습니다.');
          return;
        }

        const assignment_list = await api_assignment_get_assignment_list();

        set_store_info('assignment', 'assignment_list', assignment_list);
        navigation.goBack();
        show_toast('과제가 예약되었습니다.');
      }
    } else if (submit_method === 'LMS') {
      const { file_list, ...rest } = assignment_lms_input;  //파일빼고 나머지 값 비어있는지 확인
      const any_empty = Object.values(rest).some((value) => value === '');
      if (any_empty) {
        Alert.alert('값이 비어있습니다.');
        return;
      }

      const edit_lms = await api_assignment_edit_submit_lms();
      if (edit_lms) {
        const assignment_list = await api_assignment_get_assignment_list();

        set_store_info('assignment', 'assignment_list', assignment_list);
        navigation.goBack();
        show_toast('과제가 예약되었습니다.');
      }
    }

  };

  const delete_submit_assignment = () => {
    Alert.alert('삭제하시겠습니까?', '삭제후 되돌릴 수 없습니다 ', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제', onPress: async () => {
          const delete_assignment = await api_assignment_delete_submit_assignment();
          if (delete_assignment) {
            const assignment_list = await api_assignment_get_assignment_list();

            set_store_info('assignment', 'assignment_list', assignment_list);
            navigation.navigate('Bottom_navigation', { screen: '예약전송' });
          }
        }
      }
    ]);
  };

  const api_assignment_get_submit_email = async () => {
    const params = {
      url: 'assignment/get_submit_email',
      assignment_id: assignment_info.assignment_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  const api_assignment_get_submit_lms = async () => {
    const params = {
      url: 'assignment/get_submit_lms',
      assignment_id: assignment_info.assignment_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  const api_assignment_delete_submit_assignment = async () => {
    const params = {
      url: 'assignment/delete_submit_assignment',
      assignment_id: assignment_info.assignment_id,
      submit_assignment_id: assignment_info.submit_assignment_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  }

  const api_assignment_edit_submit_lms = async () => {
    const form_data = new FormData();
    form_data.append('assignment_id', assignment_info.assignment_id);
    form_data.append('submit_assignment_id', assignment_info.submit_assignment_id);
    form_data.append('submit_method', submit_method);
    form_data.append('status', 'LMS');
    form_data.append('url', assignment_lms_input.url);
    Array.from(assignment_lms_input.file_list).forEach((file) => {
      form_data.append('file_list', file);
    });

    const params = {
      url: 'assignment/edit_submit_lms',
      form_data: form_data
    };

    const result = await exec_request_multipart(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  const api_assignment_edit_submit_email = async () => {
    const form_data = new FormData();
    form_data.append('assignment_id', assignment_info.assignment_id);
    form_data.append('submit_assignment_id', assignment_info.submit_assignment_id);
    form_data.append('submit_method', submit_method);
    form_data.append('status', '예약');
    form_data.append('submit_date_time', String(assignment_email_input.submit_date_time));
    form_data.append('email_address', assignment_email_input.email_address);
    form_data.append('title', assignment_email_input.title);
    form_data.append('description', assignment_email_input.description);
    Array.from(assignment_email_input.file_list).forEach((file) => {
      form_data.append('file_list', file);
    });

    const params = {
      url: 'assignment/edit_submit_email',
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

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 9, }}>
          <Chip
            label="E-mail"
            selected={submit_method === 'E-mail'}
            on_press={() => set_submit_method('E-mail')} />

          <Chip
            label="LMS"
            selected={submit_method === 'LMS'}
            on_press={() => set_submit_method('LMS')} />
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ height: 5, backgroundColor: COLORS.gray_480, width: '95%' }} />
        </View>

        {submit_method === 'E-mail' ?
          < >
            <Text
              style={{
                color: 'red',
                paddingVertical: 5
              }}>
              ☆과제 제출 날짜, 시간에 자동으로 메일이 예약전송 됩니다.
            </Text>

            <View style={styles.input_container}>
              <Date_time_picker
                picker_mode='date_time'
                value={assignment_email_input.submit_date_time}
                set_value={(val) => set_assignment_email_input((prev_state) => {
                  return { ...prev_state, submit_date_time: val }
                })}
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
                keyboardType="email-address"
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
                value={assignment_lms_input.url}
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

export default Edit_submit_assignment;

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