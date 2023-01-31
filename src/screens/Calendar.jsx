import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const END_POSITION = -340;

function BottomSheet({ dragBarY, setDragBarY, setCalendarMatrixHeight }) {
  const dragBarRef = useRef();
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (dragBarY > 207) {
        offset.value = {
          x: event.translationX + start.value.x,
          y: event.translationY + start.value.y,
        }
      } else {
        offset.value = {
          y: END_POSITION,
        }
      }
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      }
    });

  function getDragBarY() {
    dragBarRef.current?.measureInWindow((x, y) => {
      setDragBarY(y);
    });
  }

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: offset.value.y,
      }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[
        styles.bottomSheetContainer,
        animationStyle
      ]}>
        <View style={styles.dragBar} ref={dragBarRef} />
        <Pressable
          style={styles.bottomSheetContentsContainer}
          onPressOut={() => {
            getDragBarY();
            dragBarY < 450
              ? setCalendarMatrixHeight(0)
              : setCalendarMatrixHeight(270);
        }}>
          <Text>
            BottomSheet
          </Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

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

function CalendarMatrix({
  pressedButton,
  setPressedButton,
  setTargetWeek,
  calendarMatrixHeight,
  setCalendarMatrixHeight,
  dayilyMatrix,
  thisMonth
}) {
  const animation = useSharedValue({ height: 270 });
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
        {dragBarY > 450
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
    backgroundColor: "#ffffff",
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
  dayWeekContainer: {
    justifyContent: "center",
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
    backgroundColor: "#D3D3D3",
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
    color: "black",
  },
  otherMonthText: {
    fontSize: 15,
    textAlign: "center",
    color: "grey",
  },

  bottomSheetContainer: {
    position: "absolute",
    width: "100%",
    height: WINDOW_HEIGHT,
    bottom: (WINDOW_HEIGHT * 0.2) - WINDOW_HEIGHT,
  },
  bottomSheetContentsContainer: {
    width: "100%",
    height: "100%",
  },
  dragBar: {
    marginTop: 5,
    width: "100%",
    height: 2,
    backgroundColor: "black",
  },
});

export default Calendar;