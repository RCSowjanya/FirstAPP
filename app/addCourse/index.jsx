import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constants/Colors";
import Button from "../../components/Shared/Button";
import {
  GenerateCourseAIModel,
  GenerateTopicsAIModel,
} from "../config/AiModel";
import { UserDetailContext } from "./../../context/UserDetailContext";
import { db } from "./../config/firebaseConfig";
import Prompt from "../../constants/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const router = useRouter();
  const onGenerateTopic = async () => {
    setLoading(true);
    //Get Topic ideas from AI model
    const PROMPT = userInput + Prompt.IDEA;
    const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
    const topicIdea = JSON.parse(aiResp.response.text());
    console.log(topicIdea);
    setTopics(topicIdea?.course_titles);
    setLoading(false);
  };
  //if topic is there ind it display,already selected remove it
  const onTopicSelect = (topic) => {
    const isAlreadyExist = selectedTopic.find((item) => item == topic);
    if (!isAlreadyExist) {
      setSelectedTopic((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopic.filter((item) => item !== topic);
      setSelectedTopic(topics);
    }
  };
  const isTopicSelected = (topic) => {
    const selection = selectedTopic.find((item) => item == topic);
    return selection ? true : false;
  };

  /*---used to Generate course using AI model---*/
  // const onGenerateCourse = async () => {
  //   setLoading(true);
  //   const PROMPT = selectedTopic + Prompt.COURSE;
  //   try {
  //     const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
  //     const resp = JSON.parse(aiResp.response.text());
  //     const courses = resp.courses;
  //     console.log("Generated Courses:", courses);
  //     //save course in to database
  //     courses?.forEach(async (course) => {
  //       await setDoc(doc(db, "Courses", Date.now().toString()), {
  //         ...course,
  //         createdOn: new Date(),
  //         createdBy: userDetail?.email,
  //       });
  //       console.log("Course saved successfully:", course);
  //     });
  //     router.push("/home");
  //     setLoading(false);
  //   } catch (e) {
  //     setLoading(false);
  //   }
  // };
  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopic + Prompt.COURSE;

    try {
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);

      // ✅ Parse AI response correctly
      const resp = JSON.parse(aiResp.response.text());

      // ✅ Check if response is an array
      const courses = Array.isArray(resp) ? resp : resp.courses;

      // ✅ Log the courses to debug
      console.log("Generated Courses:", courses);

      if (!courses || courses.length === 0) {
        console.error("No valid courses generated.");
        setLoading(false);
        return;
      }

      // ✅ Save courses in Firestore
      await Promise.all(
        courses.map(async (course) => {
          await setDoc(doc(db, "Courses", Date.now().toString()), {
            ...course,
            createdOn: new Date(),
            createdBy: userDetail?.email,
          });
          console.log("Course saved successfully:", course);
        })
      );

      router.push("/home");
      setLoading(false);
    } catch (e) {
      console.error("Error:", e);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        padding: 25,
        display: "flex",
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 30,
        }}
      >
        Create New Course
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 25,
        }}
      >
        What You Want to Learn today?
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        Write Which course You want to create(Ex.Learn React Js,Digital
        marketing Guide,10th Science Chapters)
      </Text>
      <TextInput
        placeholder="Ex. Learn python"
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />
      <Button
        text="Generate Topic"
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />
      {/*----display the topics here---*/}
      <View
        style={{
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 20,
          }}
        >
          Select all topics which you want to add in the course
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 6,
          }}
        >
          {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={{
                  padding: 7,
                  borderWidth: 0.4,
                  borderRadius: 99,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item)
                    ? Colors.PRIMARY
                    : null,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {selectedTopic?.length > 0 && (
        <Button
          text="Generate Course"
          onPress={() => onGenerateCourse()}
          loading={loading}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 25,
    height: 100,
    marginTop: 20,
    alignItems: "flex-start",
    fontSize: 18,
  },
});
