import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import { Arrow } from "../../../components/Animations/Arrow";
import { Check } from "../../../components/Animations/Check";
import { Confetti } from "../../../components/Animations/Confetti";
import { ListsContext } from "../../../context/lists";
import { BackgroundApp, primaryBlue } from "../../../global/styles";

export const Welcome = () => {
  const { handleWelcomeDone } = useContext(ListsContext);
  const [isDone, setIsDone] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const slides = [
    {
      key: "1",
      title: "Olá!",
      text: "",
      image: require("../../../../src/assets/ola.png"),
    },
    {
      key: "2",
      title: "Compras",
      text: "Deseja realizar compras....",
      image: require("../../../../src/assets/compras1.png"),
    },
    {
      key: "3",
      title: "Compras",
      text: "De forma organizada?",
      image: require("../../../../src/assets/compras2.png"),
    },
    {
      key: "4",
      title: "Tempo",
      text: "Então economize seu tempo...",
      image: require("../../../../src/assets/tempo.png"),
    },
    {
      key: "5",
      title: "Lista",
      text: "Fazendo a lista das suas compras...",
      image: require("../../../../src/assets/lista.png"),
    },
    {
      key: "6",
      title: "Controle",
      text: "Acompanhando seus gastos...",
      image: require("../../../../src/assets/controle.png"),
    },
    {
      key: "7",
      title: "Logo",
      text: "Com o nosso aplicativo",
      image: require("../../../../src/assets/logo.png"),
    },
    {
      key: "8",
      title: "Bem vindo",
      text: "",
      image: require("../../../../src/assets/bem-vindo.png"),
    },
  ];

  function done() {
    setIsDone(true);
    handleWelcomeDone();
  }

  function slideChange(index) {
    if (index === slides.length - 1) {
      setConfettiVisible(true);
    } else {
      setConfettiVisible(false);
    }
  }

  function renderSlides({ item }) {
    return (
      <View style={styles.container_slide}>
        <View style={styles.container_description}>
          <Text style={styles.description}>{item.text}</Text>
        </View>
        <View style={styles.container_image}>
          <Image style={styles.image} source={item.image} />
        </View>
      </View>
    );
  }

  function renderNextButton() {
    return (
      <View style={styles.buttonCircle}>
        <Arrow />
      </View>
    );
  }

  function renderDoneButton() {
    return (
      <>
        <View style={styles.buttonCircle}>
          <Check />
        </View>
      </>
    );
  }

  return (
    <View style={styles.container_welcome}>
      <AppIntroSlider
        data={slides}
        keyExtractor={(item) => item.key}
        onSlideChange={slideChange}
        renderItem={renderSlides}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        onDone={isDone ? null : done}
        dotStyle={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: primaryBlue,
        }}
        activeDotStyle={{
          backgroundColor: primaryBlue,
          borderWidth: 1,
          borderColor: "#fff",
        }}
      />
      {confettiVisible && <Confetti />}
    </View>
  );
};

const styles = StyleSheet.create({
  container_welcome: {
    flex: 1,

    backgroundColor: BackgroundApp,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#85F0FF",
  },
  container_slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container_description: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 18,
    fontFamily: "BowlbyOneSC-Regular",
    color: primaryBlue,
  },
  container_image: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "center",
  },
  buttonCircle: {
    width: 50,
    height: 50,

    borderRadius: 50 / 2,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    backgroundColor: primaryBlue,
  },
});
