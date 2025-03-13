import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

import React, { useContext, useState } from "react";
import Colors from "./../../constants/Colors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateNewAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await SaveUser(user);
        //save user to database
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const SaveUser = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      name: fullName,
      email: email,
      member: false,
      uid: user.uid,
    });
    //Navigate to New screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Zen Technologies</Text>

      <TextInput
        placeholder="Full Name"
        onChangeText={(value) => setFullName(value)}
        style={styles.textInput}
      />
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

      <TouchableOpacity onPress={CreateNewAccount} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text>Already Have an Account? </Text>
        <Pressable onPress={() => router.push("/login/signIn")}>
          <Text style={styles.signInText}>Sign In Here</Text>
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
