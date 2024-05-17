import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeNavigator;
