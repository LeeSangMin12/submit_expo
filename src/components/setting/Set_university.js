import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { set_store_info } from '@/shared/js/common';
import { Drop_down } from '@/components/components';
import { Auto_complete } from '@/components/components';


const Set_university = (props) => {
  const [admission_year_arr, set_admission_year_arr] = useState([]);

  /**
   * 현재 년도를 기반으로 학번 arr를 만듬
   */
  useState(() => {
    let now_year = String(new Date().getFullYear()).slice(-2);
    let year_arr = [];
    for (let i = Number(now_year); i >= 10; i--) {
      year_arr.push(i);
    }
    const make_admission_year = year_arr.map((item) => {
      return {
        label: `${item}학번`,
        value: item
      };
    });
    set_admission_year_arr([...make_admission_year]);
  }, []);

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
        <Drop_down
          items={admission_year_arr}
          set_items={set_store_info}
        />
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