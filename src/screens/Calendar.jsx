import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Calendar() {
  const [month, setMonth] = useState(() => new Date().getMonth());
  const dayWeekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const monthString = new Date(today.getFullYear(), month, today.getDate()).toLocaleString("en-US", { month: "long" });
  const year = new Date(today.getFullYear(), month, today.getDate()).getFullYear();

  const firstDayWeekIndex = new Date(today.getFullYear(), month, 1).getDay();
  let dateCount = 0 - firstDayWeekIndex;
  const dayilyMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(0).map(() => {
      dateCount++;
      return new Date(today.getFullYear(), month, dateCount).getDate();
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <Text>
          <Icon.Button
            name="angle-left"
            color="#2196F3"
            backgroundColor="#00000000"
            onPress={() => setMonth(month - 1)}
          />
          {monthString} {year}
          <Icon.Button
            name="angle-right"
            color="#2196F3"
            backgroundColor="#00000000"
            onPress={() => setMonth(month + 1)}
          />
        </Text>
      </View>
      <View>
        <View>
          <Text>{dayWeekArray}</Text>
        </View>
        <View>
          {dayilyMatrix.map((weekList, weekIndex) => (
            <Text key={weekIndex}>
              {weekList.map((day, dayIndex) => (
                <Text key={dayIndex}>{day}</Text>
              ))}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Calendar;
