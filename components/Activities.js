import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { API_URL, TYPE_URL } from "../constants";
import { Button, Text } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import supabase from '../config/supabaseClient';
import BoredAPI from 'bored-package';
import CustomPicker from './CustomPicker'; 

export default function Activities() {
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("recreational"); // Default

  useEffect(() => {
    getRandomActivity();
  }, []);

  const getRandomActivity = async () => {
    try {
      const activityData = await BoredAPI.getRandomActivity();
      console.log('Random Activity:', activityData);
      setActivity(activityData.activity);
    } catch (error) {
      console.error('Error fetching random activity:', error.message);
    }
  };

   const getActivityByCategory = async () => {
    try {
     const response = await BoredAPI.getActivityByType(category);

  console.log('Response from API:', response);

    if (response && response.activity) {
       console.log(`Activities in category ${category}:`, response.activity);
     setActivity(response.activity);
     } else {
       console.error('Invalid response from API:', response);
     }
   } catch (error) {
      console.error(`Error fetching activities in category ${category}:`, error.message);
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

  return (
    <View style={styles.container}>
      <Text h2>{activity}</Text>
      <CustomPicker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} />
      <Button
        style={{ padding: 20 }}
        radius="xl"
        size="xl"
        type="solid"
         onPress={getActivityByCategory}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#662D8C", "#00CDAC"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
      >
        Find Activity by Category
      </Button>
      <Button style={{ paddingBottom: 20 }} radius="xl" size="xl" type="solid" onPress={getRandomActivity}>
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
