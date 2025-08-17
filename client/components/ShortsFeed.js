import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { fetchShorts } from "../utils/fetchShorts"; // Make sure this utility returns a list of shorts [{id, title, username}]

const { height } = Dimensions.get("window");

export default function ShortsFeed() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchShorts();
        setShorts(data);
      } catch (e) {
        setShorts([]);
      }
      setLoading(false);
    })();
  }, []);

  // Used to detect which item is fully in view
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setPlayingIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 80 });

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (!shorts.length) return <Text style={{ textAlign: "center", marginTop: 50 }}>No shorts found.</Text>;

  return (
    <FlatList
      data={shorts}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      decelerationRate="fast"
      renderItem={({ item, index }) => (
        <View style={styles.reel}>
          <YoutubePlayer
            videoId={item.id}
            height={height}
            width={"100%"}
            play={playingIndex === index}
            mute={true}
            showFullscreenButton={false}
            initialPlayerParams={{
              controls: false,          // hides controls
              modestbranding: true,     // minimal YouTube branding
              rel: false,               // disable related videos at end
              fs: false,                // hides the full-screen button
            }}
            webViewProps={{
              allowsInlineMediaPlayback: true,
            }}
            // Optionally, add controls={false} to hide controls if desired
          />
          <View style={styles.overlay}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.title}>{item.title}</Text>
            {/* Add icons, actions, etc. here */}
          </View>
        </View>
      )}
      getItemLayout={(_, i) => ({
        length: height,
        offset: height * i,
        index: i
      })}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
}

const styles = StyleSheet.create({
  reel: {
    height: height,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    zIndex: 2,
    // You can further style as needed (add flex, padding, etc.)
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 12,
  },
});
