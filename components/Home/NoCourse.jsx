import { View, Image, Text } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

export default function NoCourse() {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 40,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/book.png")}
        style={{
          width: 200,
          height: 200,
        }}
        alt="book-img"
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        You Don't have Any Course
      </Text>
      <Button
        text={"+ Create New Course"}
        onPress={() => router.push("/addCourse")}
      />
      <Button text={"+ Explore existing Courses "} type="outline" />
    </View>
  );
}
