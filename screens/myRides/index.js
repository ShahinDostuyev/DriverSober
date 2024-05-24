import { Pressable, StyleSheet, Text, View } from "react-native";
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
    pickupLocation: "İstiklal Caddesi, Beyoğlu, İstanbul",
    dropLocation: "Kadıköy, İstanbul",
    distance: "10 km",
    fare: "50",
    duration: "20 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Mehmet", surname: "Kaya", rating: 4.8 },
    pickupLocation: "Taksim Meydanı, Beyoğlu, İstanbul",
    dropLocation: "Beşiktaş, İstanbul",
    distance: "5 km",
    fare: "30",
    duration: "15 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Fatma", surname: "Demir", rating: 4.2 },
    pickupLocation: "Anıtkabir, Çankaya, Ankara",
    dropLocation: "Kızılay, Ankara",
    distance: "8 km",
    fare: "40",
    duration: "18 mins",
    status: "canceled",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Ayşe", surname: "Kara", rating: 4.7 },
    pickupLocation: "Konak Meydanı, İzmir",
    dropLocation: "Bornova, İzmir",
    distance: "12 km",
    fare: "60",
    duration: "25 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Ali", surname: "Çelik", rating: 4.6 },
    pickupLocation: "Çırağan Caddesi, Beşiktaş, İstanbul",
    dropLocation: "Etiler, İstanbul",
    distance: "7 km",
    fare: "35",
    duration: "15 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Emine", surname: "Şahin", rating: 4.4 },
    pickupLocation: "Bodrum Kalesi, Bodrum, Muğla",
    dropLocation: "Yalıkavak, Bodrum, Muğla",
    distance: "20 km",
    fare: "80",
    duration: "30 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Hasan", surname: "Arslan", rating: 4.3 },
    pickupLocation: "Sakarya Caddesi, Çankaya, Ankara",
    dropLocation: "Bahçelievler, Ankara",
    distance: "6 km",
    fare: "25",
    duration: "10 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Zeynep", surname: "Aydın", rating: 4.9 },
    pickupLocation: "Clock Tower, İzmir",
    dropLocation: "Balçova, İzmir",
    distance: "10 km",
    fare: "45",
    duration: "20 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Burak", surname: "Erdem", rating: 4.6 },
    pickupLocation: "Duden Waterfalls, Antalya",
    dropLocation: "Konyaaltı Beach, Antalya",
    distance: "15 km",
    fare: "70",
    duration: "25 mins",
    status: "completed",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
  {
    user: { name: "Sevgi", surname: "Polat", rating: 4.1 },
    pickupLocation: "Ulus, Ankara",
    dropLocation: "Tunali Hilmi Caddesi, Ankara",
    distance: "8 km",
    fare: "35",
    duration: "15 mins",
    status: "canceled",
    startTime: getRandomDateInLastMonth(),
    endTime: getRandomDateInLastMonth(),
  },
];
function RidesScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.header}>My Rides</Text>
      <ScrollView>
        <View style={styles.rideList}>
          {rides.map((ride) => {
            return (
              <Pressable
                key={ride.startTime}
                onPress={() => {
                  console.log(ride.user.name);
                }}
              >
                <View style={styles.rideContainer}>
                  <MaterialCommunityIcons name="taxi" size={33} color="black" />
                  <View style={styles.rideTextInfoContainer}>
                    <Text style={styles.locationText}>{ride.dropLocation}</Text>
                    <Text style={styles.dateText}>
                      {moment(ride.startTime).format("LLL")}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.priceText,
                      { color: ride.status === "completed" ? "green" : "red" },
                    ]}
                  >
                    ₺{ride.fare}
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

export default RidesScreen;

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
