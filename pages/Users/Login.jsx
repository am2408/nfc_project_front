import { addUser } from "../../reducers/userReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeSlash } from "../../assets/svgs/Svg";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const user = useSelector((state) => state.userReducer.value);

  useEffect(() => {
    // console.log(user);
    if (user.role !== "") {
      navigation.navigate("Home");
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const request = await fetch("http://192.168.1.105:3003/users/signin", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!request.ok) {
        throw new Error(`HTTP Error: ${request.status}`);
      }

      const user = await request.json();
      console.log(user);

      if (user.result) {
        setErrorMsg("");
        console.log(user.data);
        dispatch(addUser(user.data));
        navigation.navigate("Home");
      } else {
        setErrorMsg("Wrong pseudo or password");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setErrorMsg("Network error or invalid response from server.");
    }
  };

  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.label}>Nom d'utilisateur ou adresse email</Text>
        <Controller
          control={control}
          name="pseudo"
          rules={{
            required: "Pseudo or email is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor: "white", color: "black" },
              ]}
              placeholder="Johnny"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.pseudo && (
          <Text style={styles.errorMsg}>{errors.pseudo.message}</Text>
        )}

        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.inputPassword}>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "white", color: "black" },
                ]}
                secureTextEntry={!visiblePassword}
                placeholder="Mot de passe"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setVisiblePassword((prev) => !prev)}
          >
            {visiblePassword ? <EyeSlash /> : <Eye />}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorMsg}>{errors.password.message}</Text>
        )}
        {errorMsg.length > 0 && <Text style={styles.errorMsg}>{errorMsg}</Text>}

        <TouchableOpacity
          style={[styles.buttonForm, styles.colorWhite]}
          onPress={() => {
            handleSubmit((data) => {
              console.log("Form Data:", data); // Débogage
              handleLogin(data);
            })();
          }}
        >
          <Text>Connect</Text>
        </TouchableOpacity>

        <Text style={styles.already}>
          Pas de compte ?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Enregistrez-vous ici
          </Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    borderWidth: 1,
    width: "80%",
    padding: 30,
    borderRadius: 35,
    margin: 10,
    alignSelf: "center",
  },
  label: {
    fontSize: 14,
    alignSelf: "flex-start",
  },
  input: {
    padding: 10,
    borderRadius: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputPassword: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eye: {
    position: "absolute",
    right: 10,
  },
  buttonForm: {
    color: "#fff",
    borderRadius: 8.5,
    padding: 10,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  colorWhite: {
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 1,
  },
  errorMsg: {
    color: "red",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
  },
  already: {
    textAlign: "center",
    marginTop: 30,
  },
  link: {
    color: "aqua",
    textDecorationLine: "underline",
  },
});

export default Login;
