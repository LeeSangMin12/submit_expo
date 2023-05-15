import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import COLORS from '@/shared/js/colors';
import { set_store_info } from '@/shared/js/common';

const Add_semester = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('asdf');
  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder='시간표 이름'
          onChangeText={(label) => set_store_info('user', 'name', label)} />
      </View>

      <View>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="asdf" />
        </Picker>
      </View>
    </View>
  );
};

export default Add_semester;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input_container: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
});