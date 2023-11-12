import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { API_URL, TYPE_URL } from "../constants";
import axios from "axios";
import { Button, Text } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import {Picker} from '@react-native-picker/picker';
import supabase from '../config/supabaseClient';

export default function Activities() {
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("recreational"); // Default

  const fetchActivities = async () => {
    try {
      const result = await axios.get(API_URL);
      setActivity(result.data.activity);
    } catch (error) {
      console.error("Error loading activities:", error);
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
/*           participants: 
 */        },
      ])
    
  } catch (error) {
    console.error("Error making activity as done: ", error)
  }
}
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Text h2>{activity}</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) =>
           setCategory(itemValue)}
      >
        <Picker.Item label="Education" value="education"  />
        <Picker.Item label="Recreational" value="recreational" />
        <Picker.Item label="Social" value="social" />
        <Picker.Item label="DIY" value="diy" />
        <Picker.Item label="Charity" value="charity" />
        <Picker.Item label="Cooking" value="cooking" />
        <Picker.Item label="Relaxation" value="relaxation" />
        <Picker.Item label="Music" value="music" />
        <Picker.Item label="Busywork" value="busywork" />
      </Picker>
      <Button
      style= {{padding: 20}}
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
      <Button style={{paddingBottom: 20}}radius="xl" size="xl" type="solid" onPress={fetchActivities}>
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

}

);
