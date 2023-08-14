import React, { useState } from "react";
import { View, Platform, Pressable, Image, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';

import COLORS from '@/shared/js/colors';
import { convert_12_hour_format, get_day_of_week } from "@/shared/js/common_function";
import Custom_text from '@/components/ui/Custom_text.js';
import set_date_img from '@/assets/img/icon/set_date.png';

/**
 * : 무조건 scrollview로 감싸야됨(날짜, 시간 설정시 설정하는 input창이 나와야 하므로)
 */
const Date_time_picker = ({
  picker_mode,
  date_title,
  time_title,
  value,
  set_value
}) => {
  const [mode, set_mode] = useState('date');
  const [show, set_show] = useState(false);

  const on_change = (event, selected_date) => {
    const current_date = new Date(selected_date) || value;
    if (Platform.OS === 'android') {
      set_show(false); // for iOS, add a button that closes the picker
    }
    set_value(current_date);
  };

  const show_mode = (currentMode) => {
    set_show(true);
    set_mode(currentMode);
  };

  const show_date_time_picker = () => {
    show_mode('datetime');
  };

  const show_date_picker = () => {
    show_mode('date');
  };

  const show_time_picker = () => {
    show_mode('time');
  };

  const get_date = (year, month, date) => {
    const formatted_month = String(month).padStart(2, '0');
    const formatted_date = String(date).padStart(2, '0');
    const day_of_week = get_day_of_week(`${year}-${formatted_month}-${formatted_date}`);

    return `${year}.${formatted_month}.${formatted_date}(${day_of_week})`;
  };

  const get_time = (hours, minutes) => {
    const formatted_hours = String(hours).padStart(2, '0');
    const formatted_minutes = String(minutes).padStart(2, '0');

    const twelve_hour_time = convert_12_hour_format(`${formatted_hours}:${formatted_minutes}`);
    return twelve_hour_time;
  };

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        {
          picker_mode === 'date_time' ?
            <Pressable onPress={show_date_time_picker} >
              <Custom_text>제출날짜</Custom_text>
              <Custom_text style={{ marginLeft: 10, fontSize: 18, fontFamily: 'medium', paddingTop: 8 }}>
                {get_date(value.getFullYear(), value.getMonth() + 1, value.getDate())},&nbsp;
                {get_time(value.getHours(), value.getMinutes())}
              </Custom_text>
            </Pressable>
            : picker_mode === 'date' ?
              <Pressable
                style={styles.date_container}
                onPress={show_date_picker}
              >
                <Image
                  source={set_date_img}
                  style={styles.calendar_img} // position 속성 변경
                />
                <Custom_text style={styles.date_text}>
                  {get_date(value.getFullYear(), value.getMonth() + 1, value.getDate())}
                </Custom_text>
              </Pressable>

              : picker_mode === 'time' ?
                <Pressable style={{ flex: 1 }} onPress={show_time_picker}>
                  <Input
                    label={time_title}
                    value={get_time(value.getHours(), value.getMinutes())}
                    disabled={true}
                    disabledInputStyle={{ color: COLORS.black_500, opacity: 1 }} />
                </Pressable>
                : null
        }
      </View>

      {show && (
        <View style={styles.picker_container}>
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            display="default"
            locale="ko"
            onChange={on_change}
          />
          <MaterialIcons
            style={{ marginLeft: 10 }}
            name="cancel"
            size={26}
            color={COLORS.black_500}
            onPress={() => set_show(false)} />
        </View>
      )}
    </>
  );
};

export default Date_time_picker;

const styles = StyleSheet.create({
  date_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  calendar_img: {
    position: 'absolute',
    left: 90,
    width: 40,
    height: 40
  },
  date_text: {
    fontSize: 18,
    fontFamily: 'semi_bold'
  },
  picker_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  }
});