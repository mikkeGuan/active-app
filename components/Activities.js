import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { API_URL, TYPE_URL } from "../constants";
import axios from "axios";
import { Button, Text } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import supabase from '../config/supabaseClient';
import BoredAPI from 'bored-package';
import CustomPicker from './CustomPicker'; 
import { Feather } from "@expo/vector-icons";

export default function Activities() {
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("recreational"); // Default

  const fetchActivities = async () => {
    try {
      const result = await axios.get(API_URL);
      setActivity(result.data.activity);
    } catch (error) {
      console.error("Error loading random activity:", error);
    }
  };

  const fetchActivitiesByCategory = async () => {
    try {
      const result = await axios.get(`${TYPE_URL}${category}`);
      setActivity(result.data.activity);
    } catch (error) {
      console.error("Error loading activities by category:", error);
    }
  };

  const doneActivities = async () => {
    try {
      await supabase.from('completed').upsert([
        {
          name: activity,
          type: category,
        },
      ]);
    } catch (error) {
      console.error("Error making activity as done: ", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Text h2>{activity}</Text>
      <CustomPicker selectedValue={category} onValueChange={(itemValue, itemIndex) => 
        setCategory(itemValue)} />
      <Button
        style={{ padding: 20 }}
        radius="xl"
        size="xl"
        type="solid"
        onPress={fetchActivitiesByCategory}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#662D8C", "#00CDAC"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
      >
        Find Activity by Category
      </Button>
      <Button style={{ paddingBottom: 20 }} radius="xl" size="xl" type="solid" onPress={fetchActivities}>
        Random Activity
      </Button>
      <Button onPress={doneActivities}>Mark as done</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
    fontWeight: "500",
  },
});
