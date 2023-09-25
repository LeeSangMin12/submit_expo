import { View, StyleSheet, Pressable } from 'react-native';
import { Feather, } from '@expo/vector-icons'

import { Custom_text, Custom_text_input } from '@/components/components';
import COLORS from '@/shared/js/colors';

const Assignment_detail_modal = ({ assignment_info, on_close }) => {

  /**
   * 날짜 형식 변환.
   * : "2023/10/17 00:00:00" => 23년 10월 17일
   */
  const convert_date_format = (registration_date) => {
    const year = registration_date.substring(2, 4);
    const month = registration_date.substring(5, 7);
    const date = registration_date.substring(8, 10);

    return `${year}년 ${month}월 ${date}일`;
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.go_back_container} onPress={on_close}>
          <Feather
            name="x"
            size={30}
            color="white"
          />
        </Pressable>

        <Custom_text style={styles.modal_title_container}>과제 세부사항</Custom_text>
        <View style={{ flex: 1 }} />
      </View>

      <View style={styles.assignment_name_container}>
        <Custom_text style={styles.assignment_name_text}>{assignment_info.assignment_name}</Custom_text>
      </View>
      <View style={[styles.divider, { height: 1 }]} />

      <View style={[styles.assignment_content_container, { marginBottom: 10 }]}>
        <Custom_text style={styles.assignment_submission_date_title}>제출 날짜</Custom_text>
        <Custom_text style={styles.assignment_submission_date}>{convert_date_format(assignment_info.registration_date)}</Custom_text>
      </View>
      <View style={[styles.divider, { height: 1 }]} />

      <View style={[styles.assignment_content_container, { marginBottom: 10 }]}>
        <Custom_text style={styles.assignment_professor_name_text}>교수명</Custom_text>
        <Custom_text_input
          style={styles.text_input}
          value={assignment_info.professor_name}
          borderBottomWidth='1'
          borderBottomColor={COLORS.gray_490_inactive}
          editable={false}
        />
      </View>


      <View style={styles.input_container}>
        <Custom_text_input
          style={styles.textarea_input}
          multiline
          textAlignVertical="top"
          numberOfLines={4}
          maxLength={100}
          placeholderTextColor={COLORS.gray_510}
          editable={false}
          value={assignment_info.assignment_description}
        />
      </View>
    </>
  );
};

export default Assignment_detail_modal;

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#EB4F5D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  go_back_container: {
    flex: 1,
    marginLeft: 15
  },
  modal_title_container: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontFamily: 'medium',
    textAlign: 'center',
    marginRight: 15
  },
  assignment_name_container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  assignment_name_text: {
    fontFamily: 'medium',
    fontSize: 18
  },
  assignment_content_container: {
    height: 60,
    justifyContent: 'center',
    padding: 20,
  },
  assignment_submission_date_title: {
    fontSize: 12,
    marginBottom: 8
  },
  assignment_submission_date: {
    fontSize: 16,
    marginLeft: 10
  },
  assignment_professor_name_text: {
    fontSize: 12,
    marginBottom: 8
  },
  input_container: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  text_input: {
    fontSize: 16,
    marginLeft: 10,
    height: 30
  },
  textarea_input: {
    padding: 10,
    height: 200,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.gray_490_inactive,
    borderRadius: 6,
    width: '100%'
  },
  divider: {
    backgroundColor: COLORS.gray_490_inactive,
  }
});