import { View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

const Calendar_mini = () => {
  const renderCustomHeader = () => {
    const renderArrow = (direction) => {
      const text = direction === 'left' ? '<' : '>';
      return (
        <Text>{text}</Text>
      );
    };

    return (
      <View style={styles.headerContainer}>
        {renderArrow('left')}
        <Text style={styles.headerText}>Custom Header</Text>
        {renderArrow('right')}
      </View>
    );
  };


  const render_header = (date) => {
    const header_text = `${date.toString('yyyy년')} ${date.toString('MMMM')}`;

    return <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{header_text}</Text>;
  };

  return (
    <Calendar
      renderHeader={renderCustomHeader}
      enableSwipeMonths={true}
      minDate={'2023-05-10'}
      maxDate={'2023-05-25'}
    />
  );
};

const styles = {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default Calendar_mini;