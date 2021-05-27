import React, { useState } from "react";
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

import DatePicker from "react-native-datepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

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

var tokenGlobal;

function HomeScreen({ route, navigation }) {
  //const { giveawayCards, token, userId } = route.params;
  var giveawayCards = route.params.giveawayCards;
  var token = route.params.token;
  //var userId = route.params.userId;
  tokenGlobal = token;
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
                "http://172.20.10.2:8443/api/v1/posts/get-post/" + item.id,
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
                    participant: json["participant"],
                    creator: json["creator"],
                    finished: json["finished"],
                    winnerEmail: json["winnerEmail"],
                  });

                  //myGivs = myCards;
                  //console.log(json["participant"]);
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
                "http://172.20.10.2:8443/api/v1/posts/get-post/" + item.id,
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
                    participant: json["participant"],
                    creator: json["creator"],
                    finished: json["finished"],
                    winnerEmail: json["winnerEmail"],
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

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum;
}

function CreateGivScreen({ navigation }) {
  const [title, setTitle] = useState(0);
  const [prize, setPrize] = useState(0);
  const [imageUrl, setImg] = useState(0);
  const [description, setDescription] = useState(0);
  const [conditions, setConds] = useState(0);
  const [date, setDate] = useState(0);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.logo}>Create Post</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Title..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Image Url..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setImg(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="MM/DD/YYYY HH:MM:SS ..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setDate(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Prize..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPrize(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Conditions..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setConds(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Description..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            fetch("http://172.20.10.2:8443/api/v1/posts/add-post", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: tokenGlobal,
              },
              body: JSON.stringify({
                conditions: conditions,
                description: description,
                finishTime: toTimestamp(date),
                imageUrl: imageUrl,
                prize: prize,
                title: title,
              }),
            }).then((response) => {
              if (response.status == 200) {
                alert("Giveaway Created!");
              } else {
                alert("Couldn't create giveaway :^(");
                console.log(response.status);
                return;
              }
            });
          }}
        >
          <Text style={styles.loginText}>Create Giveaway!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = "albums-outline";
          } else if (route.name === "MyGiveaways") {
            iconName = "person-circle-outline";
          } else if (route.name === "Create Post") {
            iconName = "add-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "#02415D", //color you want to change
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{
          giveawayCards: giveawayCards_,
          token: token_,
        }}
      />
      <Tab.Screen name="Create Post" component={CreateGivScreen} />
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
    backgroundColor: "#255675",
    alignItems: "center",
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
    fontSize: 40,
    color: "#fb5b5a",
    marginBottom: 35,
    marginTop: 20,
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
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    color: "white",
  },
});
