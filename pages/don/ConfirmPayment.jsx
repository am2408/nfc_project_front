import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmPayment = ({ route, navigation }) => {
    const { width, height } = Dimensions.get('window');
    const { amount } = route.params;

    // Styles dynamiques
    const dynamicStyles = {
        container: {
            flex: 1,
            flexDirection: width > 600 ? 'row' : 'column',
            backgroundColor: '#4DB6AC',
            padding: 20,
        },
        leftSection: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: 20,
            marginRight: width > 600 ? 10 : 0,
            marginBottom: width <= 600 ? 10 : 0,
            justifyContent: 'space-between',
        },
        contactlessArea: {
            backgroundColor: '#E0F2F1',
            borderRadius: 10,
            height: height * 0.1, // Hauteur dynamique
            marginBottom: 20,
        },
    };

    return (
        <View style={dynamicStyles.container}>
            {/* Section gauche : Détails du don */}
            <View style={dynamicStyles.leftSection}>
                <TouchableOpacity
                    style={[styles.backButton, styles.backButton2]}
                    onPress={() => navigation.navigate('Payment', { amount })}
                >
                    <Text style={styles.backButtonText}>Retour</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Faire un don</Text>
                <View style={styles.donationBox}>
                    <Text style={styles.donationText}>Je fais un don de</Text>
                    <Text style={styles.donationAmount}>{amount}€</Text>
                    <Text style={styles.heartIcon}>❤️</Text>
                </View>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Payment', { amount })}
                >
                    <Text style={styles.backButtonText}>Modifier mon don</Text>
                </TouchableOpacity>
            </View>

            {/* Section droite : Paiement */}
            <View style={styles.rightSection}>
                <Text style={styles.paymentHeader}>Passez votre carte</Text>
                <View style={dynamicStyles.contactlessArea}></View>

                <Text style={styles.orText}>OU</Text>

                {/* Informations de la carte */}
                <TextInput style={styles.input} placeholder="Nom du titulaire" />
                <TextInput style={styles.input} placeholder="Numéro de carte" keyboardType="numeric" />
                <View style={styles.row}>
                    <TextInput style={[styles.input, styles.smallInput]} placeholder="MM/AA" />
                    <TextInput style={[styles.input, styles.smallInput]} placeholder="CVC" keyboardType="numeric" />
                </View>
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Payer {amount}€</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#4DB6AC',
        padding: 20,
    },
    leftSection: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginRight: 10,
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 10,
    },
    donationBox: {
        backgroundColor: '#E0F2F1',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    donationText: {
        fontSize: 16,
        color: '#00796B',
    },
    donationAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00796B',
        marginVertical: 10,
    },
    heartIcon: {
        fontSize: 40,
        color: 'red',
    },
    backButton: {
        backgroundColor: '#00796B',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    backButton2: {
        paddingHorizontal: 15, // Ajoute du padding horizontal pour que le bouton s'ajuste à son texte
        alignSelf: 'flex-start', // Positionne le bouton en haut à gauche du conteneur
    },
    rightSection: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    paymentHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 10,
    },
    contactlessArea: {
        backgroundColor: '#E0F2F1',
        borderRadius: 10,
        height: 80,
    },
    orText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00796B',
        textAlign: 'center',
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#B2DFDB',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallInput: {
        width: '48%',
    },
    payButton: {
        backgroundColor: '#00796B',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConfirmPayment;
