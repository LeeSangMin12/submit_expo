import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, StatusBar, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { FAB } from '@rneui/themed';
import { useSelector } from 'react-redux';

import { is_valid_email } from '@/shared/js/common_function';
import COLORS from '@/shared/js/colors';
import { Custom_text_input, Chip, Date_time_picker, File_select, Custom_text } from '@/components/components';

const Edit_submit_assignment = ({ navigation, route }) => {
  const { default_semester_id } = useSelector((state) => state.semester);

  const [submit_method, set_submit_method] = useState(route.params.submit_method);
  const [assignment_email_input, set_assignment_email_input] = useState({
    submit_date_time: route.params.submit_date_time ? new Date(route.params.submit_date_time) : new Date(),
    email_address: route.params.email_address ?? '',
    title: route.params.title ?? '',
    description: route.params.description ?? '',
    file_list: route.params.email_file_list ?? [],
  });
  const [assignment_lms_input, set_assignment_lms_input] = useState({
    url: route.params.url ?? '',
    file_list: route.params.lms_file_list ?? [],
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
        <Pressable onPress={edit_submit_assignment}>
          <Feather
            name="check"
            size={30}
            color="white"
          />
        </Pressable>
      )
    });
  }, [navigation, submit_method, assignment_email_input, assignment_lms_input]);

  // useEffect(() => {
  //   const fetch_data = async () => {
  //     if (assignment_info.assignment_status === 'LMS') {
  //       set_submit_method(assignment_info.assignment_status);
  //       const lms_info = await api_assignment_get_submit_lms();

  //       set_assignment_lms_input((prev_state) => {
  //         return {
  //           ...prev_state,
  //           url: lms_info.url,
  //           file_list: lms_info.file_list
  //         };
  //       });
  //     } else {
  //       const email_info = await api_assignment_get_submit_email();

  //       set_assignment_email_input((prev_state) => {
  //         return {
  //           ...prev_state,
  //           submit_date_time: new Date(email_info.submit_date_time),
  //           email_address: email_info.email_address,
  //           title: email_info.title,
  //           description: email_info.description,
  //           file_list: email_info.file_list
  //         };
  //       });
  //     }
  //   }
  //   fetch_data();
  // }, []);

  const edit_submit_assignment = async () => {
    if (submit_method === 'E-mail') {
      if (!is_valid_email(assignment_email_input.email_address)) {
        Alert.alert('이메일 형식이 틀렸습니다.');
        return;
      }

      const { file_list, ...rest } = assignment_email_input;
      const any_empty = Object.values(rest).some((value) => value === '');
      if (any_empty) {
        Alert.alert('내용을 입력하세요.');
        return;
      }

      navigation.navigate('과제 수정', {
        assignment_status: '예약',
        submit_method: 'E-mail',
        submit_date_time: assignment_email_input.submit_date_time.toISOString(),
        email_address: assignment_email_input.email_address,
        title: assignment_email_input.title,
        description: assignment_email_input.description,
        file_list: assignment_email_input.file_list,
      });
    } else if (submit_method === 'LMS') {
      const { file_list, ...rest } = assignment_lms_input;  //파일빼고 나머지 값 비어있는지 확인
      const any_empty = Object.values(rest).some((value) => value === '');
      if (any_empty) {
        Alert.alert('내용을 입력하세요.');
        return;
      }

      navigation.navigate('과제 수정', {
        assignment_status: 'LMS',
        submit_method: submit_method,
        url: assignment_lms_input.url,
        file_list: assignment_lms_input.file_list
      });
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
  };

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
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.content_container}
        automaticallyAdjustKeyboardInsets={true}>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 16, paddingHorizontal: 20 }}>
          <Chip
            label="E-mail"
            container_style={{ marginRight: 8 }}
            background_color={COLORS.gray_480}
            selected={submit_method === 'E-mail'}
            on_press={() => set_submit_method('E-mail')} />

          <Chip
            label="LMS"
            background_color={COLORS.gray_480}
            selected={submit_method === 'LMS'}
            on_press={() => set_submit_method('LMS')} />
        </View>

        <View style={styles.divider} />

        {submit_method === 'E-mail' ?
          < >
            <View style={styles.date_container}>
              <Date_time_picker
                picker_mode='date_time'
                value={assignment_email_input.submit_date_time}
                set_value={(val) => set_assignment_email_input((prev_state) => {
                  return { ...prev_state, submit_date_time: val }
                })}
              />
            </View>

            <View style={[styles.divider, { marginTop: 20 }]} />

            <View style={{ paddingHorizontal: 20 }}>

              <View style={styles.input_container}>
                <Custom_text_input
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
                <Custom_text_input
                  value={assignment_email_input.title}
                  onChangeText={(label) => set_assignment_email_input((prev_state) => {
                    return { ...prev_state, title: label }
                  })}
                  style={styles.input}
                  placeholder='메일 제목'
                  placeholderTextColor={COLORS.gray_500} />
              </View>

              <View style={styles.input_container} >
                <Custom_text_input
                  value={assignment_email_input.description}
                  onChangeText={(label) => set_assignment_email_input((prev_state) => {
                    return { ...prev_state, description: label }
                  })}
                  style={{
                    padding: 10,
                    height: 200,
                    fontSize: 15,
                    borderWidth: 1,
                    borderColor: COLORS.gray_490_inactive,
                    borderRadius: 6,
                    width: '100%'
                  }}
                  multiline
                  textAlignVertical="top"
                  numberOfLines={4}
                  maxLength={100}
                  placeholder='실제 메일에 작성되는 내용이에요!'
                  placeholderTextColor={COLORS.gray_500} />
              </View>

              <File_select
                value={assignment_email_input.file_list}
                set_value={set_assignment_email_input}
                container_style={{ marginTop: 25, marginBottom: 10 }}
              />

            </View>
            <View style={{ width: '100%', height: 82, backgroundColor: '#ECF0F2', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
              <Custom_text >제출날짜를 <Custom_text style={{ color: COLORS.primary_500 }}>현재 날짜, 시간 이전으로 설정</Custom_text> 시</Custom_text>
              <Custom_text>메일이 <Custom_text style={{ color: COLORS.primary_500 }}>즉시 발송되므로 주의</Custom_text>하세요!</Custom_text>

            </View>
          </>
          :
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.input_container}>
              <Custom_text_input
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
              container_style={{ marginTop: 30, marginBottom: 10, }}
            />
          </View>
        }


      </ScrollView>
      <FAB
        visible={route.params.assignment_status !== '설정'}
        onPress={() => {
          navigation.navigate('과제 등록', {
            assignment_status: '설정',
            submit_method: 'E-mail',
          });
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
    </KeyboardAvoidingView>
  );
};

export default Edit_submit_assignment;

const styles = StyleSheet.create({
  content_container: {
    flex: 1,
  },
  date_container: {
    marginTop: 10,
    paddingHorizontal: 20
  },
  input_container: {
    paddingTop: 20,
  },
  input: {
    height: 50,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.gray_490_inactive,
    paddingHorizontal: 6,
    width: '100%'
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
});