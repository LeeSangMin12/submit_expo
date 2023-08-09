import { useState, } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, } from 'react-redux';

import COLORS from '@/shared/js/colors';
import { Date_time_picker, Calendar_mini } from '@/components/components';
import { set_store_info } from '@/shared/js/common_function';

const Set_alarm = (props) => {
  const { alarm_cycle, alarm_period, alarm_time } = useSelector(state => state.assignment_add);

  const [select_cycle, set_select_cycle] = useState(false);
  const [select_period, set_select_period] = useState(false);
  const [select_time, set_select_time] = useState(false);

  return (
    <View style={{ flex: 1, padding: 15 }}>
      {
        select_cycle === true ?
          <View style={styles.select_alarm.container} >
            <Pressable
              style={styles.select_alarm.pressable_container}
              onPress={() => {
                set_select_cycle(!select_cycle)
              }}>
              <TextInput
                style={styles.input}
                placeholder="몇일 주기로"
                editable={false}
                pointerEvents="none" />

              <Ionicons
                name="chevron-up"
                size={24}
                color="black" />
            </Pressable>

            <View style={styles.cycle.content_container}>

              {['1', '2', '3', '4', '5', '6', '7'].map((cycle_value) => (
                <Pressable
                  key={cycle_value}
                  style={
                    alarm_cycle === cycle_value
                      ? styles.cycle.select_cycle
                      : styles.cycle.unselect_cycle
                  }
                  onPress={() => {
                    set_store_info('assignment_add', 'alarm_cycle', cycle_value)
                  }}
                >
                  <Text
                    style={
                      alarm_cycle === cycle_value
                        ? styles.cycle.select_cycle_text
                        : null}>
                    {cycle_value}
                  </Text>
                </Pressable>
              ))}
            </View>

          </View>
          :
          <Pressable
            style={styles.input_container}
            onPress={() => { set_select_cycle(!select_cycle) }}>
            <TextInput
              style={styles.input}
              placeholder={alarm_cycle !== '' ? `${alarm_cycle}일 주기로` : '주기를 선택해주세요'}
              editable={false}
              pointerEvents="none"
            />

            <Ionicons
              name="chevron-down"
              size={24}
              color="black" />
          </Pressable>
      }

      {
        select_period === true ?
          <View style={styles.select_alarm.container} >
            <Pressable
              style={styles.select_alarm.pressable_container}
              onPress={() => {
                set_select_period(!select_period)
              }}>
              <TextInput
                style={styles.input}
                placeholder="몇일전부터"
                editable={false}
                pointerEvents="none" />

              <Ionicons
                name="chevron-up"
                size={24}
                color="black" />
            </Pressable>

            <View style={styles.time.content_container}>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text>알림 시작일</Text>
              </View>

              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text>과제 등록일</Text>
              </View>

              <Calendar_mini />
            </View>
          </View>
          :
          <Pressable
            style={styles.input_container}
            onPress={() => { set_select_period(!select_period) }}>
            <TextInput
              style={styles.input}
              placeholder="기간을 선택해주세요"
              editable={false}
              pointerEvents="none"
            />

            <Ionicons
              name="chevron-down"
              size={24}
              color="black" />
          </Pressable>
      }

      {
        select_time === true ?
          <View style={styles.select_alarm.container} >
            <Pressable
              style={styles.select_alarm.pressable_container}
              onPress={() => {
                set_select_time(!select_time)
              }}>
              <TextInput
                style={styles.input}
                placeholder="몇시에"
                editable={false}
                pointerEvents="none" />

              <Ionicons
                name="chevron-up"
                size={24}
                color="black" />
            </Pressable>

            <View style={styles.time.content_container}>
              <Date_time_picker
                picker_mode='time'
                time_title='등록시간' />
            </View>
          </View>
          :
          <Pressable
            style={styles.input_container}
            onPress={() => { set_select_time(!select_time) }}>
            <TextInput
              style={styles.input}
              placeholder="시간을 선택해주세요"
              editable={false}
              pointerEvents="none"
            />

            <Ionicons
              name="chevron-down"
              size={24}
              color="black" />
          </Pressable>
      }

    </View >
  );
};

export default Set_alarm;

const styles = StyleSheet.create({
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 20
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    paddingHorizontal: 3,
  },
  select_alarm: {
    container: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: COLORS.gray_480,
      borderRadius: 6,
    },
    pressable_container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.gray_480,
      paddingHorizontal: 12,
    },
  },
  cycle: {
    content_container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    select_cycle: {
      width: 35,
      height: 35,
      borderRadius: 50,
      backgroundColor: COLORS.primary_500,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    select_cycle_text: {
      color: COLORS.white
    },
    unselect_cycle: {
      width: 35,
      height: 35,
      borderRadius: 50,
      backgroundColor: COLORS.gray_470_bg,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  calendar: {

  },
  time: {
    content_container: {
      marginTop: 10,
      padding: 10,
    },
  }
});