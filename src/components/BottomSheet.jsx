import { useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { WINDOWS, COORDINATES, COLORS } from "../config/constatns";

function BottomSheet({ dragBarY, setDragBarY, setCalendarMatrixHeight }) {
  const dragBarRef = useRef();
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (dragBarY > COORDINATES.FIRST_WEEK_Y) {
        offset.value = {
          x: event.translationX + start.value.x,
          y: event.translationY + start.value.y,
        };
      } else {
        offset.value = {
          y: COORDINATES.END_POSITION_Y,
        };
      }
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
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
            dragBarY < COORDINATES.DIVISION_LINE_Y
              ? setCalendarMatrixHeight(0)
              : setCalendarMatrixHeight(COORDINATES.CALENDAR_MATRIX_HEIGHT_Y);
        }}>
          <Text>
            BottomSheet
          </Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: "absolute",
    bottom: (WINDOWS.HEIGHT * 0.2) - WINDOWS.HEIGHT,
    width: "100%",
    height: WINDOWS.HEIGHT,
  },
  bottomSheetContentsContainer: {
    width: "100%",
    height: "100%",
  },
  dragBar: {
    width: "100%",
    height: 2,
    marginTop: 5,
    backgroundColor: COLORS.BLACK,
  },
});

export default BottomSheet;
