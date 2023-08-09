import { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import Custom_text from '@/components/ui/Custom_text.js';

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

const Calendar_mini = () => {
  const render_header = (date) => {
    const header_text = `${date.toString('yyyy년')} ${date.toString('MMMM')}`;

    return <Custom_text style={{ fontSize: 18, fontFamily: 'bold' }}>{header_text}</Custom_text>;
  };

  const renderArrow = (direction) => {
    if (direction === 'left') {
      return <MaterialIcons name="chevron-left" size={24} color="black" />;
    } else if (direction === 'right') {
      return <MaterialIcons name="chevron-right" size={24} color="black" />;
    }

    return null;
  };


  const [selectedDates, setSelectedDates] = useState({});

  const handleDayPress = (day) => {
    const { dateString } = day;
    const newSelectedDates = { ...selectedDates };

    if (!newSelectedDates.startingDay || newSelectedDates.endingDay) {
      newSelectedDates.startingDay = dateString;
      newSelectedDates.endingDay = null;
    } else {
      const startingDate = new Date(newSelectedDates.startingDay);
      const selectedDate = new Date(dateString);

      if (selectedDate >= startingDate) {
        newSelectedDates.endingDay = dateString;
      } else {
        newSelectedDates.startingDay = dateString;
        newSelectedDates.endingDay = null;
      }
    }

    setSelectedDates(newSelectedDates);
  };

  const renderMarkedDates = () => {
    const { startingDay, endingDay } = selectedDates;
    const markedDates = {};

    if (startingDay) {
      markedDates[startingDay] = { startingDay: true, color: COLORS.primary_490, marked: true, selectedColor: COLORS.primary_500 };
    }

    if (endingDay) {
      markedDates[endingDay] = { endingDay: true, color: COLORS.primary_490, marked: true, selectedColor: COLORS.primary_500 };
    }

    if (startingDay && endingDay) {
      const dateRange = { startingDay, endingDay };

      const daysBetween = Math.floor(
        (new Date(endingDay) - new Date(startingDay)) / (1000 * 60 * 60 * 24)
      );

      for (let i = 1; i < daysBetween; i++) {
        const currentDate = new Date(startingDay);
        currentDate.setDate(currentDate.getDate() + i);
        const formattedDate = currentDate.toISOString().split('T')[0];
        markedDates[formattedDate] = { color: COLORS.primary_490 };
      }

      markedDates[dateRange] = { color: 'blue', textColor: 'white' };
    }

    return markedDates;
  };

  return (
    <Calendar
      renderHeader={render_header}
      renderArrow={renderArrow}
      markingType="period"
      markedDates={renderMarkedDates()}
      onDayPress={handleDayPress}
      enableSwipeMonths={true}
      minDate={'2023-05-10'}
      maxDate={'2023-05-27'}
    />
  );
}


export default Calendar_mini;