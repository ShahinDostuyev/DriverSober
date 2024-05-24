import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment/moment";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";

function RequestsScreen({ navigation }) {
  const user = useSelector((state) => state.user.user);

  const [selectedRide, setSelectedRide] = useState(null);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const createRide = () => {
      axios
        .post(`https://soberlift.onrender.com/api/nearbyrequests`, {
          driver: user,
        })
        .then((response) => {
          setRequests(response.data);
          console.log(requests);
        })
        .catch((error) => {
          console.error(error.message);
          console.log("something is wrong");
        });
    };
    createRide();
  }, []);

  const handlePress = (request) => {
    if (selectedRide === request) {
      setSelectedRide(null);
    } else {
      setSelectedRide(request);
    }
  };

  const handleAccept = (request) => {
    const createRide = () => {
      axios
        .post(`https://soberlift.onrender.com/api/create-ride`, {
          request,
          driverId: user._id,
        })
        .then((response) => {
          console.log("Created Ride: ", response.data);
          navigation.navigate("Ride", {
            request,
            ride: response.data.ride,
          });
        })
        .catch((error) => {
          console.error(error.message);
          console.log("Ride can not created");
        });
    };
    createRide();

    // Add your logic for accepting the request
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.header}>Ride requests</Text>
      <ScrollView>
        <View style={styles.rideList}>
          {requests.map((request, index) => (
            <View key={index}>
              <Pressable onPress={() => handlePress(request)}>
                <View style={styles.rideContainer}>
                  <View style={styles.rideLocations}>
                    <Text style={styles.pickupLocation}>
                      {request.pickupLocation.address}
                    </Text>
                    <Text style={styles.dropOffLocation}>
                      {request.dropOffLocation.address}
                    </Text>
                    <Text style={styles.dateText}>
                      {moment(request.scheduledTime).format("LLL")}
                    </Text>
                  </View>
                  <Text style={[styles.priceText]}>₺{request.fare}</Text>
                </View>
              </Pressable>
              {selectedRide === request && (
                <View style={styles.buttonContainer}>
                  <Button
                    title="Accept"
                    onPress={() => handleAccept(request)}
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
