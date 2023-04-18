// import React, { memo, useCallback, useRef, useState } from 'react'
// import { Dimensions, Platform, Text, View } from 'react-native'
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
// import axios from 'axios';

// import COLORS from '@/shared/js/colors';
// import Feather from 'react-native-vector-icons/Feather'
// Feather.loadFont()

// const Auto_complete = memo(() => {
//   const [loading, setLoading] = useState(false);
//   const [suggestionsList, setSuggestionsList] = useState(null)
//   const [selectedItem, setSelectedItem] = useState(null)
//   const dropdownController = useRef(null)

//   const searchRef = useRef(null)

//   const getSuggestions = useCallback(async q => {
//     console.log('getSuggestions', q)
//     const filterToken = q.toLowerCase()
//     if (typeof q !== 'string' || q.length < 3) {
//       setSuggestionsList(null)
//       return
//     }

//     setLoading(true)
//     axios.get('http://www.career.go.kr/cnet/openapi/getOpenApi', {
//       params: {
//         apiKey: '06c2cdaf1d5fe582073b2ed44573c969',
//         svcType: 'api',
//         svcCode: 'SCHOOL',
//         contentType: 'json',
//         gubun: 'univ_list',
//         searchSchulNm: q,
//       }
//     })
//       .then(response => {
//         const data = response.data.dataSearch.content;
//         // console.log('data', data);

//         const suggestions = data
//           .filter(item => item.schoolName.toLowerCase().includes(filterToken))
//           .map(item => ({
//             seq: item.seq,
//             title: item.schoolName,
//           }));

//         console.log(suggestions)
//         setSuggestionsList(suggestions);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     setLoading(false)
//   }, [])

//   const onClearPress = useCallback(() => {
//     setSuggestionsList(null)
//   }, [])

//   const onOpenSuggestionsList = useCallback(isOpened => { }, [])

//   return (
//     <>
//       <View
//         style={[
//           { flex: 1, flexDirection: 'row', alignItems: 'center' },
//           Platform.select({ ios: { zIndex: 1 } }),
//         ]}>
//         <View style={{ width: 1 }} />
//         <AutocompleteDropdown
//           ref={searchRef}
//           closeOnBlur={false}
//           direction={Platform.select({ ios: 'down' })}
//           controller={controller => {
//             dropdownController.current = controller
//           }}
//           dataSet={suggestionsList}
//           onChangeText={getSuggestions}
//           onSelectItem={item => {
//             item && setSelectedItem(item.id)
//           }}
//           debounce={600}
//           suggestionsListMaxHeight={Dimensions.get('window').height * 0.3}
//           onClear={onClearPress}
//           onSubmit={e => console.log(e.nativeEvent.text)}
//           onOpenSuggestionsList={onOpenSuggestionsList}
//           loading={loading}
//           useFilter={false} // prevent rerender twice
//           textInputProps={{
//             placeholder: '학교명을 입력해 주세요',
//             autoCapitalize: 'none',
//             style: {
//               borderRadius: 25,
//               color: '#383b42',
//             },
//           }}
//           rightButtonsContainerStyle={{
//             height: 30,
//             alignSelf: 'center',
//           }}
//           inputContainerStyle={{
//             borderRadius: 6,
//             backgroundColor: '#fff',
//             borderWidth: 1,
//             borderColor: COLORS.gray_480,
//           }}
//           suggestionsListContainerStyle={{
//             backgroundColor: '#fff',
//             zIndex: 10000
//           }}
//           containerStyle={{ flexGrow: 1, flexShrink: 1 }}
//           renderItem={(item, text) => {
//             console.log(text)
//             return <Text style={{ color: '#383b42', padding: 15 }}>{item.title}</Text>
//           }}
//           ChevronIconComponent={<Feather name="chevron-down" size={20} color="#383b42" />}
//           showClear={false}
//         />
//       </View>
//       {/* <Text style={{ color: '#668', fontSize: 13, marginTop: 15 }}>
//         Selected item id: {JSON.stringify(selectedItem)}
//       </Text> */}
//     </>
//   )
// })

// export default Auto_complete;

import React, { memo, useCallback, useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import axios from 'axios';

import COLORS from '@/shared/js/colors';



const Auto_complete = memo((props) => {
  const [loading, set_loading] = useState(false);
  const [remote_date_set, set_remote_date_set] = useState(null);
  const [selected_item, set_selected_item] = useState(null);

  useEffect(() => {
    console.log('selected_item', selected_item);
  }, [selected_item])

  /**
   * input에 값 입력시 값을 서버에서 가져옴.
   */
  const get_suggesstions = useCallback(async word => {
    const filter_token = word.toLowerCase();
    if (typeof word !== 'string' || word.length < 1) {
      set_remote_date_set(null);
      return;
    }
    set_loading(true);

    axios.get('http://www.career.go.kr/cnet/openapi/getOpenApi', {
      params: {
        apiKey: '06c2cdaf1d5fe582073b2ed44573c969',
        svcType: 'api',
        svcCode: 'SCHOOL',
        contentType: 'json',
        gubun: 'univ_list',
        searchSchulNm: filter_token,
      }
    })
      .then(response => {
        const data = response.data.dataSearch.content;

        const suggestions = data
          .filter(item => item.schoolName.toLowerCase().includes(filter_token))
          .map(item => ({
            seq: item.seq,
            title: item.schoolName,
          }));

        set_remote_date_set(suggestions);
      })
      .catch(error => {
        console.log(error);
      });

    set_loading(false);
  }, [])

  return (
    <>
      <AutocompleteDropdown
        dataSet={remote_date_set}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        onSelectItem={set_selected_item}
        loading={loading}
        onChangeText={get_suggesstions}
        textInputProps={{ placeholder: props.place_holder }}
        inputContainerStyle={styles.input_container}
        EmptyResultComponent={<Text style={styles.empty_result_text}>값이 없습니다.</Text>}
      />
      {/* <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text> */}
    </>
  )
})

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