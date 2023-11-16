import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import supabase from "../config/supabaseClient";
import { useFocusEffect } from "@react-navigation/native";
import { Button, ListItem } from "@rneui/themed";
import Icon from "react-native-vector-icons/Feather";

export default function History() {
  const [completedActivities, setCompletedActivities] = useState([]);

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
          <ListItem key={activity.id}>
            <ListItem.Content>
              <View style={styles.activityContainer}>
                <Text>
                  <ListItem.Title>
                    {activity.name} {activity.type}, {activity.participants}
                  </ListItem.Title>
                </Text>
                <ListItem.Subtitle>
                  <Button
                    onPress={() => deleteActivity(activity.id)}
                    icon={<Icon name="trash-2" size={24} color="white" />}
                    buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
                  />
                </ListItem.Subtitle>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
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
});
