import { Image, ScrollView, StyleSheet, View } from 'react-native';

const stories = [
  { id: 1, image: require('../assets/images/1.png') },
  { id: 2, image: require('../assets/images/2.png') },
  // Add more sample story images
];

export default function StoryBar() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {stories.map(story => (
        <View key={story.id} style={styles.story}>
          <Image source={story.image} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  story: { width: 64, height: 64, borderRadius: 32, marginHorizontal: 8, overflow: 'hidden', borderWidth: 2, borderColor: '#888', alignItems: 'center', justifyContent: 'center' },
  image: { width: 56, height: 56, borderRadius: 28 },
});
