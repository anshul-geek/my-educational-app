export async function fetchShorts(query = "education shorts") {
  const apiKey = "AIzaSyCntfXZI8XX3YtAFjGOxRn1jXqBDmKGFdY"; // Replace with your API key
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&videoDuration=short&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  // Filter out items without videoId just in case
  return (data.items || [])
    .filter(item => item.id && item.id.videoId)
    .map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
}
