import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const Calendar_mini = () => {
  const [selectedDates, setSelectedDates] = useState({});

  const onDayPress = (day) => {
    const { dateString } = day;
    const updatedDates = { ...selectedDates };

    if (updatedDates[dateString]) {
      // 이미 선택한 날짜를 클릭한 경우 선택 해제
      delete updatedDates[dateString];
    } else {
      // 새로운 날짜를 선택한 경우 기간 선택
      updatedDates[dateString] = { startingDay: true, endingDay: true };
    }

    setSelectedDates(updatedDates);
  };

  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={selectedDates}
    />
  );
};

export default Calendar_mini;