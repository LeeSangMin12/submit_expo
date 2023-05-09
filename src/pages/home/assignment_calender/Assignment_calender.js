import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Assignment_calender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const renderWeekdays = () => {
    return (
      <View style={styles.weekdays}>
        {weekdays.map((weekday) => (
          <Text key={weekday} style={styles.weekday}>
            {weekday}
          </Text>
        ))}
      </View>
    );
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(
      selectedDate.getMonth(),
      selectedDate.getFullYear(),
    );
    const monthStartsOn = daysInMonth[0].getDay();
    const blanks = [];
    for (let i = 0; i < monthStartsOn; i++) {
      blanks.push(<View key={`blank-${i}`} style={styles.day}></View>);
    }
    return blanks.concat(
      daysInMonth.map((day, index) => {
        const isSelected =
          day.getFullYear() === selectedDate.getFullYear() &&
          day.getMonth() === selectedDate.getMonth() &&
          day.getDate() === selectedDate.getDate();
        return (
          <TouchableOpacity
            key={`day-${index}`}
            style={[styles.day, isSelected && styles.selectedDay]}
            onPress={() => setSelectedDate(day)}>
            <Text style={[isSelected && styles.selectedDayText]}>
              {day.getDate()}
            </Text>
          </TouchableOpacity>
        );
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            const newDate = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() - 1,
              selectedDate.getDate(),
            );
            setSelectedDate(newDate);
          }}>
          <Text style={styles.arrowButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthName}>
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            const newDate = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() + 1,
              selectedDate.getDate(),
            );
            setSelectedDate(newDate);
          }}>
          <Text style={styles.arrowButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      {renderWeekdays()}
      <View style={styles.days}>{renderDays()}</View>
    </View>
  );
};

export default Assignment_calender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  arrowButton: {
    paddingHorizontal: 8,
  },
  arrowButtonText: {
    fontSize: 16,
  },
  monthName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  weekdays: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  weekday: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  days: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  day: {
    width: '14.285714%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  selectedDayText: {
    color: '#fff',
  },
});