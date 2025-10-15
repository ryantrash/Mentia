import axios from 'axios';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Post from "./components/Post";

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() =>{
      const fetchPosts = async () => {
        const res = await axios.get("http://10.0.2.2:3000/posts"); 
        setPosts(res.data);
      }
      fetchPosts(); 
  },[])

  const renderedPosts = posts.map((post) => {
    return(
      <Post title={post.title} username={post.username} content={post.content} image={post.image} likes={post.likes} id={post.id} key={post.id}/>
    )
  })
  return (
    <>
    <Header/>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
      {renderedPosts}
      </View>
    </ScrollView>
    <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#0A3A2A"
  },
  contentContainer: {
    flexGrow: 1,
  }
})