import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "./../constants/Colors";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { auth, db } from "./config/firebaseConfig";

import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { UserDetailContext } from "../context/UserDetailContext";
export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  useEffect(() => {
    console.log("Auth state listener initialized...");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User detected:", user.email); // Check if user is detected

        try {
          // Fetch user document using UID instead of email
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            console.log("User document found:", userDoc.data()); // Firestore data
            setUserDetail(userDoc.data());
            router.replace("/home"); // Navigate only after setting user data
          } else {
            console.warn(
              "User document not found in Firestore for UID:",
              user.uid
            );
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        console.log("No user detected, staying on the landing page.");
      }
    });

    return () => unsubscribe(); // Cleanup to prevent memory leaks
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../assets/images/landing.png")}
        style={{
          width: "100%",
          height: 300,
          marginTop: 70,
        }}
      />
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          padding: 25,
          height: "100%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "outfit-bold",
            }}
          >
            Welcome to Zen Technologies
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: Colors.WHITE,
              marginTop: 20,
              fontFamily: "outfit-regular",
            }}
          >
            Combat ready soldiers save lives and increase the chance of mission
            success.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login/signUp")}
          >
            <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login/signIn")}
            style={[
              styles.button,
              {
                backgroundColor: Colors.PRIMARY,
                borderColor: Colors.WHITE,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
              Already have an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
