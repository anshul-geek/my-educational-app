import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const reels = [
  { id: 1, title: "Math Concept in 30s", thumbnail: require('../assets/images/icon.png') },
  { id: 2, title: "Quick Chemistry Trick", thumbnail: require('../assets/images/partial-react-logo.png') },
  // Add more reel items with images
];

export default function ReelsFeed() {
  return (
    <FlatList
      data={reels}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.reelContainer}>
          <Image source={item.thumbnail} style={styles.thumbnail} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={{ padding: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  reelContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: { width: '100%', height: 200 },
  title: { padding: 12, fontWeight: 'bold', fontSize: 16 }
});
