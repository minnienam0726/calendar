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
      <View style={styles.topContainer}>
        <Icon.Button
          name="angle-left"
          color="#35C0F5"
          size={40}
          backgroundColor="#00000000"
          onPress={() => setMonth(month - 1)}
        />
        <Text style={styles.monthYearText}>
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
      <View style={styles.bottomContainer}>
        <View style={styles.dayWeekContainer}>
          {dayWeekArray.map((dayWeek, dayWeekIndex) => (
            <Text style={styles.dayWeekText} key={dayWeekIndex}>
              {dayWeek}
            </Text>
          ))}
        </View>
        <View style={styles.monthContainer}>
          {dayilyMatrix.map((weekList, weekIndex) => (
            <View style={styles.weekContainer} key={weekIndex}>
              {weekList.map((day, dayIndex) => (
                <TouchableOpacity
                  key={dayIndex}
                  style={pressedButton.toString() === weekList[dayIndex].toString() ? styles.radiusEffect : styles.nonRadiusEffect}
                  onPress={() => setPressedButton(day)}
                >
                  <Text style={styles.dayText}>
                    {day.getDate()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
  },
  monthYearText: {
    fontSize: 18,
  },
  bottomContainer: {
    alignItems: "center",
  },
  dayWeekContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  dayWeekText: {
    width: 50,
    textAlign: "center",
  },
  monthContainer: {
    width: "90%",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  radiusEffect: {
    justifyContent: "center",
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#35C0F5",
  },
  nonRadiusEffect: {
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  dayText: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default Calendar;
