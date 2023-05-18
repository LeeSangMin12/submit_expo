import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Pressable, } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useSelector } from 'react-redux';
import { CheckBox } from '@rneui/themed';
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import { set_store_info } from '@/shared/js/common';
import { Chip, Custom_modal, Button, Date_time_picker } from '@/components/components';


const Assignment_list = () => {
  const {
    attached_files,
  } = useSelector((state) => state.assignment_submit);

  const [checked, setChecked] = useState(true);
  const [assignment_submit_modal, set_assignment_submit_modal] = useState(false);
  const [submit_way, set_submit_way] = useState('email');
  const toggle_checkbox = () => setChecked(!checked);

  const selectFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      if (file.type === 'success') {
        console.log('Selected file:', file.uri);
        set_store_info('assignment_submit', 'attached_files', file.uri);
        // 여기서 파일을 업로드하거나 처리합니다.
      }
    } catch (error) {
      console.log('Error selecting file:', error);
    }
  };

  const Modal_assignment_submit = () => {
    return (
      <KeyboardAvoidingView behavior='position' contentContainerStyle={{ flex: 1 }} style={{ flex: 1, width: '100%' }}>
        <View style={styles.Modal_assignment_submit.container}>

          <View style={styles.Modal_assignment_submit.header_container}>
            <View style={{ flex: 1, }}>
              <Ionicons name="close-outline" size={30} color="black" style={{ marginLeft: 10 }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.Modal_assignment_submit.header_text}>제출하기</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>

          <View style={styles.divider} />

          <ScrollView style={styles.Modal_assignment_submit.content_container}>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 9, paddingHorizontal: 15 }}>
              <Chip
                label="E-mail"
                selected={submit_way === 'email'}
                on_press={() => set_submit_way('email')} />

              <Chip
                label="LMS"
                selected={submit_way === 'lms'}
                on_press={() => set_submit_way('lms')} />
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={{ height: 5, backgroundColor: COLORS.gray_480, width: '90%' }} />
            </View>

            {submit_way === 'email' ?
              < >
                <View style={styles.Modal_assignment_submit.input_container}>
                  <Date_time_picker />
                </View>

                <View style={{ alignItems: 'center' }}>
                  <TextInput
                    style={styles.Modal_assignment_submit.input}
                    placeholder='메일제목'
                    placeholderTextColor={COLORS.gray_500} />
                </View>

                <View style={styles.Modal_assignment_submit.input_container}>
                  <TextInput
                    style={styles.Modal_assignment_submit.input}
                    placeholder='제출할 메일주소'
                    placeholderTextColor={COLORS.gray_500} />
                </View>

                <View style={styles.Modal_assignment_submit.input_container} >
                  <TextInput
                    style={{
                      padding: 10,
                      height: 120,
                      fontSize: 15,
                      borderWidth: 1,
                      borderColor: COLORS.gray_480,
                      width: '90%'
                    }}
                    multiline
                    returnKeyType='done'
                    numberOfLines={4}
                    maxLength={100}
                    placeholder='과제내용'
                    placeholderTextColor={COLORS.gray_500} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 25, }}>
                  <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Pressable style={{ flexDirection: 'row', }} onPress={selectFile}>
                      <Fontisto name="link" size={20} color={COLORS.gray_500} />
                      <Text style={{ color: COLORS.gray_500, marginLeft: 10 }}>{attached_files}</Text>
                    </Pressable>
                    <MaterialIcons
                      name="cancel"
                      size={27}
                      color={COLORS.gray_500}
                      onPress={() => { console.log('hi') }} />
                  </View>
                </View>

              </>
              :
              <>
                <View style={styles.Modal_assignment_submit.input_container}>
                  <TextInput
                    style={styles.Modal_assignment_submit.input}
                    placeholder='링크를 입력해주세요'
                    placeholderTextColor={COLORS.gray_500} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 25, }}>
                  <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Pressable style={{ flexDirection: 'row', }} onPress={() => { console.log('hi') }}>
                      <Fontisto name="link" size={20} color={COLORS.gray_500} />
                      <Text style={{ color: COLORS.gray_500, marginLeft: 10 }}>첨부파일 없음</Text>
                    </Pressable>
                    <MaterialIcons
                      name="cancel"
                      size={27}
                      color={COLORS.gray_500}
                      onPress={() => { console.log('hi') }} />
                  </View>
                </View>
              </>
            }

          </ScrollView>

          <View style={styles.Modal_assignment_submit.cancel_button_container}>
            <Button
              title="저장하기"
              on_press={() => set_assignment_submit_modal(false)}
              style={styles.Modal_assignment_submit.btn_cancel} />
          </View>


        </View >
      </KeyboardAvoidingView >
    );
  };

  return (
    <View>
      <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={36}
            title='경영학개론'
            textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={styles.assignment.chip_container}>
          <Chip
            label="완료"
            on_press={() => { set_assignment_submit_modal(true) }}
            background_color={COLORS.gray_470_bg} />
        </View>
      </View>
      <View style={styles.divider} />



      <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={36}
            title='네크워크'
            textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={styles.assignment.chip_container}>
          <Chip
            label="설정"
            background_color={COLORS.primary_500} />
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={36}
            title='간호 심리학'
            textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={styles.assignment.chip_container}>
          <Chip
            label="예정"
            background_color={COLORS.primary_490} />
        </View>
      </View>
      <View style={styles.divider} />

      <Custom_modal
        modal_visible={assignment_submit_modal}
        position='bottom'
        bottom_height='85%'
        content_component={() => <Modal_assignment_submit />}
      />
    </View>
  );
}

export default Assignment_list;

const styles = StyleSheet.create({
  assignment: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2
    },
    title_container: {
      flexDirection: 'row'
    },
    checkbox: {
      fontSize: 17,
    },
    chip_container: {
      marginRight: 15
    }
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
  Modal_assignment_submit: {
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
    },
    header_container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
    },
    header_text: {
      fontSize: 20
    },
    content_container: {
      flex: 1,
      padding: 5,
    },
    input_container: {
      marginTop: 25,
      alignItems: 'center'
    },
    input: {
      height: 50,
      fontSize: 15,
      borderBottomWidth: 1,
      borderColor: COLORS.gray_480,
      paddingHorizontal: 6,
      width: '90%'
    },
    edit_img_container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray_490_inactive,
    },
    cancel_button_container: {
      alignItems: 'center'
    },
    btn_cancel: {
      width: '90%',
      marginBottom: 15,
    }
  }
});


