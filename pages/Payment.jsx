import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Payment = ({ navigation, route }) => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');

    const amounts = [10, 20, 50];

    // Récupérer le montant passé depuis "ConfirmPayment"
    useEffect(() => {
        if (route.params?.amount) {
            const amount = route.params.amount;
            if (amounts.includes(parseInt(amount))) {
                setSelectedAmount(parseInt(amount));
                setCustomAmount('');
            } else {
                setSelectedAmount(null);
                setCustomAmount(amount.toString());
            }
        }
    }, [route.params]);

    const handleAmountPress = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (value) => {
        setSelectedAmount(null);
        setCustomAmount(value);
    };

    const handleValidate = () => {
        const amountToSend = selectedAmount || customAmount;
        if (!amountToSend) return;

        navigation.navigate('ConfirmPayment', { amount: amountToSend });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Faire un don</Text>
                <Text style={styles.subHeader}>Sélectionnez le don que vous souhaitez réaliser</Text>
            </View>

            <View style={styles.amountRow}>
                {amounts.map((amount) => (
                    <TouchableOpacity
                        key={amount}
                        style={[
                            styles.amountBox,
                            selectedAmount === amount && styles.selectedAmountBox,
                        ]}
                        onPress={() => handleAmountPress(amount)}
                    >
                        <Text style={styles.amountText}>Je fais un don de</Text>
                        <Text style={styles.amountValue}>{amount}€</Text>
                    </TouchableOpacity>
                ))}

                <View style={styles.amountBox}>
                    <Text style={styles.amountText}>Autre montant</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entrez un montant"
                        keyboardType="numeric"
                        value={customAmount}
                        onChangeText={handleCustomAmountChange}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.validateButton,
                    !selectedAmount && !customAmount && styles.disabledButton,
                ]}
                onPress={handleValidate}
                disabled={!selectedAmount && !customAmount}
            >
                <Text style={styles.validateButtonText}>Valider mon don</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4DB6AC',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subHeader: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 5,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    amountBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '22%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        elevation: 5,
    },
    selectedAmountBox: {
        borderWidth: 2,
        borderColor: '#00796B',
    },
    amountText: {
        fontSize: 14,
        color: '#00796B',
        textAlign: 'center',
    },
    amountValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796B',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#00796B',
        width: '80%',
        textAlign: 'center',
        fontSize: 16,
        color: '#00796B',
    },
    validateButton: {
        backgroundColor: '#00796B',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#B2DFDB',
    },
    validateButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Payment;
