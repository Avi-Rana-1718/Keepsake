import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// Mock data - replace with API call
const MOCK_ALBUMS = [
  { id: '1', name: 'Vacation 2024', photoCount: 150 },
  { id: '2', name: 'Family Gatherings', photoCount: 88 },
  { id: '3', name: 'Projects', photoCount: 32 },
  { id: '4', name: 'Random Snaps', photoCount: 210 },
];

export default function AlbumsScreen({ navigation }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching albums
    // TODO: Replace with actual API call to your backend (e.g., http://localhost:3000/albums)
    setTimeout(() => {
      setAlbums(MOCK_ALBUMS);
      setLoading(false);
    }, 1500);
  }, []);

  const renderAlbum = ({ item }) => (
    <TouchableOpacity
      style={styles.albumItem}
      onPress={() => navigation.navigate('Photos', { albumId: item.id, albumName: item.name })}
    >
      <Text style={styles.albumName}>{item.name}</Text>
      <Text style={styles.albumPhotoCount}>{item.photoCount} photos</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading albums...</Text>
      </View>
    );
  }

  if (albums.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No albums found.</Text>
        {/* TODO: Add a button to create a new album */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* TODO: Add a Floating Action Button (FAB) to create new album */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  list: {
    padding: 10,
  },
  albumItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  albumPhotoCount: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
