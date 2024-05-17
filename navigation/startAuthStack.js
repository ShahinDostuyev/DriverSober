import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../screens/login";
import RegisterPage from "../screens/register";
import StartScreen from "../screens/start";
import { NavigationContainer } from "@react-navigation/native";

const StartStack = createStackNavigator();

function StartAuthStack() {
  return (
    <NavigationContainer>
      <StartStack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
        }}
      >
        <StartStack.Screen name="Start" component={StartScreen} />
        <StartStack.Screen name="Login" component={LoginPage} />
        <StartStack.Screen name="Register" component={RegisterPage} />
      </StartStack.Navigator>
    </NavigationContainer>
  );
}

export default StartAuthStack;
