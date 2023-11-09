import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import supabase from '../config/supabaseClient';

export default function History() {

  const db = () => {
    console.log(supabase)

  }
  db();
  
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
