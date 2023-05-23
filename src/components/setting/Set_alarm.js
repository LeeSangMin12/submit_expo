import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Fontisto, MaterialIcons, Ionicons } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';
import { set_store_info } from '@/shared/js/common';

const Set_alarm = (props) => {
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
          <Pressable style={{
            marginBottom: 20,
            borderWidth: 1,
            borderColor: COLORS.gray_470_bg,
            borderRadius: 6,
          }} onPress={() => { set_select_cycle(!select_cycle) }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',

              backgroundColor: COLORS.gray_480,

              paddingHorizontal: 12,
            }}>
              <TextInput
                style={styles.input}
                placeholder="몇일 주기로"
                editable={false}
                value={props.nickname}
                onChangeText={(label) => set_store_info('user', 'nickname', label)}
              />

              <Ionicons
                name="chevron-up"
                size={24}
                color="black" />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>

              <View style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: COLORS.primary_500,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white' }}>7</Text>
              </View>

              <View style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: COLORS.primary_500,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white' }}>6</Text>
              </View>

              <View style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: COLORS.primary_500,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white' }}>5</Text>
              </View>

              <View style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: COLORS.primary_500,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white' }}>4</Text>
              </View>

              <View style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: COLORS.primary_500,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white' }}>3</Text>
              </View>

              <View style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: COLORS.primary_500,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white' }}>2</Text>
              </View>

              <View style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: COLORS.primary_500,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white' }}>1</Text>
              </View>

            </View>

          </Pressable>
          :
          <Pressable style={styles.input_container} onPress={() => { set_select_cycle(!select_cycle) }}>
            <TextInput
              style={styles.input}
              placeholder="주기를 선택해주세요"
              editable={false}
              value={props.nickname}
              onChangeText={(label) => set_store_info('user', 'nickname', label)}
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
});