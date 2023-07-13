import { useState } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import { Feather, Fontisto } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import Design_chip from "./Design_chip";
import Custom_modal from "./Custom_modal";
import Chip from "./Chip";
import COLORS from "@/shared/js/colors";

const window_width = Dimensions.get('window').width;
const date_width = window_width / 7;  //7일에 대한 백분율 (100 / 7)

/**
 * 캘린더 그리기
 */
const render_calender = (year, month, open_assignment_list_modal) => {
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
  const last_date_index = dates.lastIndexOf(this_month_date);

  const date_height =
    dates.length > 35 ? (100 / 6) :
      dates.length < 35 ? (100 / 4) : (100 / 5);  //date의 갯수에 따라 높이 지정

  const today = new Date();

  const rendered_dates = dates.map((date, i) => {
    const designed_chip_arr = [{
      title: '국어',
      backgorund_color: COLORS.primary_500
    },
    {
      title: '과제1',
      backgorund_color: COLORS.primary_500
    },
    {
      title: '과제2',
      backgorund_color: COLORS.primary_500
    },
    {
      title: '과제3',
      backgorund_color: COLORS.primary_500
    }]

    const is_today =
      view_year === today.getFullYear() &&
      view_month === today.getMonth() + 1 &&
      date === today.getDate();

    const condition = i >= first_date_index && i < last_date_index + 1 ? 'this' : 'other';
    const container_style = [styles.date, { height: `${date_height}%` }];
    const text_style = [styles[condition], { fontSize: 13 }, is_today && { color: 'white' }]

    if (i % 7 === 0) {
      text_style.push({ color: 'red' });  //일요일에 빨간색 적용
    } else if ((i + 1) % 7 === 0) {
      text_style.push({ color: 'blue' });  //토요일에 파란색 적용
    }

    return (
      <Pressable style={container_style} key={i} onPress={() => open_assignment_list_modal(date)}>
        {is_today && <View style={styles.today_circle} />}
        <Text style={text_style}>{date}</Text>

        {
          designed_chip_arr.map((val, idx) => {
            return (
              <Design_chip
                key={idx}
                title={val.title}
                background_color={val.backgorund_color}
                container_style={{ paddingVertical: 2, borderRadius: 4, width: '100%', alignItems: 'center', }}
                title_style={{ fontSize: 11, }} />
            )
          })
        }

      </Pressable>
    );
  })
  return rendered_dates;
};

const Calendar = () => {
  const navigation = useNavigation();
  const {
    year,
    month,
  } = useSelector((state) => state.calendar);

  const [checked, setChecked] = useState(true);
  const [selected_date, set_selected_date] = useState('');
  const [assignment_list_modal, set_assignment_list_modal] = useState(false);

  const toggle_checkbox = () => setChecked(!checked);

  const open_assignment_list_modal = (date) => {
    set_assignment_list_modal(true);
    set_selected_date(date)
  };

  const Modal_assignment_list = () => {
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
          <Text >
            <Feather
              name="x"
              size={24}
              color="black"
              onPress={() => set_assignment_list_modal(false)} />
          </Text>
          <Text style={{ fontSize: 16 }}>{month}월 {selected_date}일</Text>
          <Text >
            <Fontisto
              name="plus-a"
              size={24}
              color={COLORS.primary_500}
              onPress={() => {
                set_assignment_list_modal(false);
                navigation.navigate('과제 등록')
              }} />
          </Text>
        </View>

        <View style={styles.assignment.container}>
          <View style={styles.assignment.title_container}>
            <CheckBox
              checked={checked}
              onPress={toggle_checkbox}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon={'checkbox-blank-outline'}
              size={34}
              title='경영학개론'
              textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
              checkedColor={COLORS.primary_500}
            />
          </View>
          <View style={styles.assignment.chip_container}>
            <Chip
              label="완료"
              background_color={COLORS.gray_470_bg} />
          </View>
        </View>
        <View style={styles.divider} />

      </ScrollView>
    );
  };

  return (
    <View style={styles.calendar} >
      <View style={styles.days_container} >
        <Text style={[styles.day, { color: 'red' }]}>일</Text>
        <Text style={styles.day}>월</Text>
        <Text style={styles.day}>화</Text>
        <Text style={styles.day}>수</Text>
        <Text style={styles.day}>목</Text>
        <Text style={styles.day}>금</Text>
        <Text style={[styles.day, { color: 'blue' }]}>토</Text>
      </View>
      <View style={styles.dates_container}>
        {render_calender(year, month, open_assignment_list_modal)}
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
    width: date_width,
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
    width: date_width,
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
    top: 4,
    left: (date_width - 19) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modal_assignment_list: {

  },
  assignment: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2
    },
    title_container: {
      flexDirection: 'row'
    },
    checkbox: {
      fontSize: 16,
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