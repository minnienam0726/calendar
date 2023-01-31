import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { COORDINATES, COLORS, FONT_SIZE, DAY_SIZE } from "../config/constatns";

function CalendarMatrix({
  pressedButton,
  setPressedButton,
  setTargetWeek,
  calendarMatrixHeight,
  setCalendarMatrixHeight,
  dayilyMatrix,
  thisMonth
}) {
  const animation = useSharedValue({ height: COORDINATES.CALENDAR_MATRIX_HEIGHT_Y });
  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(calendarMatrixHeight, {
        duration: 500,
      }),
    };
  });

  useEffect(() => {
    setCalendarMatrixHeight(animation.value.height);
  }, [animation]);

  return (
    <Animated.View
      style={[styles.calendarMatrixContainer, animationStyle]}
    >
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
              <Text style={day.getMonth() === thisMonth
                ? styles.dayText
                : styles.otherMonthText}
              >
                {day.getDate()}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  calendarMatrixContainer:{
    width: "100%",
    backgroundColor: COLORS.LIGHT_GREY,
  },
  weekContainer: {
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

export default CalendarMatrix;
