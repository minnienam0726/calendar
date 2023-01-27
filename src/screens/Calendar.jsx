import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Calendar() {
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [pressedButton, setPressedButton] = useState("");

  const dayWeekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const monthString = new Date(today.getFullYear(), month, today.getDate()).toLocaleString("en-US", { month: "long" });
  const year = new Date(today.getFullYear(), month, today.getDate()).getFullYear();

  const firstDayWeekIndex = new Date(today.getFullYear(), month, 1).getDay();
  let dateCount = 0 - firstDayWeekIndex;
  const dayilyMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(0).map(() => {
      dateCount++;
      return new Date(today.getFullYear(), month, dateCount);
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <Icon.Button
          name="angle-left"
          color="#35C0F5"
          size={40}
          backgroundColor="#00000000"
          onPress={() => setMonth(month - 1)}
        />
        <Text>
          {monthString} {year}
        </Text>
        <Icon.Button
          name="angle-right"
          color="#35C0F5"
          size={40}
          backgroundColor="#00000000"
          onPress={() => setMonth(month + 1)}
        />
      </View>
      <View>
        <View>
          {dayWeekArray.map((dayWeek, dayWeekIndex) => (
            <Text key={dayWeekIndex}>
              {dayWeek}
            </Text>
          ))}
        </View>
        {dayilyMatrix.map((weekList, weekIndex) => (
          <Text key={weekIndex}>
            {weekList.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={pressedButton.toString() === weekList[dayIndex].toString() ? styles.radiusEffect : styles.normal}
                onPress={() => setPressedButton(day)}
              >
                <Text>
                  {day.getDate()}
                </Text>
              </TouchableOpacity>
            ))}
          </Text>
        ))}
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
