import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Fontisto, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';
import { set_store_info } from '@/shared/js/common';

const Set_alarm = (props) => {
  const { alarm_cycle } = useSelector(state => state.assignment_add);

  const [select_cycle, set_select_cycle] = useState(false);

  return (
    <View style={{ flex: 1, padding: 15 }}>

      {/* <View style={styles.input_container}>
        <TextInput
          value={props.name}
          style={styles.input}
          placeholder='주기를 선택해주세요'
          onChangeText={(label) => set_store_info('user', 'name', label)} />

        <Ionicons
          name="alarm-outline"
          size={24}
          color={COLORS.gray_500} />
      </View> */}

      {
        select_cycle === true ?
          <View style={styles.cycle.container} >
            <Pressable
              style={styles.cycle.pressable_container}
              onPress={() => { set_select_cycle(!select_cycle) }}>
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

              {['7', '6', '5', '4', '3', '2', '1'].map((cycle_value) => (
                <Pressable
                  key={cycle_value}
                  style={
                    alarm_cycle === cycle_value
                      ? styles.cycle.select_cycle
                      : styles.cycle.unselect_cycle
                  }
                  onPress={() => set_store_info('assignment_add', 'alarm_cycle', cycle_value)}
                >
                  <Text
                    style={
                      alarm_cycle === cycle_value
                        ? styles.cycle.select_cycle_text
                        : null
                    }
                  >
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
              placeholder="주기를 선택해주세요"
              editable={false}
              pointerEvents="none"
            />

            <Ionicons
              name="chevron-down"
              size={24}
              color="black" />
          </Pressable>
      }


      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder="기간을 선택해주세요"
          editable={false}
          value={props.nickname}
          onChangeText={(label) => set_store_info('user', 'nickname', label)}
        />

        <Ionicons
          name="chevron-down"
          size={24}
          color="black" />
      </View>

      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder="시간을 선택해주세요"
          editable={false}
          value={props.nickname}
          onChangeText={(label) => set_store_info('user', 'nickname', label)}
        />

        <Ionicons
          name="chevron-down"
          size={24}
          color="black" />
      </View>

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
  chip_container: {
    flexDirection: 'row',
  },
  cycle: {
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
    content_container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
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
    }
  }
});