import { useEffect } from 'react';
import { Text, ScrollView, Pressable, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { set_store_info } from '@/shared/js/common';
import { exec_request } from "@/shared/js/api";
import COLORS from '@/shared/js/colors';

const Set_semester = () => {
  const navigation = useNavigation();
  const {
    semester_list,
  } = useSelector((state) => state.semester);

  useEffect(() => {
    const fetch_data = async () => {
      const semesters = await api_semester_get_semester_list();

      set_store_info('semester', 'semester_list', semesters);
    };
    fetch_data();
  }, []);

  /**
   * 캘린더 지우기
   * : 기본 캘린더인 경우 못지움
   */
  const delete_semester = (default_semester, semester_id) => {
    if (default_semester === 'true') {
      Alert.alert('기본 캘린더는 지울 수 없습니다.')
      return;
    } else {
      Alert.alert('삭제하시겠습니까?', '삭제시 등록한 모든 과제가 사라집니다.', [
        {
          text: '취소', style: 'cancel',
        },
        {
          text: '삭제', onPress: async () => {
            const delete_semester = api_semester_delete_semester(semester_id)
            if (delete_semester) {
              const semesters = await api_semester_get_semester_list();

              set_store_info('semester', 'semester_list', semesters);
            }
          }
        },
      ]);
    }
  }

  /**
   * 캘린더 리스트를 조회
   */
  const api_semester_get_semester_list = async () => {
    const params = {
      url: 'semester/get_semester_list'
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data.semester_list;
    }
  };

  /**
   * 기본 캘린더 설정
   */
  const api_semester_set_default_semester = async (semester_id) => {
    const params = {
      url: 'semester/set_default_semester',
      default_semester_id: semester_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return true
    }
  };

  /**
   * 캘린더 삭제
   */
  const api_semester_delete_semester = async (semester_id) => {
    const params = {
      url: 'semester/delete_semester',
      semester_id: semester_id,
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  const api_assignment_get_assignment_list = async (default_semester_id) => {
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
    <ScrollView>
      {
        semester_list.map((val, idx) => (
          <Pressable
            style={{
              justifyContent: 'space-evenly',
              height: 110,
              borderWidth: 1,
              borderColor: COLORS.gray_490_inactive,
              borderRadius: 8,
              margin: 15,
              paddingHorizontal: 12
            }}
            key={idx}
            onPress={async () => {
              await api_semester_set_default_semester(val.semester_id);
              const semester_list = await api_semester_get_semester_list();
              const default_semester = semester_list.find(item => item.default_semester === 'true');
              const assignment_list = await api_assignment_get_assignment_list(default_semester.semester_id);

              const month =
                default_semester.semester.split(' ')[1] === '1학기' ? 3 :
                  default_semester.semester.split(' ')[1] === '여름학기' ? 6 :
                    default_semester.semester.split(' ')[1] === '2학기' ? 9 :
                      default_semester.semester.split(' ')[1] === '겨울학기' ? 12 : '';

              set_store_info('semester', 'semester_list', semester_list);
              set_store_info('semester', 'default_semester', default_semester.semester);
              set_store_info('semester', 'default_semester_id', default_semester.semester_id);
              set_store_info('calendar', 'year', parseInt(default_semester.semester.split(' ')[0].replace('년', '')));
              set_store_info('calendar', 'month', parseInt(month));
              set_store_info('assignment', 'assignment_list', assignment_list);
              navigation.goBack();
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {val.semester} {val.default_semester === 'true' ? <Ionicons name="checkmark-circle" size={22} color={COLORS.primary_500} /> : ''}
              </Text>
              <Text>
                <Feather
                  name="x"
                  size={30}
                  onPress={() => delete_semester(val.default_semester, val.semester_id)} />
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: COLORS.primary_500 }}>{val.semester_name}</Text>
          </Pressable>
        ))
      }
    </ScrollView>
  );
};

export default Set_semester;