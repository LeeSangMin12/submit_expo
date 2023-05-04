import { View, Text, ScrollView, Pressable, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import COLORS from '@/shared/js/colors';


const Set_semester = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Pressable style={{
        justifyContent: 'space-evenly',
        height: 110,
        borderWidth: 1,
        borderColor: COLORS.gray_490_inactive,
        borderRadius: 8,
        margin: 15,
        paddingHorizontal: 12
      }}
        onPress={() => navigation.navigate('홈')}
      >
        <Text style={{ fontSize: 16, fontWeight: '600' }}>2023년 1학기</Text>
        <Text style={{ fontSize: 14, color: COLORS.primary_500 }}>캘린더</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Set_semester;