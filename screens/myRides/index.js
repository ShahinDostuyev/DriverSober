import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment/moment";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";



function MyTrips() {
  const user = useSelector((state) => state.user.user);
  const [trips, setTrips] = useState([]);
  console.log("Trips: ", trips);
  console.log("User info: ", user);

  useEffect(() => {
    const getRides = async () => {
      await axios
        .post(`https://soberlift.onrender.com/api/getDriverRides`, {
          driverId: user._id,
        })
        .then((response) => {
          console.log("My Trips Ride Response : ", response.data);
          setTrips(response.data);
        })
        .catch((error) => {
          console.error("User trips can not be got");
        });
    };
    getRides();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.header}>My Trips</Text>
      <ScrollView>
        <View style={styles.rideList}>
          {trips &&
            trips.map((ride) => {
              return (
                <Pressable
                  key={ride._id}
                  onPress={() => {
                    console.log("Hi");
                  }}
                >
                  <View style={styles.rideContainer}>
                    <MaterialCommunityIcons
                      name="taxi"
                      size={33}
                      color="black"
                    />
                    <View style={styles.rideTextInfoContainer}>
                      <Text style={styles.locationText}>
                        {ride.request.dropOffLocation.address}
                      </Text>
                      <Text style={styles.dateText}>
                        {ride.startTime
                          ? moment(ride.startTime).format("LLL")
                          : moment(new Date()).format("LLL")}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.priceText,
                        {
                          color: ride.status === "completed" ? "green" : "red",
                        },
                      ]}
                    >
                      ₺{ride.request.fare}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

export default MyTrips;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 50,
    padding: 20,
    gap: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
  },

  rideList: { gap: 20 },
  rideContainer: {
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "#e3e3e3",
    height: 50,
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  rideTextInfoContainer: {
    width: "72%",
  },
  priceText: {
    fontSize: 18,
  },
  locationText: {
    fontSize: 17,
    fontStyle: "italic",
  },
  dateText: {
    fontSize: 12,
  },
});
