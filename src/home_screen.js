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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// function renderCards() {
//   return;
//   {
//     giveawayCards.map((item) => (
//       <CardEcomFour
//         title={item.title}
//         subTitle={item.description}
//         price={item.prize}
//         image={{
//           uri: item.imageUrl,
//         }}
//         buttonText={"Участвовать"}
//         buttonColor={"#fb5b5a"}
//         onClickButton={() => alert("Has clicked")}
//       />
//     ));
//   }
// }

function HomeScreen({ route, navigation }) {
  //const { giveawayCards, token, userId } = route.params;
  var giveawayCards = route.params.giveawayCards;
  var token = route.params.token;
  //var userId = route.params.userId;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {giveawayCards.map((item, index) => (
          <CardEcomFour
            key={index}
            title={item.title}
            subTitle={item.description}
            price={item.prize}
            image={{
              uri: item.imageUrl,
            }}
            buttonText={"Подробнее"}
            buttonColor={"#fb5b5a"}
            onClickButton={() => {
              //console.log(token);
              fetch(
                "http://172.20.10.5:8443/api/v1/posts/get-post/" + item.id,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                    //id: item.id,
                  },
                }
              )
                .then((response) => response.json())
                .then((json) => {
                  //alert("Вы теперь участник!");
                  navigation.navigate("Post", {
                    id: item.id,
                    imageUri: item.imageUrl,
                    title: item.title,
                    priz: item.prize,
                    token: token,
                    description: json["description"],
                    conditions: json["conditions"],
                  });

                  //myGivs = myCards;
                  //console.log(myGivs[0].title);
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MyGiveaways({ route, navigation }) {
  //const { giveawayCards, token, userId } = route.params;
  var myGivs = route.params.myGivs;
  var token = route.params.token;
  //var userId = route.params.userId;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {myGivs.map((item, index) => (
          <CardEcomFour
            key={index}
            title={item.title}
            subTitle={item.description}
            price={item.prize}
            image={{
              uri: item.imageUrl,
            }}
            buttonText={"Подробнее"}
            buttonColor={"#fb5b5a"}
            onClickButton={() => {
              fetch(
                "http://172.20.10.5:8443/api/v1/posts/get-post/" + item.id,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                    //id: item.id,
                  },
                }
              )
                .then((response) => response.json())
                .then((json) => {
                  //alert("Вы теперь участник!");
                  navigation.navigate("Post", {
                    id: item.id,
                    imageUri: item.imageUrl,
                    title: item.title,
                    priz: item.prize,
                    token: token,
                    description: json["description"],
                    conditions: json["conditions"],
                  });

                  //myGivs = myCards;
                  //console.log(myGivs[0].title);
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// class GiveawayCard {
//   id;
//   title;
//   description;
//   prize;
//   imageUrl;

//   constructor(id, title, description, prize, imageUrl) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.prize = prize;
//     this.imageUrl = imageUrl;
//   }
// }

const Tab = createBottomTabNavigator();

export default function BottomBar({ route, navigation }) {
  //const { giveawayCards_, token_, userId_ } = route.params;

  var giveawayCards_ = route.params.giveawayCards;
  var myGivs_ = route.params.myGivs;
  var token_ = route.params.token;
  //var userId_ = route.params.userId;

  //console.log(myGivs_);
  //console.log(giveawayCards_);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{
          giveawayCards: giveawayCards_,
          token: token_,
        }}
      />
      <Tab.Screen
        name="MyGiveaways"
        component={MyGiveaways}
        initialParams={{
          myGivs: myGivs_,
          token: token_,
        }}
      />
    </Tab.Navigator>
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
