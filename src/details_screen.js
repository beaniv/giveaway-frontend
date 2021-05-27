import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Post = ({ navigation, route }) => {
  var id = route.params.id;
  var imageUri = route.params.imageUri;
  var title = route.params.title;
  var priz = route.params.priz;
  var token = route.params.token;
  var description = route.params.description;
  var conditions = route.params.conditions;
  var participant = route.params.participant;
  var creator = route.params.creator;
  var finished = route.params.finished;
  var winnerEmail = route.params.winnerEmail;

  const image = {
    uri: imageUri,
  };

  //console.log(participant);

  if (!creator) {
    if (participant) {
      return (
        <View style={{ backgroundColor: "#003f5c", flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#003f5c" }}
          >
            <ImageBackground source={image} style={styles.image}>
              <Text style={styles.TagLine}>{title}</Text>
              <Text style={styles.Placename}>Выиграй: {priz}</Text>
            </ImageBackground>

            <Text style={styles.Placename}>
              {winnerEmail == "" ? "" : "Победитель: " + winnerEmail}
            </Text>

            <Text
              style={{
                padding: 14,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              О конкурсе
            </Text>
            <Text style={styles.detailText}>{description}</Text>

            <Text
              style={{
                padding: 14,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Условия
            </Text>
            <Text style={styles.detailText}>{conditions}</Text>

            <TouchableOpacity
              style={styles.Btn}
              onPress={() => {
                fetch("http://172.20.10.2:8443/api/v1/posts/add-user-to-post", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  body: JSON.stringify({
                    id: id,
                    //userID: userId,
                  }),
                }).then((response) => console.log(response.status));
                alert("Вы теперь участник!");
              }}
            >
              <Text style={styles.TagLine}>Отменить участие</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "#003f5c", flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#003f5c" }}
          >
            <ImageBackground source={image} style={styles.image}>
              <Text style={styles.TagLine}>{title}</Text>
              <Text style={styles.Placename}>Выиграй: {priz}</Text>
            </ImageBackground>

            <Text style={styles.Placename}>
              {winnerEmail == "" ? "" : "Победитель: " + winnerEmail}
            </Text>

            <Text
              style={{
                padding: 14,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              О конкурсе
            </Text>
            <Text style={styles.detailText}>{description}</Text>

            <Text
              style={{
                padding: 14,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Условия
            </Text>
            <Text style={styles.detailText}>{conditions}</Text>

            <TouchableOpacity
              style={styles.Btn}
              onPress={() => {
                fetch("http://172.20.10.2:8443/api/v1/posts/add-user-to-post", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  body: JSON.stringify({
                    id: id,
                    //userID: userId,
                  }),
                }).then((response) => console.log(response.status));
                alert("Вы теперь участник!");
              }}
            >
              <Text style={styles.TagLine}>Участвовать</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  } else {
    return (
      <View style={{ backgroundColor: "#003f5c", flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#003f5c" }}
        >
          <ImageBackground source={image} style={styles.image}>
            <Text style={styles.TagLine}>{title}</Text>
            <Text style={styles.Placename}>Выиграй: {priz}</Text>
          </ImageBackground>

          <Text style={styles.Placename}>
            {winnerEmail == "" ? "" : "Победитель: " + winnerEmail}
          </Text>

          <Text
            style={{
              padding: 14,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            О конкурсе
          </Text>
          <Text style={styles.detailText}>{description}</Text>

          <Text
            style={{
              padding: 14,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Условия
          </Text>
          <Text style={styles.detailText}>{conditions}</Text>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Btn: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: responsiveScreenHeight(25),
    justifyContent: "flex-end",
  },
  TagLine: {
    color: "white",
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: responsiveScreenFontSize(2),
    paddingHorizontal: 14,
  },
  Placename: {
    color: "white",
    marginVertical: 10,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "bold",
    paddingHorizontal: 14,
  },
  BookTicketBtn: {
    backgroundColor: "#ff6200",
    position: "absolute",
    borderRadius: 40,
    top: "20%",
    right: 10,
    padding: 10,
  },

  detailText: {
    color: "white",
    paddingHorizontal: 14,
    fontSize: responsiveScreenFontSize(1.7),
    fontWeight: "normal",
    opacity: 0.6,
    lineHeight: 25,
  },
  imageLocationIcon: {
    position: "absolute",
    left: "5%",
    bottom: "2%",
  },
});
export default Post;
