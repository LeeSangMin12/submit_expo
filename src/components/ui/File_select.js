import { View, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import { Fontisto, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import COLORS from '@/shared/js/colors';
import Custom_text from '@/components/ui/Custom_text.js';

/**
 * file을 첨부할수 있는 ui 생성
 * @param {arr} file_list - 선택된 file list
 * @param {function} select - file 선택 이벤트
 * @param {function} de_select - file 선택 해제 이벤트
 * @param {obj} container_style - file container style
 */
const File_select = ({
  value,
  set_value,
  container_style
}) => {

  const select_file = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      if (file.type === 'success') {
        const file_error_message = await handle_file_errors(file);
        if (file_error_message !== false) {
          Alert.alert(file_error_message);
          return;
        }

        const new_file = {
          name: file.name,
          size: file.size,
          uri: file.uri
        };

        set_value((prev_state) => ({
          ...prev_state,
          file_list: [...prev_state.file_list, new_file]
        }));
      }
    } catch (error) {
      console.log('Error selecting file:', error);
    }
  };

  const handle_file_errors = async (file) => {
    const file_info = await FileSystem.getInfoAsync(file.uri);
    const file_size_mb = file_info.size / (1024 * 1024); // 파일 크기를 메가바이트로 변환.

    const file_error_message =
      file_info.isDirectory === true ? '해당 파일유형은 사용할 수 없습니다.' :
        file_size_mb > 50 ? '파일의 용량이 너무 큽니다.' : false;

    return file_error_message;
  };

  const de_select_file = (file_num) => {
    set_value((prev_state) => ({
      ...prev_state,
      file_list: prev_state.file_list.filter((file, idx) => idx !== file_num)
    }));
  }

  return (
    <>
      <Pressable style={[styles.add_file.container, container_style]} onPress={select_file}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Fontisto
            name="link"
            size={16}
            color={COLORS.black_500} />
          <Custom_text style={styles.add_file.title}>파일 첨부</Custom_text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color={COLORS.gray_500} />
      </Pressable>
      {
        value.map((file, idx) => {
          return (
            <View style={styles.file_list.container} key={idx}>
              <Pressable style={styles.file_list.pressable_container} onPress={() => Linking.openURL(file.uri)}>
                <Fontisto name="link" size={16} color={COLORS.primary_500} />
                <Custom_text style={styles.file_list.file_name} numberOfLines='1' >{file.name}</Custom_text>
              </Pressable>

              <MaterialIcons
                name="cancel"
                size={24}
                color={COLORS.black_500}
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