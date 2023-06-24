import React, { useState } from "react";
import { View, Platform, Pressable, Text } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';

import COLORS from '@/shared/js/colors';

/**
 * : 무조건 scrollview로 감싸야됨(날짜, 시간 설정시 설정하는 input창이 나와야 하므로)
 * @param {*} param0 
 * @returns 
 */
const Date_time_picker = ({ picker_mode, date_title, time_title }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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
              <Pressable style={{ flex: 1 }} onPress={showDatepicker}>
                <Input
                  label={date_title}
                  value={get_date(date.getFullYear(), date.getMonth() + 1, date.getDate())}
                  disabled={true}
                  disabledInputStyle={{ color: COLORS.black_500, opacity: 1 }} />
              </Pressable>

              <Pressable style={{ flex: 1 }} onPress={showTimepicker}>
                <Input
                  label={time_title}
                  value={get_time(date.getHours(), date.getMinutes())}
                  disabled={true}
                  disabledInputStyle={{ color: COLORS.black_500, opacity: 1 }} />
              </Pressable>
            </>
            : picker_mode === 'date' ?
              <Pressable style={{ flex: 1 }} onPress={showDatepicker}>
                <Input
                  label={date_title}
                  value={get_date(date.getFullYear(), date.getMonth() + 1, date.getDate())}
                  disabled={true}
                  disabledInputStyle={{ color: COLORS.black_500, opacity: 1 }} />
              </Pressable>
              : picker_mode === 'time' ?
                <Pressable style={{ flex: 1 }} onPress={showTimepicker}>
                  <Input
                    label={time_title}
                    value={get_time(date.getHours(), date.getMinutes())}
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
            value={date}
            mode={mode}
            display="default"
            locale="ko"
            onChange={onChange}
          />
          <MaterialIcons
            style={{ marginLeft: 10 }}
            name="cancel"
            size={26}
            color={COLORS.gray_500}
            onPress={() => setShow(false)} />
        </View>
      )}
    </>
  );
};

export default Date_time_picker;