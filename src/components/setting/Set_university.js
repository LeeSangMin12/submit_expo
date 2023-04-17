import { View, Text, StyleSheet } from 'react-native';

import COLORS from '@/shared/js/colors';
import { set_store_info } from '@/shared/js/common';
import { Drop_down } from '@/components/components';
import { Auto_complete } from '@/components/components';

const Set_university = (props) => {

  return (
    <View style={styles.container}>
      <View style={[styles.input_container, Platform.select({ ios: { zIndex: 100 } })]}>
        <Text style={styles.label}>대학교</Text>
        <Auto_complete />
      </View >

      <View style={[styles.input_container, Platform.select({ ios: { zIndex: 99 } })]}>
        <Text style={styles.label}>학과</Text>
        <Auto_complete />
      </View >

      <View style={[styles.input_container, Platform.select({ ios: { zIndex: 98 } })]}>
        <Text style={styles.label}>학번</Text>
        <Drop_down />
      </View >
    </View>
  );
};

export default Set_university;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input_container: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
});