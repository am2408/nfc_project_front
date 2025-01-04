import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const getTodayDate = (code1, code2) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  return today.toLocaleDateString(`${code1}-${code2}`, options);
};

const Menu = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <View style={styles.dateTimeContainer}>
        <Text style={styles.time}>{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</Text>
        <Text style={styles.date}>{getTodayDate('fr', 'FR')}</Text>
        <Text style={styles.date}>{getTodayDate('ar', 'SA')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4DB6AC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 3, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: '#000', // Optional: change color if needed
  },
  logo: {
    width: 75,
    height: 75,
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Menu;
