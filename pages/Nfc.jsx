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
      const isEnabled = await NfcManager.isEnabled();
      if (!isEnabled) {
        Alert.alert('NFC désactivé', 'Activez NFC dans vos paramètres.');
        return;
      }
  
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('Tag détecté:', tag);
  
      const response = await fetch('https://votre-backend.com/process-nfc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nfcData: tag.id }),
      });
  
      const result = await response.json();
      setPaymentInfo(result); // Directement ici, sans passer par une fonction intermédiaire
  
      Alert.alert('Réponse du backend', JSON.stringify(result));
    } catch (err) {
      console.warn('Erreur lors du scan NFC:', err);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };
  
  

  const [paymentInfo, setPaymentInfo] = React.useState(null);

  const handlePaymentResponse = (response) => {
    setPaymentInfo(response);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.instructions} onPress={scanCard}>
        Appuyez pour scanner une carte NFC
      </Text>
      {paymentInfo && (
        <View>
          <Text>Montant : {paymentInfo.amount / 100} €</Text>
          <Text>Statut : {paymentInfo.status}</Text>
        </View>
      )}
    </View>
  );
  

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
