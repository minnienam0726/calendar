import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

import CalendarMatrix from "../components/CalendarMatrix";
import WeekMatrix from "../components/WeekMatrix";
import BottomSheet from "../components/BottomSheet";

import { COORDINATES, COLORS, FONT_SIZE, DAY_SIZE  } from "../config/constatns";

function Calendar() {
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [pressedButton, setPressedButton] = useState("");
  const [targetWeek, setTargetWeek] = useState([]);
  const [dragBarY, setDragBarY] = useState(500);
  const [calendarMatrixHeight, setCalendarMatrixHeight] = useState(0);

  const dayWeekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), month).getMonth();
  const monthString = new Date(today.getFullYear(), month).toLocaleString("en-US", { month: "long" });
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
    <GestureHandlerRootView style={styles.gestureContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Icon.Button
            name="angle-left"
            color={COLORS.SKY_BLUE}
            size={40}
            backgroundColor={COLORS.TRANSPARENCY}
            onPress={() => setMonth(month - 1)}
          />
          <Text style={styles.monthYearText}>
            {monthString} {year}
          </Text>
          <Icon.Button
            name="angle-right"
            color={COLORS.SKY_BLUE}
            size={40}
            backgroundColor={COLORS.TRANSPARENCY}
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
        {dragBarY > COORDINATES.DIVISION_LINE_Y
          ? <CalendarMatrix
              pressedButton={pressedButton}
              setPressedButton={setPressedButton}
              setTargetWeek={setTargetWeek}
              calendarMatrixHeight={calendarMatrixHeight}
              setCalendarMatrixHeight={setCalendarMatrixHeight}
              dayilyMatrix={dayilyMatrix}
              thisMonth={thisMonth}
            />
          : <WeekMatrix
              pressedButton={pressedButton}
              setPressedButton={setPressedButton}
              targetWeek={targetWeek}
              thisMonth={thisMonth}
            />
        }
        <BottomSheet
          dragBarY={dragBarY}
          setDragBarY={setDragBarY}
          setCalendarMatrixHeight={setCalendarMatrixHeight}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
  },
  monthYearText: {
    fontSize: FONT_SIZE.MIDDLE,
  },
  dayWeekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  dayWeekText: {
    width: DAY_SIZE.WIDTH,
    fontSize: FONT_SIZE.MIDDLE,
    textAlign: "center",
  },
});

export default Calendar;
