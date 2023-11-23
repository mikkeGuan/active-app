import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import supabase from "../config/supabaseClient";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Dialog } from '@rneui/themed';
import Icon from "react-native-vector-icons/Feather";
import BoredAPI from "bored-package";
export default function History() {
  const [completedActivities, setCompletedActivities] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const toggleDialog = (activity) => {
    setSelectedActivity(activity);
    setVisible(!visible);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchCompletedActivities = async () => {
        try {
          const { data, error } = await supabase.from("completed").select();

          if (error) {
            setCompletedActivities([]);
            console.error(error);
          }

          if (data) {
            setCompletedActivities(data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchCompletedActivities();
    }, [])
  );

  const deleteActivity = async (id) => {
    try {
      const { error } = await supabase.from("completed").delete().eq("id", id);

      if (error) {
        console.error("Error deleting activity:", error);
      } else {
        setCompletedActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {completedActivities.map((activity) => (
          <View key={activity.id} style={styles.activityContainer}>
            <Text>{activity.name}</Text>
            <View style={{ flexDirection: "row"}}>
            <Button
              title="Details"
              style={{ marginTop: 10 }}
              onPress={() => toggleDialog(activity)}
              icon={<Icon name="info" size={24} color="white" />}
              buttonStyle={{ backgroundColor: "rgba(0, 123, 255, 1)" }}
            /> 
            
            <Button
              style={{ marginTop: 10 }}
              onPress={() => deleteActivity(activity.id)}
              icon={<Icon name="trash-2" size={24} color="white" />}
              buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
            />
            </View>
          </View>
        ))}
        <Dialog isVisible={visible}>
          <Dialog.Title title="Activity Details" />
          {selectedActivity && (
              <Text>Category: {selectedActivity.type} {'\n'}Minimum participants: {selectedActivity.participants} {'\n'}Pricing: {selectedActivity.price}</Text>
          )}
          <Dialog.Button title="Close" onPress={() => setVisible(false)} />
        </Dialog>
      </ScrollView>
    </SafeAreaView>
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
  scrollView: {
    flex: 1,
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
