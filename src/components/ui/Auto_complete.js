import React, { memo, useCallback, useRef, useState } from 'react'
import { Button, Dimensions, Platform, Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

import COLORS from '@/shared/js/colors';
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()



const Auto_complete = memo(() => {
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)

  const searchRef = useRef(null)

  const getSuggestions = useCallback(async q => {
    console.log('getSuggestions', q)
    const filterToken = q.toLowerCase()
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setLoading(true)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const items = await response.json()
    const suggestions = items
      .filter(item => item.title.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item.id,
        title: item.title,
      }))
    setSuggestionsList(suggestions)
    setLoading(false)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => { }, [])

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}>
        <View style={{ width: 10 }} />
        <AutocompleteDropdown
          ref={searchRef}
          closeOnBlur={false}
          direction={Platform.select({ ios: 'down' })}
          controller={controller => {
            dropdownController.current = controller
          }}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && setSelectedItem(item.id)
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.3}
          onClear={onClearPress}
          onSubmit={e => console.log(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // prevent rerender twice
          textInputProps={{
            placeholder: '학교명을 입력해 주세요',
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              color: '#383b42',
            },
          }}
          rightButtonsContainerStyle={{
            height: 30,
            alignSelf: 'center',
          }}
          inputContainerStyle={{
            borderRadius: 6,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: COLORS.gray_480,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#fff',
            zIndex: 10000
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => {
            console.log(text)
            return <Text style={{ color: '#383b42', padding: 15 }}>{item.title}</Text>
          }}
          ChevronIconComponent={<Feather name="chevron-down" size={20} color="#383b42" />}
          //inputHeight={50}
          //   showChevron={false}
          showClear={false}
        />
      </View>
      {/* <Text style={{ color: '#668', fontSize: 13, marginTop: 15 }}>
        Selected item id: {JSON.stringify(selectedItem)}
      </Text> */}
    </>
  )
})

export default Auto_complete;