import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import Colors from "../../constants/Colors";
  import PrimaryButton from "../../components/primaryButton";
  
  function StartScreen({ navigation }) {
    return (
      <>
        <View style={styles.outerRootContainer}>
          <ImageBackground
            style={{ flex: 1 }}
            source={require("../../assets/images/driver2.jpg")}
            resizeMode="cover"
            imageStyle={{ opacity: 0.95 }}
          >
            <View style={styles.innerRootContainer}>
              <View style={styles.headerContainer}>
                <Text style={{ color: "white", fontSize: 20 }}>SoberLift</Text>
                <Ionicons
                  name="information-circle"
                  size={24}
                  color={Colors.primaryYellow}
                />
              </View>
              <View style={styles.mainText}>
                <Text style={{ color: "white", fontSize: 35 }}>
                  Trips of your dreams
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    opacity: 0.75,
                    marginTop: 5,
                  }}
                >
                  Comfortable rides around the city
                </Text>
              </View>
              <View style={styles.buttonsContainer}>
                <PrimaryButton onPress={() => navigation.navigate("Login")}>
                  Sign In
                </PrimaryButton>
                {/* <PrimaryButton>Sign Up</PrimaryButton> */}
                <Pressable
                  onPress={() => navigation.navigate("Register")}
                  android_ripple={{ color: "white" }}
                >
                  <Text style={{ color: "white", marginTop: 10 }}>
                    Create new account
                  </Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </>
    );
  }
  
  export default StartScreen;
  
  const styles = StyleSheet.create({
    outerRootContainer: {
      flex: 1,
    },
    innerRootContainer: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 60,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 50,
      borderColor: Colors.primaryYellow,
      borderBottomWidth: 2,
    },
    mainText: {
      marginTop: 50,
      height: 300,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonsContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      padding: 30,
      marginBottom: 100,
    },
  });
  