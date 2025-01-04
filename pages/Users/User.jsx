import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../reducers/userReducer";
const User = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user.role === "") {
      console.log("redirect");

      navigation.navigate("Login");
    } else {
      fetch(`http://192.168.1.105:3003/users/getMe`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            console.log(data);
            setUserData(data.data);
          }
        });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://192.168.1.105:3003/users/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.result) {
        dispatch(removeUser());
        navigation.navigate("Home");
      } else {
        alert("Erreur lors de la déconnexion");
      }
    } catch (error) {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    user.role !== "" && (
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Text style={styles.pseudo}>{userData.pseudo}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>
          <View style={styles.userActions}>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("UpdateUser")}
              style={styles.button}
            >
              <Text>Éditer le profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdatePassword")}
              style={styles.button}
            >
              <Text>Modifier le mot de passe</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  userHeader: {
    flexDirection: "row", // Aligner les éléments horizontalement
    justifyContent: "space-between", // Espacement entre les éléments
    alignItems: "center", // Centrer verticalement les éléments
    marginBottom: 30,
    borderBottomWidth: 1, // Ajouter une bordure en bas
    borderBottomColor: "#dcdcdc",
    paddingBottom: 10,
    borderRadius: 20, // Ajouter des coins arrondis pour tout l'en-tête
    overflow: "hidden", // Assurez-vous que les coins arrondis sont appliqués à tous les éléments à l'intérieur
  },
  userInfo: {
    // Pas de style spécifique ici
  },
  pseudo: {
    fontSize: 20, // Taille plus grande pour le pseudo
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    marginTop: 5,
    color: "#666",
    fontSize: 14,
  },
  userActions: {
    flexDirection: "column", // Organiser verticalement les actions
    justifyContent: "center", // Centrer les actions
    alignItems: "flex-end", // Aligner les actions à droite
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8.5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d", // Couleur rouge pour le bouton de déconnexion
    borderRadius: 8.5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default User;
