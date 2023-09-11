import { useState } from "react";
import { View, StyleSheet, Image, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Feather, Fontisto } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

import { exec_request } from '@/shared/js/api';
import { go_prev_month, go_next_month } from '@/store/modules/calendar_slice';
import { set_store_info, kor_iso_string } from '@/shared/js/common_function';
import COLORS from "@/shared/js/colors";
import Custom_text from '@/components/ui/Custom_text.js';
import Design_chip from '@/components/ui/Design_chip.js';
import Custom_modal from '@/components/ui/Custom_modal.js';
import Chip from '@/components/ui/Chip.js';
import adsense_png from '@/assets/img/my/adsense.png';

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
  const this_dates_arr = [];
  const next_dates_arr = [];

  if (prev_month_day !== 6) {  //지난달 마지막 요일이 토요일이 아닐때
    for (let i = 0; i < prev_month_day + 1; i++) {  //남는 지난달 날짜 추가
      prev_dates_arr.unshift({
        month: month - 1,
        date: prev_month_date - i
      });
    }
  }

  for (let i = 1; i <= this_month_date; i++) {
    this_dates_arr.push({
      month: month,
      date: i
    })
  }

  for (let i = 1; i < 7 - this_month_day; i++) {  //남는 다음달 날짜 추가
    next_dates_arr.push({
      month: month + 1,
      date: i
    });
  };

  const dates = [...prev_dates_arr, ...this_dates_arr, ...next_dates_arr];


  assignment_list.forEach(assignment => {
    const assignment_date = new Date(assignment.registration_date);
    const assignment_month = assignment_date.getMonth() + 1;
    const assignment_day = assignment_date.getDate();

    const matching_date = dates.find(date => date.month === assignment_month && date.date === assignment_day);

    if (matching_date) {
      matching_date.assignments = matching_date.assignments || [];
      matching_date.assignments.push(assignment);
    }
  });

  const date_height =
    dates.length > 35 ? (100 / 6) :
      dates.length < 35 ? (100 / 4) : (100 / 5);  //date의 갯수에 따라 높이 지정

  const rendered_dates = dates.map((date, i) => {
    const today = new Date();
    const is_today =
      view_year === today.getFullYear() &&
      view_month === today.getMonth() + 1 &&
      date.date === today.getDate();

    const condition =
      date.month === month - 1 ? 'prev_month' :
        date.month === month + 1 ? 'last_month' : 'this'

    const container_style = [styles.date, { height: `${date_height}%`, width: date_width }];

    const text_style =
      [styles[condition],
      { fontSize: 13 },
      condition === 'this' && is_today && { color: 'white' }];

    if (i % 7 === 0 && is_today === false) {
      text_style.push({ color: 'red' });  //일요일에 빨간색 적용
    } else if ((i + 1) % 7 === 0 && is_today === false) {
      text_style.push({ color: 'blue' });  //토요일에 파란색 적용
    }

    return (
      <Pressable
        onPress={() => open_assignment_list_modal(date)}
        style={container_style}
        key={i}>
        {condition === 'this' && is_today && <View style={[styles.today_circle, { left: (date_width - 20) / 2, }]} />}
        <Custom_text style={text_style}>{date.date}</Custom_text>

        {date.assignments?.length >= 1 ? date.assignments.map((assignment, idx) => (
          <Design_chip
            key={idx}
            on_press={() => open_assignment_list_modal(date)}
            title={assignment.assignment_name}
            container_style={{ paddingVertical: 2, borderRadius: 4, width: '100%', alignItems: 'center', }}
            title_style={{ fontSize: 11, }} />
        )) : null}
      </Pressable>
    )
  });
  return rendered_dates;
};

