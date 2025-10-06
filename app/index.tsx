import axios from 'axios';
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Post from './components/Post';

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
      <Post title={post.title} content={post.content} image={post.image} key={post.id}/>
    )
  })
  return (
    <>
    <Header/>
    <View style={styles.container}>
      {renderedPosts}
      <Text>Home Screen</Text>
      <TouchableHighlight><Text>Click Me!</Text></TouchableHighlight>
    </View>
    <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A3A2A",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})