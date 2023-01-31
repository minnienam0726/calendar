import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS, FONT_SIZE, DAY_SIZE } from "../config/constatns";

function WeekMatrix({ pressedButton, setPressedButton, targetWeek, thisMonth }) {
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
          <Text
            style={day.getMonth() === thisMonth
            ? styles.dayText
            : styles.otherMonthText}
          >
            {day.getDate()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  oneWeekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: DAY_SIZE.HEIGHT,
  },
  radiusEffect: {
    justifyContent: "center",
    width: DAY_SIZE.WIDTH,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: COLORS.SKY_BLUE,
  },
  nonRadiusEffect: {
    justifyContent: "center",
    width: DAY_SIZE.WIDTH,
  },
  dayText: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.MIDDLE,
    textAlign: "center",
  },
  otherMonthText: {
    color: COLORS.GREY,
    fontSize: FONT_SIZE.MIDDLE,
    textAlign: "center",
  },
});

export default WeekMatrix;
