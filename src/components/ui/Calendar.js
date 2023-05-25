import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

import Design_chip from "./Design_chip";
import COLORS from "@/shared/js/colors";

const window_width = Dimensions.get('window').width;

const date_width = window_width / 7;  //7일에 대한 백분율 (100 / 7)

let date = new Date();

/**
 * 캘린더 그리기
 */
const render_calender = (year, month) => {
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

    const is_today =
      view_year === today.getFullYear() &&
      view_month === today.getMonth() + 1 &&
      date === today.getDate();

    const condition = i >= first_date_index && i < last_date_index + 1 ? 'this' : 'other';
    const container_style = [styles.date, { height: `${date_height}%` }];
    const text_style = [styles[condition], is_today && { color: 'white' }]

    if (i % 7 === 0) {
      text_style.push({ color: 'red' });  //일요일에 빨간색 적용
    } else if ((i + 1) % 7 === 0) {
      text_style.push({ color: 'blue' });  //토요일에 파란색 적용
    }

    return (
      <View style={container_style} key={i}>
        {is_today && <View style={styles.today_circle} />}
        <Text style={text_style}>{date}</Text>
        <Design_chip title='국어' />
      </View>
    );
  })
  return rendered_dates;



  // const today = new Date();
  // if (view_month === today.getMonth() + 1 && view_year === today.getFullYear()) {
  //   document.querySelectorAll('.this').forEach((date) => {
  //     if (Number(date.innerText) === today.getDate()) {
  //       date.classList.add('today');
  //       return false;
  //     }
  //   });
  // }
};

const Calendar = () => {
  // useEffect(() => {
  //   render_calender();
  // }, []);

  const {
    year,
    month,
  } = useSelector((state) => state.calendar);

  return (
    <View style={styles.calendar}>
      <View style={styles.days_container}>
        <Text style={[styles.day, { color: 'red' }]}>일</Text>
        <Text style={styles.day}>월</Text>
        <Text style={styles.day}>화</Text>
        <Text style={styles.day}>수</Text>
        <Text style={styles.day}>목</Text>
        <Text style={styles.day}>금</Text>
        <Text style={[styles.day, { color: 'blue' }]}>토</Text>
      </View>
      <View style={styles.dates_container}>
        {render_calender(year, month)}
      </View>
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
    // borderColor: 'gray',
    borderColor: COLORS.gray_490_inactive,
    borderBottomWidth: 0.5,
    // borderLeftWidth: 0.5,
    padding: 5,
    overflow: 'hidden',
  },
  other: {
    opacity: 0.3,
  },
  today_circle: {
    width: 23,
    height: 23,
    borderRadius: 100,
    backgroundColor: COLORS.primary_500,
    position: 'absolute',
    top: 3,
    left: (date_width - 22) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});