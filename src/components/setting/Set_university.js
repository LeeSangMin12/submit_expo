import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

import { set_store_info } from '@/shared/js/common';
import { Drop_down } from '@/components/components';
import { Auto_complete } from '@/components/components';

const Set_university = (props) => {
  const [admission_year_arr, set_admission_year_arr] = useState([]);

  /**
   * 대학교 이름을 가져옴.
   * @param {string} filter_token - 사용자가 입력한 값
   */
  const get_university_suggesstions = async (filter_token) => {
    try {
      const response = await axios.get('http://www.career.go.kr/cnet/openapi/getOpenApi', {
        params: {
          apiKey: '06c2cdaf1d5fe582073b2ed44573c969',
          svcType: 'api',
          svcCode: 'SCHOOL',
          contentType: 'json',
          gubun: 'univ_list',
          searchSchulNm: filter_token,
        }
      });
      const data = response.data.dataSearch.content;
      const suggestions = data
        .filter(item => item.schoolName.toLowerCase().includes(filter_token))
        .map(item => ({
          title: item.schoolName,
        }));

      return suggestions;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  /**
   * 학과 이름을 가져옴.
   * @param {string} filter_token - 사용자가 입력한 값
   */
  const get_department_suggesstions = async (filter_token) => {
    try {
      const response = await axios.get('http://www.career.go.kr/cnet/openapi/getOpenApi', {
        params: {
          apiKey: '06c2cdaf1d5fe582073b2ed44573c969',
          svcType: 'api',
          svcCode: 'MAJOR',
          contentType: 'json',
          gubun: 'univ_list',
          searchTitle: filter_token,
          perPage: '1000'
        }
      });
      const data = response.data.dataSearch.content;
      const suggestions = data
        .filter(item => item.mClass.toLowerCase().includes(filter_token))
        .map(item => ({
          title: item.mClass,
        }));

      return suggestions;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  /**
   * 현재 년도를 기반으로 입학년도 arr를 만듬
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

  /**
  * 대학교 autocomplete 값 설정
  */
  const university_set_value = (now_value) => {
    set_store_info('user', 'university', now_value);
  };

  /**
  * 학과 autocomplete 값 설정
  */
  const department_set_value = (now_value) => {
    set_store_info('user', 'department', now_value);
  };

  /**
   * 입학년도 dropdown의 값 설정
   */
  const admission_year_set_value = (now_value) => {
    set_store_info('user', 'admission_year', now_value);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.input_container, Platform.select({ ios: { zIndex: 100 } })]}>
        <Text style={styles.label}>대학교</Text>
        <Auto_complete
          place_holder={'학교명을 입력해 주세요'}
          get_data_suggesstions={get_university_suggesstions}
          set_value={university_set_value}
        />
      </View >

      <View style={[styles.input_container, Platform.select({ ios: { zIndex: 99 } })]}>
        <Text style={styles.label}>학과</Text>
        <Auto_complete
          place_holder={'학과명을 입력해 주세요'}
          get_data_suggesstions={get_department_suggesstions}
          set_value={department_set_value}
        />
      </View >

      <View style={[styles.input_container, Platform.select({ ios: { zIndex: 98 } })]}>
        <Text style={styles.label}>입학년도</Text>
        <Drop_down
          items={admission_year_arr}
          value={props.admission_year}
          set_items={set_admission_year_arr}
          set_value={admission_year_set_value}
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
    marginVertical: 12,
  },
});