import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';

export default function History() {
  const [completedActivities, setCompletedActivities] = useState([]);

  useEffect(() => {
    const fetchCompletedActivities = async () => {
      try {
        // Get all activities in the 'completed' table
        const { data, error } = await supabase.from('completed').select();

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
  }, []);

  const deleteActivity = async (id) => {
    try {
      // Delete the activity from the 'completed' table using the id
      const { error } = await supabase.from('completed').delete().eq('id', id);

      if (error) {
        console.error('Error deleting activity:', error);
      } else {
        // If deletion is successful, update the state to reflect the changes
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
          <Text>
            {activity.name} {activity.type}, {activity.participants}
          </Text>
          <Button onPress={() => deleteActivity(activity.id)} title="Delete" />
          
        </View>
        
      ))}
            </ScrollView>

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContainer: {
    marginBottom: 10,
  },
});