const Calendar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const window = useWindowDimensions();

  //소수점이 너무길면 달력의 넓이가 이상하게 되는 버그가 있어서 toFixed로 소수점 2자리까지만 가져옴.
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

  const show_d_day = (assignment_d_day) => {
    if (assignment_d_day < 0) {
      return '';
    } else if (assignment_d_day >= 0) {
      return `D-${assignment_d_day}`
    }
  }

  const open_assignment_list_modal = async (date) => {
    const select_date = new Date(year, date.month - 1, date.date);

    if (date.month < month) {  //지난달로 이동
      dispatch(go_prev_month())
    } else if (date.month > month) {  //다음달로 이동
      dispatch(go_next_month())
    } else {
      const assignment_list = await api_assignment_get_assignment_list();
      const today_assignment_list = assignment_list.filter((assignment) => {
        return new Date(assignment.registration_date).toLocaleString().slice(0, 11) === new Date(select_date).toLocaleString().slice(0, 11);
      });

      set_today_assignment_list(today_assignment_list);
      set_assignment_list_modal(true);
      set_selected_date(date.date)
    }

  };

  const open_assignment = async (assignment_id) => {
    const assignment_info = await api_assignment_get_assignment(assignment_id);

    set_assignment_list_modal(false);
    navigation.navigate('과제 수정', {
      assignment_id: assignment_id,
      assignment_info: assignment_info,
    });
  };


  const calculate_d_day_assignment = (assignment) => {
    const today = new Date(kor_iso_string(new Date()));
    const comparison_date = new Date(assignment.registration_date);

    today.setHours(0, 0, 0, 0);  //시간 차이 제거
    comparison_date.setHours(0, 0, 0, 0);  ////시간 차이 제거

    // 두 날짜의 차이(밀리초 단위)를 구함
    let difference_millie_seconds = comparison_date - today;

    // 밀리초 단위의 차이를 일(day) 단위로 변환
    let difference_in_days = difference_millie_seconds / (1000 * 60 * 60 * 24);

    if (difference_in_days < 0) {
      return '';
    } else if (difference_in_days >= 0) {
      return `D-${difference_in_days}`
    }
  }


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
                  selected_date: kor_iso_string(selectd_date)
                });
              }} />
          </Custom_text>
        </View>

        <ScrollView>
          {/* <Image source={adsense_png} style={styles.adsense} /> */}
          {today_assignment_list.map((assignment, idx) => (
            <View key={idx}>
              <Pressable style={styles.assignment.container} onPress={() => open_assignment(assignment.assignment_id)}>
                <View style={styles.assignment.title_container}>
                  <Checkbox
                    value={assignment.completion_status === 'false' ? false : true}
                    onValueChange={() => toggle_checkbox(assignment.assignment_id, assignment.completion_status, selected_date)}
                    style={styles.assignment.checkbox}
                    color={assignment.completion_status === 'false' ? null : COLORS.primary_500}
                  />
                  <Custom_text
                    style={[styles.assignment.checkbox_title, { textDecorationLine: assignment.completion_status === 'false' ? 'none' : 'line-through' }]}
                  >
                    {assignment.assignment_name}
                  </Custom_text>
                  <Custom_text style={{ fontSize: 11, paddingBottom: 10, paddingLeft: 7 }}>{show_d_day(assignment.assignment_d_day)}</Custom_text>
                </View>
                <View >
                  <Chip
                    label={assignment.status}
                    on_press={() => open_assignment(assignment.assignment_id)}
                  />
                </View>
              </Pressable>
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
    alignItems: 'stretch'
  },
  date: {
    alignItems: 'center',
    borderColor: COLORS.gray_490_inactive,
    borderBottomWidth: 0.5,
    paddingTop: 6,
    overflow: 'hidden',
  },
  prev_month: {
    opacity: 0.3,
  },
  last_month: {
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
      paddingVertical: 13,
      paddingHorizontal: 20
    },
    title_container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 28,
      height: 28,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: COLORS.gray_480,
      backgroundColor: '#F4F4F4'
    },
    checkbox_title: {
      fontSize: 16,
      fontFamily: 'medium',
      paddingLeft: 12
    },
  },
  adsense: {
    width: '100%',
    height: 82
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
});