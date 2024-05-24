import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import PrimaryButton from "../primaryButton";
import Colors from "../../constants/Colors";

const RateClient = ({ onCancel, onSubmit }) => {
  const [rating, setRating] = useState(5);

  const handleRatingCompleted = (rating) => {
    setRating(rating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the Client</Text>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
        defaultRating={5}
        size={30}
        onFinishRating={handleRatingCompleted}
      />
      <View style={styles.buttons}>
        <PrimaryButton
          style={{ width: 100 }}
          color="#e0e0e0"
          textColor="black"
          onPress={onCancel}
          width="50%"
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton
          color={Colors.primaryYellow}
          textColor="black"
          onPress={() => onSubmit(rating)}
          width="50%"
        >
          Submit
        </PrimaryButton>
      </View>
    </View>
  );
};

export default RateClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
