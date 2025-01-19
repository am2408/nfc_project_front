import React, { useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

const NfcScan = () => {
  useEffect(() => {
    // Initialiser le NFC Manager
    NfcManager.start()
      .then(() => console.log('NFC Manager démarré'))
      .catch(err => console.error('Erreur NFC Manager:', err));

    return () => {
      NfcManager.stop();
    };
  }, []);

  const scanCard = async () => {
    try {
      // Vérifier si NFC est activé
      const isEnabled = await NfcManager.isEnabled();
      if (!isEnabled) {
        Alert.alert('NFC désactivé', 'Activez NFC dans vos paramètres.');
        return;
      }

      // Démarrer la technologie NFC
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Lire les données de la carte
      const tag = await NfcManager.getTag();
      console.log('Tag détecté:', tag);

      Alert.alert('Carte scannée', JSON.stringify(tag));
    } catch (err) {
      console.warn('Erreur lors du scan NFC:', err);
    } finally {
      // Nettoyer la session NFC
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions} onPress={scanCard}>
        Appuyez pour scanner une carte NFC
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default NfcScan;
