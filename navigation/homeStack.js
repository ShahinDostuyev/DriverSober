import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../screens/profile";
import RequestsScreen from "../screens/requests";
import RidesScreen from "../screens/myRides";
import RideScreen from "../screens/ride";
import ChatScreen from "../screens/chat";

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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Requests"
          component={RequestsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rides"
          component={RidesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ride"
          component={RideScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeNavigator;
