import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Index() {
  
  return (
    <>
    <Header/>
    <View style={styles.container}>

      <Text>Home Screen</Text>
      <Link href="./createPost" asChild>
        <Button title="go to details"/>
      </Link>
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