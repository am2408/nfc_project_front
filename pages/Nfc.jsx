import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, IsoDep } from 'react-native-nfc-manager';

const NfcScan = () => {
  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    NfcManager.start()
      .then(() => console.log('NFC Manager started'))
      .catch(err => console.error('NFC Error:', err));

    return () => {
      NfcManager.stop();
    };
  }, []);

  const extractCardData = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.IsoDep);
      const tag = await NfcManager.getTag();

      if (!tag) {
        throw new Error('No NFC card detected');
      }

      console.log('Card Detected:', tag);

      // APDU Command to Select EMV Application (Example for VISA)
      const SELECT_VISA = [0x00, 0xA4, 0x04, 0x00, 0x07, 0xA0, 0x00, 0x00, 0x00, 0x03, 0x10, 0x10];

      const isoDep = IsoDep(tag.id);
      await isoDep.connect();

      const response = await isoDep.transceive(SELECT_VISA);
      console.log('Response:', response);

      if (!response) {
        throw new Error('Failed to read card data');
      }

      // Extract PAN (Card Number) and Expiration Date
      const cardNumber = parseCardNumber(response);
      const expMonth = parseExpirationMonth(response);
      const expYear = parseExpirationYear(response);

      setCardInfo({ cardNumber, expMonth, expYear });

      Alert.alert('Card Info', `Card: ${cardNumber}\nExp: ${expMonth}/${expYear}`);

      // Send card data to backend for tokenization
      const tokenResponse = await fetch('http://192.168.1.152:3003/stripe/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardNumber, expMonth, expYear, cvc: '123' }),
      });

      const tokenData = await tokenResponse.json();
      console.log('Stripe Token:', tokenData.token);

      if (!tokenData.success) {
        throw new Error('Failed to tokenize card');
      }

      // Process payment automatically
      // const paymentResponse = await fetch('http://localhost:3003/stripe/process-nfc', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     nfcData: tokenData.token,
      //     amount: 5000, // €50
      //     currency: 'eur',
      //     description: 'NFC Payment',
      //   }),
      // });

      // const paymentResult = await paymentResponse.json();
      const paymentResult = "C'est bon!";
      Alert.alert('Payment Status', paymentResult.message);
    } catch (err) {
      console.error('NFC Payment Error:', err);
      Alert.alert('Error', err.message);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions} onPress={extractCardData}>
        Tap to Scan NFC Payment Card
      </Text>
      {cardInfo && (
        <View>
          <Text>Card Number: {cardInfo.cardNumber}</Text>
          <Text>Expiration: {cardInfo.expMonth}/{cardInfo.expYear}</Text>
        </View>
      )}
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
