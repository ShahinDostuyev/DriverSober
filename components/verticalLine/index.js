import React from "react";
import { StyleSheet, View } from "react-native";

function VerticalLine() {
  return <View style={styles.verticleLine}></View>;
}

export default VerticalLine;

const styles = StyleSheet.create({
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});
