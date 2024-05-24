import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

function HomeScreen({ navigation }) {
  const driverId = useSelector((state) => state.user.user._id);

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [available, setavailibility] = useState(false);

  console.log(location);
  const handleAvailibility = async () => {
    try {
      const response = await axios.put(
        `https://soberlift.onrender.com/api/makeactiveinactive/${driverId}`
      );
      console.log("Written to db: ", response.data.status);
      setavailibility(response.data.status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      // try {
      //   const response = await axios.put(
      //     `https://soberlift.onrender.com/api/updateLocation/${driverId}`,
      //     {
      //       location: {
      //         longitude: currentLocation.coords.longitude,
      //         latitude: currentLocation.coords.latitude,
      //       },
      //     }
      //   );
      //   console.log("Location updated with status: ", response.data.status);
      //   setavailibility(response.data.status);
      // } catch (err) {
      //   console.error(err);
      // }
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.04,
      });
    })();
  }, []);

  useEffect(() => {
    const fetchDriverStatus = async () => {
      try {
        const response = await axios.post(
          `https://soberlift.onrender.com/api/isActive`,
          {
            driverId: String(driverId),
          }
        );
        setavailibility(response.data.status);
        console.log(available);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDriverStatus();
  }, []);

  const onUserLocationChange = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("User location changed");
    // Update the car and set it to active
    try {
      const location = {
        latitude,
        longitude,
      };
      const newLocation = await axios.put(
        `https://soberlift.onrender.com/api/updateLocation/${driverId}`,
        {
          location,
        }
      );
      setLocation(location);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={region}
        onUserLocationChange={onUserLocationChange}
        showsUserLocation={true}
      />
      <View style={styles.bottomContainer}>
        <Pressable
          style={[
            styles.goButton,
            { backgroundColor: available === "active" ? "red" : "blue" },
          ]}
          onPress={handleAvailibility}
        >
          <Text style={styles.goText}>
            {available === "active" ? "END" : "GO"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <MaterialIcons name="account-circle" size={28} color="black" />
        </Pressable>
        <Text
          style={[
            styles.bottomText,
            { color: available === "active" ? "green" : "red" },
          ]}
        >{`You are ${available === "active" ? "Online" : "Offline"}`}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Requests");
          }}
        >
          <Entypo name="address" size={28} color="black" />
        </Pressable>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bottomContainer: {
    flex: 1.5,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomText: {
    fontSize: 26,
  },
  goButton: {
    height: 70,
    width: "25%",
    borderRadius: 50,
    position: "absolute",
    top: -80,
    right: Dimensions.get("window").width * 0.375,
    justifyContent: "center",
    alignItems: "center",
  },
  goText: {
    fontSize: 26,
    color: "white",
  },
});
