import { View, Text, StyleSheet } from "react-native";

function Library() {
  return (
    <View style={styles.container}>
      <Text>Library</Text>
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

export default Library;
