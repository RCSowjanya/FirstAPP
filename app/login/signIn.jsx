import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useContext } from "react";
import Colors from "./../../constants/Colors";
import { db, auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import { ActivityIndicator } from "react-native";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await getUserDetail();
        setLoading(false);
        router.replace;
        ("/home");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        ToastAndroid.show("Incorrect Email,password", ToastAndroid.BOTTOM);
      });
  };
  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));

    setUserDetail(result.data());
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome back</Text>

      <TextInput
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        style={styles.textInput}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        style={styles.button}
      >
        {!loading ? (
          <Text style={styles.buttonText}>Sign In</Text>
        ) : (
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
        )}
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text>Don't Have an Account? </Text>
        <Pressable onPress={() => router.push("/login/signUp")}>
          <Text style={styles.signInText}>Create New</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 100,
    flex: 1,
    padding: 25,
    backgroundColor: Colors.WHITE,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    marginTop: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signInText: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
  },
});
