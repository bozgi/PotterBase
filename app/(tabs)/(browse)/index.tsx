import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/context/ThemeContext';

export default function CharacterListScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastQuery, setLastQuery] = useState('');
  const { theme } = useTheme();

  const fetchCharacters = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const filterQuery = query ? `&filter[name_cont]=${query}` : '';
    const API_URL = `https://api.potterdb.com/v1/characters?page[number]=${page}&page[size]=20${filterQuery}`;

    try {   
      const response = await axios.get(API_URL);
      const newCharacters = response.data.data || [];

      setCharacters((prev) => {
        const existingIds = new Set(prev.map((char) => char.id));
        return [...prev, ...newCharacters.filter((char) => !existingIds.has(char.id))];
      });

      if (!response.data.links?.next) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore, page, query]);

  useEffect(() => {
    if (query !== lastQuery) {  
      setCharacters([]);
      setPage(0);
      setHasMore(true);
      setLastQuery(query);
      fetchCharacters();
    }
  }, [query, lastQuery]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.mode == "dark" ? "#212121" : "white" }]}>
      <TextInput
        style={[styles.searchInput, { color: theme.text } ]}
        placeholder="Search for a character"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/(browse)/${item.id}`)}
            style={styles.characterItem}
          >
            <Text style={[styles.characterName, { color: theme.text }]}>{item.attributes.name}</Text>
          </TouchableOpacity>
        )}
        onEndReached={() => {
          if (!loading) fetchCharacters();
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
  characterItem: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  characterName: { fontSize: 18 },
});
