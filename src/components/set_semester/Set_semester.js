import { Text, ScrollView, Pressable } from 'react-native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { exec_request } from "@/shared/js/api";
import { set_store_info } from '@/shared/js/common';
import COLORS from '@/shared/js/colors';

const Set_semester = () => {
  const navigation = useNavigation();
  const {
    semester_list,
  } = useSelector((state) => state.semester);

  useEffect(() => {
    const fetch_data = async () => {
      const semesters = await api_semester_get_semester();

      set_store_info('semester', 'semester_list', semesters);
    };
    fetch_data();
  }, []);

  /**
   * 시간표 리스트를 조회해온다.
   */
  const api_semester_get_semester = async () => {
    const params = {
      url: 'semester/get_semester'
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data.selected_semesters;
    }
  }

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
          // onPress={() => navigation.navigate('홈')}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{val.semester}</Text>
            <Text style={{ fontSize: 14, color: COLORS.primary_500 }}>{val.semester_name}</Text>
          </Pressable>
        ))
      }
    </ScrollView>
  );
};

export default Set_semester;