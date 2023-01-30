import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

function BottomSheet() {
  return (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.dragBar} />
      <Text>
        BottomSheet
      </Text>
    </View>
  );
}

function WeekMatrix({ pressedButton, targetWeek }) {
  return (
    <View style={styles.oneWeekContainer}>
      {targetWeek?.map((day, dayIndex) => (
        <Pressable
          style={pressedButton.toString() === day.toString()
            ? styles.radiusEffect
            : styles.nonRadiusEffect}
          onPress={() => {
            setPressedButton(day);
          }}
          key={dayIndex}
        >
          <Text  style={styles.dayText}>
            {day.getDate()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function CalendarMatrix({ pressedButton, setPressedButton, setTargetWeek, dayilyMatrix }) {
  return (
    <View style={styles.calendarMatrixContainer}>
      {dayilyMatrix.map((weekList, weekIndex) => (
        <View style={styles.weekContainer} key={weekIndex}>
          {weekList.map((day, dayIndex) => (
            <Pressable
              style={pressedButton.toString() === weekList[dayIndex].toString()
                ? styles.radiusEffect
                : styles.nonRadiusEffect}
              onPress={() => {
                setPressedButton(day);
                setTargetWeek(weekList);
              }}
              key={dayIndex}
            >
              <Text style={styles.dayText}>
                {day.getDate()}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

function Calendar() {
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [pressedButton, setPressedButton] = useState("");
  const [targetWeek, setTargetWeek] = useState([]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
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
      <View style={styles.dayWeekContainer}>
        {dayWeekArray.map((dayWeek, dayWeekIndex) => (
          <Text style={styles.dayWeekText} key={dayWeekIndex}>
            {dayWeek}
          </Text>
        ))}
      </View>
      <CalendarMatrix
        pressedButton={pressedButton}
        setPressedButton={setPressedButton}
        targetWeek={targetWeek}
        setTargetWeek={setTargetWeek}
        dayilyMatrix={dayilyMatrix}
      />
      <WeekMatrix
        pressedButton={pressedButton}
        targetWeek={targetWeek}
      />
      <BottomSheet />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 5,
  },
  dayWeekContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 15,
  },
  dayWeekText: {
    width: 45,
    fontSize: 15,
    textAlign: "center",
  },
  calendarMatrixContainer:{
    width: "100%",
    backgroundColor: "yellow",
  },
  oneWeekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 45,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 45,
  },
  radiusEffect: {
    justifyContent: "center",
    width: 45,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#35C0F5",
  },
  nonRadiusEffect: {
    justifyContent: "center",
    width: 45,
  },
  dayText: {
    fontSize: 15,
    textAlign: "center",
  },
  bottomSheetContainer: {
    width: "100%",
  },
  dragBar: {
    marginTop: 5,
    width: "100%",
    height: 2,
    backgroundColor: "black",
  },
});

export default Calendar;