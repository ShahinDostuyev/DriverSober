import { Pressable, Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
function PrimaryButton({
  children,
  onPress,
  color = Colors.primaryYellow,
  textColor = "black",
  disabled = false,
  width = "80%",
}) {
  return (
    <>
      <View
        style={[
          styles.buttonOuterContainer,
          { backgroundColor: color, width: width },
        ]}
      >
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.buttonInnerContainer, styles.pressed]
              : styles.buttonInnerContainer
          }
          android_ripple={{ color: Colors.primaryBlack }}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={[styles.buttonText, { color: textColor }]}>
            {children}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonInnerContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    justifyContent: "center",
  },
  buttonOuterContainer: {
    width: "80%",
    height: 50,
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
