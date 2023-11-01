import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { API_URL } from '../constants';
import axios from "axios";
import { Button, Icon, Text} from '@rneui/base';

export default function App() {
  const [activity, setActivity] = useState("");


  const fetchActivities = async () => {
    try {
      const result = await axios.get(`${API_URL}`);
      setActivity(result.data.activity);
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  }

  
  
  useEffect(() => {
    fetchActivities()
  }, []);

  return (
    <View style={styles.container}>
      <Text h2>{activity}</Text>
      <Button radius={"xl"} size="xl" type="solid" onPress={fetchActivities}> Find new activity
      <Icon name="forward" color="white" />
      </Button>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Roboto",
    fontWeight: '500',
  },
});
