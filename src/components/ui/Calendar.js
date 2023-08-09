import { useState } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { useSelector } from 'react-redux';
import { Feather, Fontisto } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

import { exec_request } from '@/shared/js/api';
import { set_store_info } from '@/shared/js/common_function';
import { Custom_text, Design_chip, Custom_modal, Chip } from "@/components/components";

import COLORS from "@/shared/js/colors";

const window_width = Dimensions.get('window').width;
//소수점이 너무길면 달력의 넓이가 이상하게 되는 버그가 있어서 toFixed로 소수점 3자리까지만 가져옴.
// const date_width = parseFloat((window_width / 7).toFixed(8));  //7일에 대한 백분율 (100 / 7)
const date_width = window_width / 7;  //7일에 대한 백분율 (100 / 7)

const assignment_status_color_map = {
  ['예정']: COLORS.primary_490,
  ['설정']: COLORS.primary_500,
  ['LMS']: '#FF5454',
  ['완료']: '#FF5454'
};

/**
 * 캘린더 그리기
 */
const render_calender = (year, month, open_assignment_list_modal, date_width) => {
  const { assignment_list } = useSelector((state) => state.assignment);

  const date = new Date(year, month - 1);

  const view_year = date.getFullYear();
  const view_month = date.getMonth() + 1;

  const prev_month_last = new Date(view_year, view_month - 1, 0);  //지난 달 마지막 Date
  const this_month_last = new Date(view_year, view_month, 0);  //이번 달 마지막 Date

  const prev_month_date = prev_month_last.getDate();
  const prev_month_day = prev_month_last.getDay();

  const this_month_date = this_month_last.getDate();
  const this_month_day = this_month_last.getDay();

  const prev_dates_arr = [];
  const this_dates_arr = [...Array(this_month_date + 1).keys()].slice(1);
  const next_dates_arr = [];

  if (prev_month_day !== 6) {  //지난달 마지막 요일이 토요일이 아닐때
    for (let i = 0; i < prev_month_day + 1; i++) {  //남는 지난달 날짜 추가
      prev_dates_arr.unshift(prev_month_date - i);
    }
  }

  for (let i = 1; i < 7 - this_month_day; i++) {  //남는 다음달 날짜 추가
    next_dates_arr.push(i);
  };

  const dates = [...prev_dates_arr, ...this_dates_arr, ...next_dates_arr];

  const first_date_index = dates.indexOf(1);
  const last_date_index = dates.lastIndexOf(this_month_date) + 1;

  const date_height =
    dates.length > 35 ? (100 / 6) :
      dates.length < 35 ? (100 / 4) : (100 / 5);  //date의 갯수에 따라 높이 지정

  const formatted_month = String(month).padStart(2, '0');
  const this_month_assignment = assignment_list.filter((assignment) => {
    return assignment.registration_date.startsWith(`${year}-${formatted_month}`)
  });

  const rendered_dates = dates.map((date, i) => {
    const today = new Date();
    const is_today =
      view_year === today.getFullYear() &&
      view_month === today.getMonth() + 1 &&
      date === today.getDate();

    const condition = i >= first_date_index && i < last_date_index ? 'this' : 'other';
    const container_style = [styles.date, { height: `${date_height}%`, width: date_width }];
    const text_style =
      [styles[condition],
      { fontSize: 13 },
      condition === 'this' && is_today && { color: 'white' }];

    if (i % 7 === 0) {
      text_style.push({ color: 'red' });  //일요일에 빨간색 적용
    } else if ((i + 1) % 7 === 0) {
      text_style.push({ color: 'blue' });  //토요일에 파란색 적용
    }

    return (
      <Pressable onPress={condition === 'this' ? () => open_assignment_list_modal(date) : null}
        style={container_style}
        key={i} >
        {condition === 'this' && is_today && <View style={[styles.today_circle, { left: (date_width - 20) / 2, }]} />}
        <Custom_text style={text_style}>{date}</Custom_text>

        {this_month_assignment.map((val, idx) => {
          const formatted_date = new Date(val.registration_date)

          if (condition === 'this' && formatted_date.getDate() == date) {
            return (
              <Design_chip
                key={idx}
                title={val.title}
                background_color={assignment_status_color_map[val.status]}
                container_style={{ paddingVertical: 2, borderRadius: 4, width: '100%', alignItems: 'center', }}
                title_style={{ fontSize: 11, }} />
            )
          }
        })}
      </Pressable>
    );
  })
  return rendered_dates;
};

