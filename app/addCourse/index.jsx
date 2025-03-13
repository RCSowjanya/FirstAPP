import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Button from "../../components/Shared/Button";
import { GenerateTopicsAIModel } from "../config/AiModel";
import Prompt from "../../constants/Prompt";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
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
  return (
    <View
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
    </View>
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
