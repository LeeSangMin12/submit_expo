import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';

import COLORS from '@/shared/js/colors';
import { set_store_info } from '@/shared/js/common';
import { Drop_down } from '@/components/components';

const Set_university = (props) => {

  return (
    <>
      <View>
        <Text style={styles.label}>입학년도</Text>

        <Drop_down />
      </View >
    </>
  );
};

export default Set_university;

const styles = StyleSheet.create({
  input_container: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 17,
  },
});