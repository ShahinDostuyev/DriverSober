import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeNavigator from "./navigation/homeStack";
import { useSelector } from "react-redux";
import StartAuthStack from "./navigation/startAuthStack";

export default function App() {
  const user = useSelector((state) => state.user.user);
  console.log("App user: ",user);

  return <>{user ? <HomeNavigator /> : <StartAuthStack />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
