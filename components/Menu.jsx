import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { UserIcon } from "../assets/svgs/Svg";
import { useFocusEffect } from "@react-navigation/native";

const getTodayDate = (code1, code2) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  return today.toLocaleDateString(`${code1}-${code2}`, options);
};

const Menu = ({ navigation }) => {
  const [date, setDate] = useState();
  const [dateFr, setDateFr] = useState();
  const [dateAr, setDateAr] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => {
        setDate(
          new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

        setDateFr(getTodayDate("fr", "FR"));
        setDateAr(getTodayDate("ar", "SA"));
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, [])
  );

  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <UserIcon />
      </TouchableOpacity>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.time}>{date}</Text>
        <Text style={styles.date}>{dateFr}</Text>
        <Text style={styles.date}>{dateAr}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4DB6AC",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3, // For shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dateTimeContainer: {
    alignItems: "flex-end",
    padding: 5,
    borderRadius: 5,
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    color: "#fff",
  },
});

export default Menu;
