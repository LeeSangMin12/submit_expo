import { useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';

import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';

const Assignment_list = () => {
  const navigation = useNavigation();

  const [checked, setChecked] = useState(true);
  const toggle_checkbox = () => setChecked(!checked);

  return (
    <>
      <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={36}
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

      <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={36}
            title='네크워크'
            textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={styles.assignment.chip_container}>
          <Chip
            label="설정"
            on_press={() => navigation.navigate('제출하기')}
            background_color={COLORS.primary_500} />
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={36}
            title='간호 심리학'
            textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={styles.assignment.chip_container}>
          <Chip
            label="예정"
            background_color={COLORS.primary_490} />
        </View>
      </View>
      <View style={styles.divider} />

    </>
  );
}

export default Assignment_list;

const styles = StyleSheet.create({
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
      fontSize: 17,
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


