import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { CardEcomFour, CardThree } from "react-native-card-ui";

function renderCards() {
  return;
  {
    giveawayCards.map((item) => (
      <CardEcomFour
        title={item.title}
        subTitle={item.description}
        price={item.prize}
        image={{
          uri: item.imageUrl,
        }}
        buttonText={"Участвовать"}
        buttonColor={"#fb5b5a"}
        onClickButton={() => alert("Has clicked")}
      />
    ));
  }
}

function HomeScreen({ route, navigation }) {
  const { giveawayCards } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {giveawayCards.map((item, index) => (
          <CardEcomFour
            title={item.title}
            subTitle={item.description}
            price={item.prize}
            image={{
              uri: item.imageUrl,
            }}
            buttonText={"Участвовать"}
            buttonColor={"#fb5b5a"}
            onClickButton={() => alert("Has clicked")}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    //alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    shadowColor: "rgba(0,0,0, .2)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0, //default is 1
    backgroundColor: "#003f5c",
    borderWidth: 0,
    borderColor: "transparent",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default HomeScreen;
