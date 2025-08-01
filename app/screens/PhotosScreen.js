import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

// Mock data - replace with API call
const MOCK_PHOTOS = {
  '1': [ // Album ID 1
    { id: 'p1', url: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Photo1' },
    { id: 'p2', url: 'https://via.placeholder.com/150/00FF00/FFFFFF?Text=Photo2' },
    { id: 'p3', url: 'https://via.placeholder.com/150/0000FF/FFFFFF?Text=Photo3' },
  ],
  '2': [ // Album ID 2
    { id: 'p4', url: 'https://via.placeholder.com/150/FFFF00/000000?Text=Photo4' },
    { id: 'p5', url: 'https://via.placeholder.com/150/FF00FF/FFFFFF?Text=Photo5' },
  ],
  '3': [], // Album ID 3 - empty
  '4': Array.from({ length: 20 }, (_, i) => ({ id: `r${i}`, url: `https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?Text=R${i+1}` })),
};

const numColumns = 3;
const tileSize = Dimensions.get('window').width / numColumns;

export default function PhotosScreen({ route }) {
  const { albumId, albumName } = route.params;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching photos for the album
    // TODO: Replace with actual API call to your backend (e.g., http://localhost:3000/albums/{albumId}/photos)
    console.log(`Fetching photos for album: ${albumId} (${albumName})`);
    setTimeout(() => {
      setPhotos(MOCK_PHOTOS[albumId] || []);
      setLoading(false);
    }, 1000);
  }, [albumId, albumName]);

  const renderPhoto = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.url }} style={styles.photo} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading photos...</Text>
      </View>
    );
  }

  if (photos.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No photos in this album.</Text>
        {/* TODO: Add a button to upload photos to this album */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
      {/* TODO: Add a Floating Action Button (FAB) to upload new photos */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  list: {
    // alignItems: 'flex-start', // Important for numColumns
  },
  photoContainer: {
    width: tileSize,
    height: tileSize,
    padding: 1, // For a small gap between photos
  },
  photo: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc', // Placeholder background
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
