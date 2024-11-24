import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import axios from 'axios';
import { useTheme } from '@/components/context/ThemeContext';

const API_URL = 'https://api.potterdb.com/v1/characters';

export default function CharacterDetailsScreen() {
  const { id } = useGlobalSearchParams();
  const { theme } = useTheme();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    
    const fetchCharacter = async () => {
      try {
        console.log(`${API_URL}/${id}`);
        const response = await axios.get(`${API_URL}/${id}`);
        setCharacter(response.data.data.attributes);   
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {character.image ? (
        <Image source={{ uri: character.image }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No image available</Text>
      )}
      <Text style={[styles.title, { color: theme.text }]}>{character.name}</Text>
      <Text style={[styles.detail, { color: theme.text }]}>Born: {character.born || 'N/A'}</Text>
      <Text style={[styles.detail, { color: theme.text }]}>Died: {character.house || 'N/A'}</Text>
      <Text style={[styles.detail, { color: theme.text }]}>Patronus: {character.patronus || 'N/A'}</Text>
      <Text style={[styles.detail, { color: theme.text }]}>Gender: {character.gender || 'N/A'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  noImageText: { fontSize: 16, fontStyle: 'italic', marginBottom: 16 },
  detail: { fontSize: 16, marginBottom: 8 },
  image: { flex: 1, width: "100%", height: "100%", marginBottom: 16 },
});
