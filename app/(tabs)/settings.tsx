import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker"
import { useTheme } from '@/components/context/ThemeContext';

export default function SettingsScreen() {
  const { setHouse, setMode, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.mode == "dark" ? "#212121" : "white"  }]}>
      <Text style={styles.title}>Select House:</Text>
      <Picker
        onValueChange={(itemValue: string) => setHouse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Gryffindor" value="gryffindor" />
        <Picker.Item label="Hufflepuff" value="hufflepuff" />
        <Picker.Item label="Ravenclaw" value="ravenclaw" />
        <Picker.Item label="Slytherin" value="slytherin" />
      </Picker>

      <Text style={styles.title}>Select Mode:</Text>
      <Picker
        onValueChange={(itemValue: "light" | "dark") => setMode(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Light" value="light" />
        <Picker.Item label="Dark" value="dark" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  picker: { height: 50, width: '100%' },
});
