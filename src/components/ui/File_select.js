import { Text, View, StyleSheet, Pressable, } from 'react-native';
import { Fontisto, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

import COLORS from '@/shared/js/colors';

/**
 * file을 첨부할수 있는 ui 생성
 * @param {arr} file_list - 선택된 file list
 * @param {function} select - file 선택 이벤트
 * @param {function} de_select - file 선택 해제 이벤트
 * @param {obj} container_style - file container style
 */
const File_select = ({
  file_list,
  select,
  de_select,
  container_style
}) => {

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

  const de_select_file = (file_num) => {
    de_select(file_num);
  }

  return (
    <>
      <Pressable style={[styles.add_file.container, container_style]} onPress={select_file}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Fontisto
            name="link"
            size={20}
            color={COLORS.gray_500} />
          <Text style={styles.add_file.title}>첨부파일 추가</Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color={COLORS.gray_500} />
      </Pressable>
      {
        file_list.map((file, idx) => {
          return (
            <View style={styles.file_list.container} key={idx}>
              <Pressable style={styles.file_list.pressable_container} >
                <Fontisto name="link" size={20} color={COLORS.primary_500} />
                <Text style={styles.file_list.file_name} numberOfLines='1' >{file.name}</Text>
              </Pressable>

              <MaterialIcons
                name="cancel"
                size={26}
                color={COLORS.gray_500}
                onPress={() => de_select_file(idx)} />
            </View>
          )
        })
      }
    </>
  );
}

export default File_select;

const styles = StyleSheet.create({
  add_file: {
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: COLORS.gray_500,
      marginLeft: 10,
      maxWidth: '80%',
      fontSize: 14
    }
  },
  file_list: {
    container: {
      width: '100%',
      marginVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    pressable_container: {
      flexDirection: 'row'
    },
    file_name: {
      color: COLORS.black_500,
      marginLeft: 10,
      maxWidth: '80%',
    }
  }
});