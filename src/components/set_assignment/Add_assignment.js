import { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, StatusBar, Pressable, Image, Switch } from 'react-native';
import { Tooltip } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { Feather, Ionicons } from '@expo/vector-icons'

import { exec_request, exec_request_multipart } from '@/shared/js/api';
import { set_store_info, show_toast } from '@/shared/js/common_function';
import { Custom_text, Custom_text_input, Date_time_picker, File_select } from '@/components/components';
import COLORS from '@/shared/js/colors';
import question_mark_tooltip_img from '@/assets/img/icon/question_mark_tooltip.png';
import alarm_img from '@/assets/img/icon/alarm.png';
import paper_airplane from '@/assets/img/icon/paper_airplane.png';

const Add_assignment = ({ navigation, route }) => {
  const { default_semester_id } = useSelector((state) => state.semester);

  const [assignment_input, set_assignment_input] = useState({
    registration_date: new Date(route.params?.selected_date ?? new Date()),  //캘린더 날짜 클릭 후 과제 등록시 selected_date값 들어옴
    assignment_name: '',
    professor_name: '',
    assignment_description: '',
    obsession_alarm: false,
    file_list: [],
  });
  const [assignment_status, set_assignment_status] = useState('설정');
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

  const [submit_tooltip, set_submit_tooltip] = useState(false);
  const [alarm_tooltip, set_alarm_tooltip] = useState(false);

  const status_color_map = {
    설정: {
      backgroundColor: COLORS.primary_500,
      color: COLORS.white,
    },
    예약: {
      backgroundColor: COLORS.primary_490,
      color: COLORS.primary_500,
    },
    LMS: {
      backgroundColor: "#FFE1E1",
      color: "#FF5454",
    },
    완료: {
      backgroundColor: COLORS.gray_480,
      color: COLORS.black_500,
    },
  };

  const toggle_obsession_alarm = () => set_assignment_input((prev_state) => {
    return { ...prev_state, obsession_alarm: !prev_state.obsession_alarm }
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
        <Pressable onPress={add_assignment}>
          <Feather
            name="check"
            size={30}
            color="white"
          />
        </Pressable>)
    });
  }, [navigation, assignment_input, route.params]);

  /**
   * submit_assignmet에서 assignment_status을 받아와서 동적으로 업데이트
   */
  useEffect(() => {
    if (route.params?.assignment_status === '설정') {
      set_assignment_status(route.params.assignment_status);
      set_submit_method(route.params.submit_method);
      set_assignment_email_input(() => ({
        submit_date_time: new Date(),
        email_address: '',
        title: '',
        description: '',
        file_list: [],
      }));
      set_assignment_lms_input(() => ({
        url: '',
        file_list: [],
      }));
    } else if (route.params?.assignment_status === '예약') {
      set_assignment_status(route.params.assignment_status);
      set_submit_method(route.params.submit_method);
      set_assignment_email_input(() => ({
        submit_date_time: new Date(route.params.submit_date_time),
        email_address: route.params.email_address,
        title: route.params.title,
        description: route.params.description,
        file_list: route.params.file_list,
      }));
    } else if (route.params?.assignment_status === 'LMS') {
      set_assignment_status(route.params.assignment_status);
      set_submit_method(route.params.submit_method);
      set_assignment_lms_input(() => ({
        url: route.params.url,
        file_list: route.params.file_list,
      }));
    }
  }, [route.params?.assignment_status])


  const add_assignment = async () => {
    const { file_list, ...rest } = assignment_input;  //파일빼고 나머지 값 비어있는지 확인
    const any_empty = Object.values(rest).some((value) => value === '');
    if (any_empty) {
      Alert.alert('내용을 입력하세요.');
      return;
    }
    const assignment_id = await api_assignment_add_assignment();

    if (assignment_status === '예약') {
      await api_assignment_submit_email(assignment_id);
    } else if (assignment_status === 'LMS') {
      await api_assignment_submit_lms(assignment_id);
    }

    const assignment_list = await api_assignment_get_assignment_list();

    set_store_info('assignment', 'assignment_list', assignment_list);
    navigation.goBack();
    show_toast('과제가 등록되었습니다.');
  }

  const open_submit_assignment = async () => {
    if (submit_method === 'E-mail') {
      navigation.navigate('과제 제출', {
        assignment_status: assignment_status,
        submit_method: submit_method,
        submit_date_time: assignment_email_input.submit_date_time.toISOString(),
        email_address: assignment_email_input.email_address,
        title: assignment_email_input.title,
        description: assignment_email_input.description,
        email_file_list: assignment_email_input.file_list,
      });
    } else if (submit_method === 'LMS') {
      navigation.navigate('과제 제출', {
        assignment_status: assignment_status,
        submit_method: submit_method,
        url: assignment_lms_input.url,
        lms_file_list: assignment_lms_input.file_list
      });
    }
  }

  const api_assignment_add_assignment = async () => {
    const form_data = new FormData();
    form_data.append('semester_id', default_semester_id);
    form_data.append('status', '설정');
    form_data.append('completion_status', false);
    form_data.append('registration_date', String(assignment_input.registration_date));
    form_data.append('assignment_name', assignment_input.assignment_name);
    form_data.append('professor_name', assignment_input.professor_name);
    form_data.append('assignment_description', assignment_input.assignment_description);
    form_data.append('obsession_alarm', assignment_input.obsession_alarm);
    form_data.append('submit_assignment_id', '');
    Array.from(assignment_input.file_list).forEach((file) => {
      form_data.append('file_list', file);
    });

    const params = {
      url: "assignment/add_assignment",
      form_data: form_data
    };

    const result = await exec_request_multipart(params, navigation);

    if (result.status === 'ok') {
      return result.data.assignment_id;
    }
  }

  const api_assignment_submit_email = async (assignment_id) => {
    const form_data = new FormData();
    form_data.append('assignment_id', assignment_id);
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
      url: 'assignment/submit_email',
      form_data: form_data
    };

    const result = await exec_request_multipart(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  const api_assignment_submit_lms = async (assignment_id) => {
    const form_data = new FormData();
    form_data.append('assignment_id', assignment_id);
    form_data.append('submit_method', submit_method);
    form_data.append('status', 'LMS');
    form_data.append('url', assignment_lms_input.url);
    Array.from(assignment_lms_input.file_list).forEach((file) => {
      form_data.append('file_list', file);
    });

    const params = {
      url: 'assignment/submit_lms',
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

          <View>
            <Pressable onPress={open_submit_assignment} style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 34, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={paper_airplane} style={{ width: 18, height: 18, marginRight: 10 }} />
                <View>
                  <Custom_text style={{ color: COLORS.gray_500, fontSize: 16, paddingRight: 5, paddingBottom: 10 }}>예약 제출</Custom_text>
                  {
                    <View style={{ backgroundColor: status_color_map[assignment_status].backgroundColor, width: 52, height: 26, alignItems: 'center', justifyContent: 'center' }}>
                      <Custom_text style={{ color: status_color_map[assignment_status].color, fontSize: 12 }}>{assignment_status}</Custom_text>
                    </View>
                  }
                </View>
                <Tooltip
                  visible={submit_tooltip}
                  onOpen={() => set_submit_tooltip(true)}
                  onClose={() => set_submit_tooltip(false)}
                  width={220}
                  backgroundColor={'#EBEBEB'}
                  popover={<Custom_text style={{ fontSize: 10, }}>날짜를 설정하면 자동으로 메일이 전송됩니다.😊</Custom_text>}
                >
                  <Image source={question_mark_tooltip_img} style={{ width: 14, height: 14 }} />
                </Tooltip>

              </View>

              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.gray_500} />
            </Pressable>
          </View>

          <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={alarm_img} style={{ width: 18, height: 18, marginRight: 10 }} />
              <Custom_text style={{ color: COLORS.gray_500, fontSize: 16, paddingRight: 5 }}>집착 알림</Custom_text>
              <Tooltip
                visible={alarm_tooltip}
                onOpen={() => set_alarm_tooltip(true)}
                onClose={() => set_alarm_tooltip(false)}
                width={220}
                height={50}
                backgroundColor={'#EBEBEB'}
                containerStyle={{ alignItems: 'baseline' }}
                popover={
                  <>
                    <Custom_text style={{ fontSize: 10, }}>집착알람은 <Custom_text style={{ color: COLORS.primary_500 }}>하루전, 한시간 간격</Custom_text>으로 울려요 😊</Custom_text>
                    <Custom_text style={{ fontSize: 10, }}><Custom_text style={{ color: COLORS.primary_500 }}>과제 수행 완료 체크</Custom_text>시 작동이 멈춥니다.</Custom_text>
                    <Custom_text style={{ fontSize: 10, }}>집착알람은 <Custom_text style={{ color: COLORS.primary_500 }}>8시 부터 23시</Custom_text>까지 울려요~!</Custom_text>
                  </>
                }
              >
                <Image source={question_mark_tooltip_img} style={{ width: 14, height: 14 }} />
              </Tooltip>
            </View>

            <Switch
              trackColor={{ false: '#767577', true: COLORS.primary_500 }}
              thumbColor={assignment_input.obsession_alarm ? COLORS.white : '#f4f3f4'}
              onValueChange={toggle_obsession_alarm}
              value={assignment_input.obsession_alarm}
              style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
            />
          </Pressable>

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