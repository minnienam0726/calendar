import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Calendar() {
  const date = new Date();
  const dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayYear = date.getFullYear();
  const todayMonth = date.getMonth();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const todayMonthString = month[todayMonth];
  const firstWeekIndex = new Date(todayYear, todayMonth, 1).getDay();
  let dateCount = 0 - firstWeekIndex;

  const dayilyMatrix = Array.from(Array(5)).map(() => {
    return Array.from(Array(7)).map(() => {
      dateCount++;
      return new Date(todayYear, todayMonth, dateCount).getDate();
    });
  });

  return (
    <View style={styles.container}>
      <Text>
        <Icon.Button
          name="angle-left"
          color="#2196F3"
          backgroundColor="#00000000"
        />
        {todayMonthString} {todayYear}
        <Icon.Button
          name="angle-right"
          color="#2196F3"
          backgroundColor="#00000000"
        />
      </Text>
      <View>
        <View>
          <Text>{dayWeek}</Text>
        </View>
        {dayilyMatrix.map((week, weekIndex) => (
          <View key={weekIndex}>
            <Text>{week}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