const Calendar = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions();

  const date_width = parseFloat((window.width / 7).toFixed(2));

  const { year, month } = useSelector((state) => state.calendar);
  const { default_semester_id } = useSelector((state) => state.semester);

  const [selected_date, set_selected_date] = useState('');
  const [assignment_list_modal, set_assignment_list_modal] = useState(false);
  const [today_assignment_list, set_today_assignment_list] = useState([]);

  const toggle_checkbox = async (assignment_id, completion_status, date) => {
    const change_completion_status = await api_assignment_set_completion_status(assignment_id, completion_status);

    if (change_completion_status) {
      const select_date = new Date(year, month - 1, date);

      const assignment_list = await api_assignment_get_assignment_list();
      const today_assignment_list = assignment_list.filter((assignment) => {
        return new Date(assignment.registration_date).toLocaleString().slice(0, 11) === new Date(select_date).toLocaleString().slice(0, 11);
      });

      set_store_info('assignment', 'assignment_list', assignment_list);
      set_today_assignment_list(today_assignment_list);
    }
  };

  const open_assignment_list_modal = async (date) => {
    const select_date = new Date(year, month - 1, date);

    const assignment_list = await api_assignment_get_assignment_list();
    const today_assignment_list = assignment_list.filter((assignment) => {
      return new Date(assignment.registration_date).toLocaleString().slice(0, 11) === new Date(select_date).toLocaleString().slice(0, 11);
    });

    set_today_assignment_list(today_assignment_list);
    set_assignment_list_modal(true);
    set_selected_date(date)
  };

  const open_assignment = async (assignment_id) => {
    const assignment_info = await api_assignment_get_assignment(assignment_id);

    set_assignment_list_modal(false);
    navigation.navigate('과제 수정', {
      assignment_id: assignment_id,
      assignment_info: assignment_info,
    });
  };

  const open_submit_assignment = async (assignment) => {
    set_assignment_list_modal(false);

    if (assignment.status === '예정') {  //과제 예약 처음 등록할때
      navigation.navigate('과제 제출', {
        assignment_id: assignment.assignment_id
      });
    } else {
      navigation.navigate('과제 제출 수정', {
        assignment_id: assignment.assignment_id,
        assignment_status: assignment.status,
        submit_assignment_id: assignment.submit_assignment_id
      });
    }
  };

  const api_assignment_set_completion_status = async (assignment_id, completion_status) => {
    const params = {
      url: 'assignment/set_completion_status',
      assignment_id: assignment_id,
      completion_status: completion_status === 'false' ? 'true' : 'false',
    }

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


  const Modal_assignment_list = () => {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
          <Custom_text >
            <Feather
              name="x"
              size={24}
              color="black"
              onPress={() => set_assignment_list_modal(false)} />
          </Custom_text>
          <Custom_text style={{ fontSize: 16 }}>{month}월 {selected_date}일</Custom_text>
          <Custom_text >
            <Fontisto
              name="plus-a"
              size={24}
              color={COLORS.primary_500}
              onPress={() => {
                const selectd_date = new Date(year, month - 1, selected_date);
                set_assignment_list_modal(false);
                navigation.navigate('과제 등록', {
                  selected_date: selectd_date
                })
              }} />
          </Custom_text>
        </View>

        <ScrollView>
          {today_assignment_list.map((assignment, idx) => (
            <View key={idx}>
              <View style={styles.assignment.container}>
                <View style={styles.assignment.title_container}>
                  <Checkbox
                    value={assignment.completion_status === 'false' ? false : true}
                    onValueChange={() => toggle_checkbox(assignment.assignment_id, assignment.completion_status, selected_date)}
                    style={{ width: 25, height: 25 }}
                  />
                  <Custom_text
                    style={[styles.assignment.checkbox, { textDecorationLine: assignment.completion_status === 'false' ? 'none' : 'line-through' }]}
                    onPress={() => open_assignment(assignment.assignment_id)}
                  >
                    {assignment.title}
                  </Custom_text>
                </View>
                <View style={styles.assignment.chip_container}>
                  <Chip
                    label={assignment.status}
                    on_press={() => open_submit_assignment(assignment)}
                    background_color={assignment_status_color_map[assignment.status]} />
                </View>
              </View>
              <View style={styles.divider} />
            </View>
          ))}
        </ScrollView>

      </View>
    );
  };

  return (
    <View style={styles.calendar} >
      <View style={styles.days_container} >
        <Custom_text style={[styles.day, { color: 'red', width: date_width }]}>일</Custom_text>
        <Custom_text style={[styles.day, { width: date_width }]}>월</Custom_text>
        <Custom_text style={[styles.day, { width: date_width }]}>화</Custom_text>
        <Custom_text style={[styles.day, { width: date_width }]}>수</Custom_text>
        <Custom_text style={[styles.day, { width: date_width }]}>목</Custom_text>
        <Custom_text style={[styles.day, { width: date_width }]}>금</Custom_text>
        <Custom_text style={[styles.day, { color: 'blue', width: date_width }]}>토</Custom_text>
      </View>
      <View style={styles.dates_container}>
        {render_calender(year, month, open_assignment_list_modal, date_width)}
      </View>

      <Custom_modal
        modal_visible={assignment_list_modal}
        position='bottom'
        bottom_height='80%'
        content_component={() => <Modal_assignment_list />} />
    </View>
  );
};



export default Calendar;

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
  },
  days_container: {
    flexDirection: 'row',
  },
  day: {
    textAlign: 'center',
    marginVertical: 10,
    color: COLORS.gray_500
  },
  dates_container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'gray',
    borderTopWidth: 0.5,
    alignItems: 'stretch'
  },
  date: {
    alignItems: 'center',
    borderColor: COLORS.gray_490_inactive,
    borderBottomWidth: 0.5,
    paddingTop: 6,
    overflow: 'hidden',
  },
  other: {
    opacity: 0.3,
  },
  today_circle: {
    width: 19,
    height: 19,
    borderRadius: 100,
    backgroundColor: COLORS.black_500,
    position: 'absolute',
    top: 4.3,

    justifyContent: 'center',
    alignItems: 'center',
  },
  assignment: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 3,
      paddingLeft: 6
    },
    title_container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      paddingVertical: 15
    },
    checkbox: {
      fontSize: 16,
      paddingLeft: 12
    },
    chip_container: {
      marginRight: 15
    }
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
});