import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import PrimaryButton from "../../components/primaryButton";
import VerticalLine from "../../components/verticalLine";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import RateClient from "../../components/rate";

function RideScreen({ navigation, route }) {
  const { request, ride } = route.params;
  const driverId = useSelector((state) => state.user.user._id);

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [rideInfo, setRideInfo] = useState(null);
  const [pickedUp, setPickedUp] = useState(false);
  const [finished, setFinished] = useState(true);
  console.log(rideInfo);

  const [origin, setOrigin] = useState(request.pickupLocation);
  const [destination, setDestination] = useState(request.dropOffLocation);

  const handleRideCancel = async (rideId) => {
    try {
      const response = await axios.put(
        `https://soberlift.onrender.com/api/cancelRide/${ride._id}`
      );
      console.log("Ride canceled");
      navigation.navigate("Home");
    } catch (e) {
      console.error("soberlift : ", e);
    }
  };
  const handlePickUp = () => {
    console.log("Arrived at the pickup location");
    setPickedUp(true);
  };

  const finishRide = async () => {
    console.log("Arrived at the destination location");
    try {
      const response = await axios.put(
        `https://soberlift.onrender.com/api/finishRide/${ride._id}`
      );
      console.log("Ride finished, status changed to: ", response.data.status);
      setFinished(true);
    } catch (e) {
      console.error("Ride can not be finished : ", e);
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
      try {
        const location = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
        const newLocation = await axios.put(
          `https://soberlift.onrender.com/api/updateLocation/${driverId}`,
          {
            location,
          }
        );
      } catch (e) {
        console.error("soberlift : ", e);
      }

      setLocation(location);

      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.04,
      });
    })();
  }, []);

  useEffect(() => {
    
      const calculateDistance = () => {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=AIzaSyCs4CFoDHas00xgk0CLFRxjLloQbbtzDM0`
          )
          .then((response) => {
            setRideInfo(response.data.rows[0].elements[0]);
          })
          .catch((error) => {
            console.error("google api error: ", error.message);
          });
      };
      calculateDistance();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
  };

  const onUserLocationChange = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
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
      console.error("soberlift error: ", e);
    }

    const threshold = 500; // Define a threshold distance in meters

    if (!pickedUp) {
      const distanceToPickup = calculateDistance(
        latitude,
        longitude,
        origin.latitude,
        origin.longitude
      );
      if (distanceToPickup <= threshold) {
        handlePickUp();
      }
    }

    if (pickedUp && !finished) {
      const distanceToDropOff = calculateDistance(
        latitude,
        longitude,
        destination.latitude,
        destination.longitude
      );
      if (distanceToDropOff <= threshold) {
        finishRide();
      }
    }
  };

  const handleRatingCancel = () => {
    navigation.navigate("Home");
  };

  const handleRatingSubmit = (rating) => {
    axios
      .post(
        `https://soberlift.onrender.com/api/rateClient/${request.clientId}`,
        {
          rating,
        }
      )
      .then((response) => {
        console.log("Rating added to database: ", response.data);
      })
      .catch((error) => {
        console.error(error.message);
        console.log("Rating can not added");
      });
    // Request to add rating to Client
    console.log("Rating by driver: ", rating);

    navigation.navigate("Home");
  };

  return (
    <>
      {finished ? (
        <RateClient
          onCancel={handleRatingCancel}
          onSubmit={handleRatingSubmit}
        />
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={region}
            showsUserLocation={true}
            onUserLocationChange={onUserLocationChange}
          >
            {!pickedUp && (
              <>
                <MapViewDirections
                  origin={{
                    latitude: location ? location.latitude : origin.latitude,
                    longitude: location ? location.longitude : origin.longitude,
                  }}
                  destination={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                  }}
                  apikey="AIzaSyCs4CFoDHas00xgk0CLFRxjLloQbbtzDM0"
                  strokeWidth={3}
                  strokeColor="yellow"
                />
                <Marker
                  coordinate={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                  }}
                  title="Origin"
                  description="Origin Location"
                >
                  <Image
                    style={{ width: 40, height: 40, resizeMode: "contain" }}
                    source={require("../../assets/images/originLocation.png")}
                  />
                </Marker>
              </>
            )}
            <MapViewDirections
              origin={{
                latitude: pickedUp ? location.latitude : origin.latitude,
                longitude: pickedUp ? location.longitude : origin.longitude,
              }}
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              apikey="AIzaSyCs4CFoDHas00xgk0CLFRxjLloQbbtzDM0"
              strokeWidth={1.5}
            />

            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title="Destination"
              description="Destination Location"
            />
          </MapView>
          <View style={styles.bottomContainer}>
            <View style={styles.rideInfo}>
              <View style={styles.clientInfo}>
                <View style={styles.profilePhoto}>
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../../assets/favicon.png")}
                  />
                </View>
                <Text
                  style={styles.username}
                >{`${request.client.name} ${request.client.surname}`}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>
                    {`${
                      request.client.ratings?.length === 0
                        ? "5"
                        : request.client.rating
                    }`}
                  </Text>
                  <MaterialIcons name="star" size={20} color="black" />
                </View>
              </View>
              <View style={styles.calculatedRideDetails}>
                <View style={styles.rideInfoWrapper}>
                  <Text>Distance</Text>
                  <Text style={styles.rideInfoText}>
                    {rideInfo?.distance.text}
                  </Text>
                </View>

                <VerticalLine />

                <View style={styles.rideInfoWrapper}>
                  <Text>Price</Text>
                  <Text
                    style={styles.rideInfoText}
                  >{`${request.fare} TL`}</Text>
                </View>

                <VerticalLine />

                <View style={styles.rideInfoWrapper}>
                  <Text>Arrival</Text>
                  <Text style={styles.rideInfoText}>
                    {rideInfo?.duration.text}
                  </Text>
                </View>
              </View>
            </View>

            <PrimaryButton
              color="#e0e0e0"
              textColor="black"
              onPress={() => handleRideCancel(request._id)}
            >
              Cancel ride
            </PrimaryButton>
            <Pressable style={styles.chat}>
              <MaterialIcons name="chat" size={40} color="black" />
            </Pressable>
          </View>
        </>
      )}
    </>
  );
}

export default RideScreen;

const styles = StyleSheet.create({
  map: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bottomContainer: {
    flex: 3,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  bottomText: {
    fontSize: 26,
  },
  rideInfo: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    paddingBottom: 20,
  },
  clientInfo: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    borderRadius: 50,
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 15,
  },
  calculatedRideDetails: {
    width: "70%",
    marginTop: "5%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rideInfoText: {
    marginTop: 5,
    fontWeight: "900",
  },
  rideInfoWrapper: {
    alignItems: "center",
  },
  chat: {
    position: "absolute",
    top: -80,
    right: 20,
    backgroundColor: Colors.primaryYellow,
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
