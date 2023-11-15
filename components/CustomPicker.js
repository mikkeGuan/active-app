// CustomPicker.js
import React from "react";
import { View } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { Feather, Entypo } from "@expo/vector-icons";

const CustomPicker = ({ selectedValue, onValueChange }) => (
  <View
    style={{
      height: 50,
      width: 200,
      borderBottomColor: "black",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Picker
      style={{ flex: 1, color: "purple" }}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      <Picker.Item label="Education" value="education" />
      <Picker.Item label="Recreational" value="recreational" />
      <Picker.Item label="Social" value="social" />
      <Picker.Item label="DIY" value="diy" />
      <Picker.Item label="Charity" value="charity" />
      <Picker.Item label="Cooking" value="cooking" />
      <Picker.Item label="Relaxation" value="relaxation" />
      <Picker.Item label="Music" value="music" />
      <Picker.Item label="Busywork" value="busywork" />
    </Picker>
    <Feather name="chevron-down" color="black" size={24} />
  </View>
);

export default CustomPicker;
