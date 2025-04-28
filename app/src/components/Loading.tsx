import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../theme/colors";
import LoadingAnimation from "../../../assets/animations/loading.json";

interface LoadingProps {
  size?: number;
  text?: string;
}

export default function Loading({ size = 100, text = "Loading..." }) {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <LottieView
          source={LoadingAnimation}
          autoPlay
          loop
          style={[styles.animation, { width: size, height: size }]}
        />
        {text && <Text style={styles.loadingText}>{text}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    marginBottom: 10,
  },
  loadingText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
});
