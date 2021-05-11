import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

//import HomeScreen from "./src/home_screen";
import SignupScreen from "./src/signup_screen";
import BottomBar from "./src/home_screen";
import Post from "./src/details_screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

class GiveawayCard {
  id;
  title;
  prize;
  imageUrl;

  constructor(id, title, prize, imageUrl) {
    this.id = id;
    this.title = title;
    this.prize = prize;
    this.imageUrl = imageUrl;
  }
}

function login() {}

function WelcomeScreen({ navigation }) {
  const [email, setCount] = useState(0);
  const [password, setPass] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GiveawayApp</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setCount(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPass(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          var token;
          //var userId;
          fetch("http://172.20.10.5:8443/api/v1/auth/sign-in", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              login: email,
              password: password,
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              token = "Bearer " + json["token"];
              //userId = json["userId"];
              console.log(token);
              //console.log(json["token"]);
              //res = await response.json();
              //console.log(res);
              //if (response.status == 200) {
              fetch("http://172.20.10.5:8443/api/v1/posts/get-posts", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  //"Content-Type": "application/json",
                  Authorization: token,
                },
              })
                .then((response) => response.json())
                .then((json) => {
                  console.log(json);
                  var cards = new Array();
                  for (var i = 0; i < json.length; i++) {
                    var giveawayCard = new GiveawayCard(
                      json[i]["id"],
                      json[i]["title"],
                      json[i]["prize"],
                      json[i]["imageUrl"]
                    );
                    cards.push(giveawayCard);
                  }
                  var myGivs = new Array();
                  //console.log(json["token"]);
                  fetch("http://172.20.10.5:8443/api/v1/posts/get-my-posts", {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      //"Content-Type": "application/json",
                      Authorization: token,
                    },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      var myCards = new Array();

                      //console.log(json);

                      for (var i = 0; i < json.length; i++) {
                        var myGiv = new GiveawayCard(
                          //json[i]["id"],
                          json[i]["id"],
                          json[i]["title"],
                          json[i]["prize"],
                          json[i]["imageUrl"]
                        );
                        myGivs.push(myGiv);
                        //console.log(myGivs[0].prize);
                      }

                      //myGivs = myCards;
                      //console.log(myGivs[0].title);
                    })
                    .catch((error) => {
                      console.error(error);
                    });

                  navigation.navigate("BottomBar", {
                    giveawayCards: cards,
                    myGivs: myGivs,
                    token: token,
                    //userId: userId,
                  });
                })
                .catch((error) => {
                  console.error(error);
                });
              // } else {
              //   alert("Access Denied");
              //   return;
              // }
            });
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
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
