import React from "react";
import { View, Text, StyleSheet } from "react-native";

function MyPage() {
  return (
    <View style={styles.container}>
      <Text>MyPage</Text>
    </View>
  );
}

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
