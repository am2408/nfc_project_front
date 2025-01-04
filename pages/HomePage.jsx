import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import Menu from "../components/Menu";
import { useInactivity } from "../context/InactivityContext";

export default function HomePage({ navigation }) {
  const resetInactivityTimer = useInactivity();

  useEffect(() => {
    resetInactivityTimer(); // Réinitialiser le timer lors du montage
  }, []);

  return (
    <View style={styles.container}>
      <Menu navigation={navigation} />

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Payment")}
        >
          <ImageBackground
            source={require("../assets/sadaqa.png")}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.cardText}>Faire un don</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ProjectPage')}
        >
          <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.cardText}>Découvrir notre projet</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4DB6AC",
  },
  cardsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "45%",
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardImageStyle: {
    borderRadius: 15,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
