import React, { memo, useCallback, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import COLORS from '@/shared/js/colors';

const Auto_complete = memo(({ place_holder, get_data_suggesstions, set_value }) => {
  const [loading, set_loading] = useState(false);
  const [remote_date_set, set_remote_date_set] = useState(null);

  /**
   * input에 값 입력시 값을 서버에서 가져옴.
   */
  const get_suggesstions = useCallback(async word => {
    const filter_token = word.toLowerCase();
    if (typeof word !== 'string' || word.length < 2) {
      set_remote_date_set(null);
      return;
    }
    set_loading(true);

    const suggestions = await get_data_suggesstions(filter_token);
    const autocomplete_list = suggestions.map((val, idx) => {
      return {
        id: idx,
        title: val.title,
      }
    })

    set_remote_date_set(autocomplete_list);

    set_loading(false);
  }, []);

  /**
 * 현재 값을 받아와 값을 변경
 * @param {function} value - 현재 값
 */
  const handle_set_value = (value) => {
    const now_value = value;
    set_value(now_value?.title);
  };

  return (
    <>
      <AutocompleteDropdown
        dataSet={remote_date_set}
        useFilter={false}
        clearOnFocus={false}
        loading={loading}
        onSelectItem={handle_set_value}
        onChangeText={get_suggesstions}
        textInputProps={{ placeholder: place_holder }}
        inputContainerStyle={styles.input_container}
        EmptyResultComponent={<Text style={styles.empty_result_text}>값이 없습니다.</Text>}
      />
    </>
  );
});

export default Auto_complete;

const styles = StyleSheet.create({
  input_container: {
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.gray_480,
  },
  empty_result_text: {
    padding: 10,
    fontSize: 15
  }
});