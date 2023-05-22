import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import COLORS from '@/shared/js/colors';
import { add_attached_file, remove_attached_file } from '@/store/modules/assignment_submit_slice';
import { Chip, Button, Date_time_picker } from '@/components/components';


const Submit_assignment = () => {
  const {
    attached_files,
  } = useSelector((state) => state.assignment_submit);

  const [submit_method, set_submit_method] = useState('email');

  const select_file = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      if (file.type === 'success') {
        dispatch(add_attached_file({
          name: file.name,
          size: file.size,
          uri: file.uri
        }));
      }
    } catch (error) {
      console.log('Error selecting file:', error);
    }
  };

  /**
   * 선택된 파일 선택 해제
   * @param {nul} file_num : 선택 해제할 파일 번호
   */
  const de_select_file = (file_num) => {
    dispatch(remove_attached_file(file_num));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}> */}
      <ScrollView style={{ flex: 1 }} >
        {/* <TextInput
          style={{
            fontSize: 15,
            borderWidth: 1,
            borderColor: COLORS.gray_480,
            width: '100%',
            marginTop: 100,
          }}
          multiline={true}
          textAlignVertical='top'
          scrollEnabled={false}
          placeholder='과제내용'
          placeholderTextColor={COLORS.gray_500} /> */}

        <TextInput
          style={{
            height: 120,
            borderWidth: 1,
            borderColor: COLORS.gray_480,
            marginTop: 100,
          }}
          multiline={true}
          textAlignVertical='top'
          placeholder='테스트' />

        <TextInput
          style={{
            height: 120,
            borderWidth: 1,
            borderColor: COLORS.gray_480,
            marginTop: 100,
          }}
          multiline={true}
          textAlignVertical='top'
          placeholder='테스트' />

        <TextInput
          style={{
            height: 120,
            borderWidth: 1,
            borderColor: COLORS.gray_480,
            marginTop: 100,
          }}
          multiline={true}
          textAlignVertical='top'
          placeholder='테스트' />


      </ScrollView>
    </KeyboardAvoidingView>
    //  <ScrollView style={styles.Modal_assignment_submit.content_container}> 

    //  <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 9, paddingHorizontal: 5 }}>
    //   <Chip
    //     label="E-mail"
    //     selected={submit_method === 'email'}
    //     on_press={() => set_submit_method('email')} />

    //   <Chip
    //     label="LMS"
    //     selected={submit_method === 'lms'}
    //     on_press={() => set_submit_method('lms')} />
    // </View> 

    //  <View style={{ alignItems: 'center' }}>
    //   <View style={{ height: 5, backgroundColor: COLORS.gray_480, width: '95%' }} />
    // </View> 

    //  {submit_method === 'email' ?
    //   < >
    //     <View style={styles.Modal_assignment_submit.input_container}>
    //       <Date_time_picker />
    //     </View>

    //     <View style={{ alignItems: 'center' }}>
    //       <TextInput
    //         style={styles.Modal_assignment_submit.input}
    //         placeholder='제출할 메일주소'
    //         placeholderTextColor={COLORS.gray_500} />
    //     </View>

    //     <View style={styles.Modal_assignment_submit.input_container}>
    //       <TextInput
    //         style={styles.Modal_assignment_submit.input}
    //         placeholder='메일 제목'
    //         placeholderTextColor={COLORS.gray_500} />
    //     </View>

    //     <View style={styles.Modal_assignment_submit.input_container} >
    //       <TextInput
    //         style={{
    //           padding: 10,
    //           height: 120,
    //           fontSize: 15,
    //           borderWidth: 1,
    //           borderColor: COLORS.gray_480,
    //           width: '100%'
    //         }}
    //         multiline
    //         numberOfLines={4}
    //         maxLength={100}
    //         placeholder='이게안됨'
    //         placeholderTextColor={COLORS.gray_500} />
    //     </View>

    // <View style={styles.Modal_assignment_submit.input_container} >
    // <TextInput
    //   style={{
    //     padding: 10,
    //     height: 120,
    //     fontSize: 15,
    //     borderWidth: 1,
    //     borderColor: COLORS.gray_480,
    //     width: '100%'
    //   }}
    //   multiline
    //   numberOfLines={4}
    //   maxLength={100}
    //   placeholder='과제내용'
    //   placeholderTextColor={COLORS.gray_500} />
    // </View>

    //     <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 25, }}>
    //       <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //         <Pressable style={{ flexDirection: 'row', }} onPress={select_file}>
    //           <Fontisto name="link" size={20} color={COLORS.gray_500} />
    //           <Text style={{ color: COLORS.gray_500, marginLeft: 10 }}>{attached_files}</Text>
    //         </Pressable>
    //         <MaterialIcons
    //           name="cancel"
    //           size={27}
    //           color={COLORS.gray_500}
    //           onPress={() => { console.log('hi') }} />
    //       </View>
    //     </View>

    //   </>
    //   :
    //   <>
    //     <View style={styles.Modal_assignment_submit.input_container}>
    //       <TextInput
    //         style={styles.Modal_assignment_submit.input}
    //         placeholder='링크를 입력해주세요'
    //         placeholderTextColor={COLORS.gray_500} />
    //     </View>

    //     <View style={{ marginTop: 30 }}>
    //       <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 7, }}>
    //         <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //           <Pressable style={{ flexDirection: 'row', }} onPress={select_file}>
    //             <Fontisto name="link" size={20} color={COLORS.gray_500} />
    //             <Text style={{ color: COLORS.gray_500, marginLeft: 10 }}>첨부파일 없음</Text>
    //           </Pressable>
    //         </View>
    //       </View>
    //       {
    //         attached_files.map((val, idx) => {
    //           return (
    //             <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 7, }} key={idx}>
    //               <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <Pressable style={{ flexDirection: 'row', }} >
    //                   <Fontisto name="link" size={20} color={COLORS.primary_500} />
    //                   <Text style={{ color: COLORS.black_500, marginLeft: 10, maxWidth: '80%', }} numberOfLines='1' >{val.name}</Text>
    //                 </Pressable>
    //                 <MaterialIcons
    //                   name="cancel"
    //                   size={26}
    //                   color={COLORS.gray_500}
    //                   onPress={() => de_select_file(idx)} />
    //               </View>
    //             </View>
    //           )
    //         })
    //       }
    //     </View>
    //   </>
    // } 
  );
};

export default Submit_assignment;

const styles = StyleSheet.create({
  Modal_assignment_submit: {
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
      paddingHorizontal: 18,
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
      width: '100%'
    },
  }
});