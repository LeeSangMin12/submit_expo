import { useLayoutEffect, useState } from 'react';
import { View, Image, StyleSheet, Alert, Pressable, ScrollView, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox';

import { exec_request } from '@/shared/js/api';
import { set_store_info, show_toast, do_once } from '@/shared/js/common_function';
import { Drop_down, Custom_text, Custom_modal } from '@/components/components';
import Assignment_detail_modal from './Assignment_detail_modal/Assignment_detail_modal.js';
import COLORS from '@/shared/js/colors';
import search from '@/assets/img/icon/search.png';
import img_no_assignment_list from '@/assets/img/icon/no_assignment_list.png';

const Search_assignment_page = ({ navigation }) => {
  const { default_semester_id } = useSelector((state) => state.semester);

  const [university_assignment_list, set_university_assignment_list] = useState([]);
  const [university_grade_arr, set_university_grade_arr] = useState([
    { label: '1학년', value: '1' },
    { label: '2학년', value: '2' },
    { label: '3학년', value: '3' },
    { label: '4학년', value: '4' },
  ]);
  const [university_class_arr, set_university_class_arr] = useState([
    { label: 'A반', value: 'a' },
    { label: 'B반', value: 'b' },
    { label: 'C반', value: 'c' },
    { label: 'D반', value: 'd' },
    { label: 'E반', value: 'e' },
    { label: 'F반', value: 'f' },
  ]);
  const [university_grade, set_university_grade] = useState('');
  const [university_class, set_university_class] = useState('');

  const [assignment_detail_modal, set_assignment_detail_modal] = useState(false);
  const [selected_assignment, set_selected_assignment] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate('Bottom_navigation', { screen: '홈' })}>
          <Feather
            name="x"
            size={30}
            color="white"
          />
        </Pressable>),
      headerRight: () => (
        <Pressable onPress={do_once(add_assignment_list)}>
          <Feather
            name="check"
            size={30}
            color="white"
          />
        </Pressable>)
    });
  }, [navigation, university_assignment_list]);

  const add_assignment_list = async () => {
    const checked_assignment_list = university_assignment_list.filter((assignment) => assignment.is_checked === 'true');
    if (checked_assignment_list.length === 0) return Alert.alert('과제를 선택해 주세요');

    await api_assignment_add_assignment_list(checked_assignment_list);

    const assignment_list = await api_assignment_get_assignment_list();

    set_store_info('assignment', 'assignment_list', assignment_list);
    navigation.navigate('Bottom_navigation', { screen: '홈' });
    show_toast('과제가 등록되었습니다.');
  }

  /**
   * d-day를 화면에 표시해줌
   * @param {number} assignment_d_day 
   */
  const show_d_day = (assignment_d_day) => {
    if (assignment_d_day < 0) {
      return '';
    } else if (assignment_d_day >= 0) {
      return `D-${assignment_d_day}`
    }
  }

  const on_modal_close = () => {
    set_assignment_detail_modal(false);
  };

  const toggle_checkbox = async (assignment_id) => {
    let assignment_list = university_assignment_list.map((assignment) => {
      if (assignment_id === assignment.assignment_id) {
        return { ...assignment, is_checked: assignment.is_checked === 'false' ? 'true' : 'false' };
      }
      return assignment;
    });
    set_university_assignment_list(assignment_list);
  };

  /**
   * 학년과 반 기준으로 과제를 검색해준다.
   */
  const search_assignment = async () => {
    if (university_grade === '' || university_class === '') {
      Alert.alert('학년과 반을 선택해 주세요');
      return;
    }

    const university_assignment_list = await api_assignment_search_assignment();
    set_university_assignment_list(university_assignment_list)
  };

  /**
   * 과제 검색
   */
  const api_assignment_search_assignment = async () => {
    const params = {
      url: "assignment/search_assignment",
      university_grade: university_grade,
      university_class: university_class,
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  /**
   * 과제 리스트 추가
   */
  const api_assignment_add_assignment_list = async (checked_assignment_list) => {
    const params = {
      url: "assignment/add_assignment_list",
      semester_id: default_semester_id,
      assignment_list: checked_assignment_list,
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  /**
   * 과제 리스트 받아오기
   */
  const api_assignment_get_assignment_list = async () => {
    const params = {
      url: 'assignment/get_assignment_list',
      semester_id: default_semester_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.dropdown_container}>
          <Drop_down
            items={university_grade_arr}
            value={university_grade}
            set_items={set_university_grade_arr}
            set_value={set_university_grade}
            place_holder={'반'}
            container_style={[styles.dropdown, { marginHorizontal: 24 }]}
          />

          <Drop_down
            items={university_class_arr}
            value={university_class}
            set_items={set_university_class_arr}
            set_value={set_university_class}
            place_holder={'반'}
            container_style={styles.dropdown}
          />

        </View>

        <Pressable onPress={search_assignment}>
          <Image
            source={search}
            style={styles.search_img} />

        </Pressable>
      </View>

      <View style={[styles.divider, { height: 8 }]} />

      {
        university_assignment_list.length === 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={() => Linking.openURL('https://forms.gle/FdMSfs5E1E1v1rLG9')}>
              <Image
                source={img_no_assignment_list}
                style={{ width: 190, height: 250 }} />
            </Pressable>

          </View>
          :
          <ScrollView>
            {university_assignment_list.map((assignment, idx) => (
              <View style={styles.assignment_list_container} key={idx}>
                <Pressable
                  onPress={() => {
                    set_assignment_detail_modal(true)
                    set_selected_assignment(assignment);
                  }}
                  style={styles.assignment_container}>
                  <View>
                    <Custom_text style={styles.text_assignment_name}>{assignment.assignment_name} -
                      <Custom_text style={styles.text_assignment_classfication}>{assignment.classfication}</Custom_text>
                    </Custom_text>
                    <Custom_text style={styles.text_assignment_d_day}>{show_d_day(assignment.assignment_d_day)}</Custom_text>
                  </View>
                  <Checkbox
                    value={assignment.is_checked === 'false' ? false : true}
                    onValueChange={() => toggle_checkbox(assignment.assignment_id)}
                    style={styles.assignment_checkbox}
                    color={assignment.is_checked === 'false' ? null : '#EB4F5D'}
                  />
                </Pressable>
                <View style={styles.divider} />

                <Custom_modal
                  modal_visible={assignment_detail_modal}
                  position='bottom'
                  bottom_height='85%'
                  content_component={() => <Assignment_detail_modal
                    assignment_info={selected_assignment}
                    on_close={on_modal_close} />}
                />
              </View>
            ))}

          </ScrollView>
      }

    </>
  );
}

export default Search_assignment_page;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 100,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdown_container: {
    flexDirection: 'row'
  },
  dropdown: {
    width: 100,
    marginVertical: 30,
  },
  search_img: {
    width: 40,
    height: 40,
    marginRight: 13
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
  assignment_list_container: {
    paddingHorizontal: 20
  },
  assignment_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  text_assignment_name: {
    fontSize: 16
  },
  text_assignment_classfication: {
    fontSize: 14
  },
  text_assignment_d_day: {
    fontSize: 12,
    marginBottom: 10,
    color: '#EB4F5D'
  },
  assignment_checkbox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.gray_500,
    backgroundColor: '#F4F4F4'
  }
});