import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
export default function Index() {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Link href="./createPost" asChild>
          <View style={styles.buttonWrapper}>
            <Button title="Go to Details" color="#B9FBC0" />
          </View>
        </Link>
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A3A2A", 
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    color: "#B9FBC0", 
    fontFamily: "FunnelSans-VariableFont_wght",
    marginBottom: 20,
    letterSpacing: 1,
  },
  buttonWrapper: {
    backgroundColor: "#1F5135",
    padding: 2,
    borderRadius: 12,
    overflow: "hidden",
    width: 200,
  },
});
