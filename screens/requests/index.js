import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment/moment";
import { ScrollView } from "react-native-gesture-handler";

const getRandomDateInLastMonth = () => {
  const now = new Date();
  const pastMonth = new Date(now.setMonth(now.getMonth() - 1));
  const randomDate = new Date(
    pastMonth.getTime() + Math.random() * (Date.now() - pastMonth.getTime())
  );
  return randomDate.toISOString();
};

const rides = [
  {
    user: { name: "Ahmet", surname: "Yılmaz", rating: 4.5 },
    pickupLocation: {
      address: "İstiklal Caddesi, Beyoğlu, İstanbul",
      longitude: -122,
      latitude: 37.5,
    },
    dropOffLocation: {
      address: "Kadıköy, İstanbul",
      longitude:-122.3,
      latitude: 37.45,
    },
    distance: "10 km",
    fare: "50",
    duration: "20 mins",
    status: "completed",
    scheduledTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Mehmet", surname: "Kaya", rating: 4.8 },
    pickupLocation: {
      address: "Taksim Meydanı, Beyoğlu, İstanbul",
      longitude: 30.23,
      latitude: 38.12,
    },
    dropOffLocation: {
      address: "Beşiktaş, İstanbul",
      longitude: 30.12,
      latitude: 39.34,
    },
    distance: "5 km",
    fare: "30",
    duration: "15 mins",
    status: "completed",
    scheduledTime: getRandomDateInLastMonth(),
  },
];

function RequestsScreen({ navigation }) {
  const [selectedRide, setSelectedRide] = useState(null);
  const [requests, setRequests] = useState(null);

  const handlePress = (ride) => {
    if (selectedRide === ride) {
      setSelectedRide(null);
    } else {
      setSelectedRide(ride);
    }
  };

  const handleAccept = (ride) => {
    navigation.navigate("Ride", {
      ride,
    });
    // Add your logic for accepting the ride
  };

  const handleDeny = (ride) => {
    console.log(`Denied ride for ${ride.user.name}`);
    // Add your logic for denying the ride
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.header}>Ride requests</Text>
      <ScrollView>
        <View style={styles.rideList}>
          {rides.map((ride, index) => (
            <View key={index}>
              <Pressable onPress={() => handlePress(ride)}>
                <View style={styles.rideContainer}>
                  <View style={styles.rideLocations}>
                    <Text style={styles.pickupLocation}>
                      {ride.pickupLocation.address}
                    </Text>
                    <Text style={styles.dropOffLocation}>
                      {ride.dropOffLocation.address}
                    </Text>
                    <Text style={styles.dateText}>
                      {moment(ride.scheduledTime).format("LLL")}
                    </Text>
                  </View>
                  <Text style={[styles.priceText]}>₺{ride.fare}</Text>
                </View>
              </Pressable>
              {selectedRide === ride && (
                <View style={styles.buttonContainer}>
                  <Button
                    title="Accept"
                    onPress={() => handleAccept(ride)}
                    color="green"
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default RequestsScreen;

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
    height: 100,
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  rideLocations: {
    width: "85%",
    overflow: "hidden",
  },
  priceText: {
    fontSize: 18,
    color: "green",
  },
  pickupLocation: {
    fontSize: 17,
    fontWeight: "bold",
    height: 21,
  },
  dropOffLocation: {
    fontSize: 17,
    fontStyle: "italic",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
