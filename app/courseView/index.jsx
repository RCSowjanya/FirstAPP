import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import Intro from "../../components/CourseView/Intro";
import Colors from "../../constants/Colors";

export default function courseView() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  console.log(courseParams);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Intro course={course} />
    </View>
  );
}
