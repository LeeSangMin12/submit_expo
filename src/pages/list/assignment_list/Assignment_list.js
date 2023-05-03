import { Text, View, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';

import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';
import { useState } from 'react';

const Assignment_list = () => {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={36}
            title='경영학개론'
            textStyle={{ fontSize: 17, textDecorationLine: checked ? 'line-through' : 'none' }}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={{ marginRight: 15 }}>
          <Chip
            label="완료"
            background_color={COLORS.gray_470_bg} />
        </View>

      </View>
      <View style={styles.divider} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
        <CheckBox
          checked={checked}
          onPress={toggleCheckbox}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={'checkbox-blank-outline'}
          size={36}
          title='네크워크'
          textStyle={{ fontSize: 17, textDecorationLine: checked ? 'line-through' : 'none' }}
          checkedColor={COLORS.primary_500}
        />
        <View style={{ marginRight: 15 }}>
          <Chip
            label="설정"
            background_color={COLORS.primary_500} />
        </View>
      </View>
      <View style={styles.divider} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }}>
        <CheckBox
          checked={checked}
          onPress={toggleCheckbox}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={'checkbox-blank-outline'}
          size={36}
          title='간호 심리학'
          textStyle={{ fontSize: 17, textDecorationLine: checked ? 'line-through' : 'none' }}
          numberOfLines={1}
          checkedColor={COLORS.primary_500}
        />
        <View style={{ marginRight: 15 }}>
          <Chip
            label="예정"
            background_color={COLORS.primary_490} />
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

export default Assignment_list;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_500
  },
});


