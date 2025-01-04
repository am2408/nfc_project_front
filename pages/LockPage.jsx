import { Image, StyleSheet, Text, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const image = require("../assets/background.jpg");

const LockPage = ({ navigation }) => {
    return (
        <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ImageBackground style={styles.background} source={image}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.img} source={require("../assets/logo.png")} />
                            <Text>Mosquée Al Rahma</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
            </TouchableWithoutFeedback>
        </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        resizeMode: "cover",
        flex: 1,
        justifyContent: 'center',
    },
    logoContainer: {
        top: 100,
        left: 35,
        width: 125,
        height: 125,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        zIndex: 99,
        backgroundColor: "white"
    },
    img: {
        width: 100,
        height: 100,
    },
});

export default LockPage