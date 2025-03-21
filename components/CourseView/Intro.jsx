import { View, Image, Text } from "react-native";
import React from "react";
import { imageAssets } from "../../constants/Option";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import Button from "../Shared/Button";

export default function Intro({ course }) {
  return (
    <View>
      <Image
        source={imageAssets[course?.banner_image]}
        style={{
          width: "100%",
          height: 280,
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {course?.courseTitle}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          paddingLeft: 20,
        }}
      >
        <Ionicons name="book-outline" size={20} color="black" />
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 18,
          }}
        >
          {course?.chapters?.length}Chapters
        </Text>

        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Description
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          {course?.description}
        </Text>
        <Button text={"Start Now"} onPress={() => console.log("")} />
      </View>
      <Pressable
        style={{
          padding: 10,
        }}
      >
        <Ionicons name="arrow-back" size={34} color="black" />
      </Pressable>
    </View>
  );
}
