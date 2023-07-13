import React, { useState } from "react";
import { View, Platform, Pressable, Text } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';

import COLORS from '@/shared/js/colors';

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
  const [date, set_date] = useState(new Date());
  const [mode, set_mode] = useState('date');
  const [show, set_show] = useState(false);

  const on_change = (event, selected_date) => {
    const current_date = selected_date || value;
    if (Platform.OS === 'android') {
      set_show(false); // for iOS, add a button that closes the picker
    }
    set_value((prev_state) => {
      return { ...prev_state, registration_date: current_date }
    })
  };

  const show_mode = (currentMode) => {
    set_show(true);
    set_mode(currentMode);
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

    return `${year}.${formatted_month}.${formatted_date}`;
  };

  const get_time = (hours, minutes) => {
    const formatted_hours = String(hours).padStart(2, '0');
    const formatted_minutes = String(minutes).padStart(2, '0');

    return `${formatted_hours}:${formatted_minutes}`;
  };

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        {
          picker_mode === 'date_time' ?
            <>
              <Pressable style={{ flex: 1 }} onPress={show_date_picker}>
                <Input
                  label={date_title}
                  value={get_date(value.getFullYear(), value.getMonth() + 1, value.getDate())}
                  disabled={true}
                  disabledInputStyle={{ color: COLORS.black_500, opacity: 1 }} />
              </Pressable>

              <Pressable style={{ flex: 1 }} onPress={show_time_picker}>
                <Input
                  label={time_title}
                  value={get_time(value.getHours(), value.getMinutes())}
                  disabled={true}
                  disabledInputStyle={{ color: COLORS.black_500, opacity: 1 }} />
              </Pressable>
            </>
            : picker_mode === 'date' ?
              <Pressable style={{ flex: 1 }} onPress={show_date_picker}>
                <Input
                  label={date_title}
                  value={get_date(value.getFullYear(), value.getMonth() + 1, value.getDate())}
                  disabled={true}
                  disabledInputStyle={{ color: COLORS.black_500, opacity: 1 }} />
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
            color={COLORS.gray_500}
            onPress={() => set_show(false)} />
        </View>
      )}
    </>
  );
};

export default Date_time_picker;