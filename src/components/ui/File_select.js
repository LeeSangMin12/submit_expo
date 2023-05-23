import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useSelector, useDispatch } from 'react-redux';

import COLORS from '@/shared/js/colors';


const File_select = ({ file_arr, select, de_select }) => {

  const select_file = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      if (file.type === 'success') {
        select(file);
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
    de_select(file_num);
  }

  return (
    <>
      <View style={styles.file_container}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable style={{ flexDirection: 'row', }} onPress={select_file}>
            <Fontisto name="link" size={20} color={COLORS.gray_500} />
            <Text style={{ color: COLORS.gray_500, marginLeft: 10 }}>첨부파일 추가</Text>
          </Pressable>
        </View>
      </View>
      {
        file_arr.map((val, idx) => {
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 7, }} key={idx}>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable style={{ flexDirection: 'row', }} >
                  <Fontisto name="link" size={20} color={COLORS.primary_500} />
                  <Text style={{ color: COLORS.black_500, marginLeft: 10, maxWidth: '80%', }} numberOfLines='1' >{val.name}</Text>
                </Pressable>
                <MaterialIcons
                  name="cancel"
                  size={26}
                  color={COLORS.gray_500}
                  onPress={() => de_select_file(idx)} />
              </View>
            </View>
          )
        })
      }
    </>
  );
}

export default File_select;


const styles = StyleSheet.create({
  file_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 7,
  }
});