import React from "react";
import {
  Text,
  View
} from "react-native";

const ComingSoon = () => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          color: "#ff0066",
          fontSize: 18,
          fontWeight: "bold"
        }}
      >
        COMING SOON!
      </Text>
    </View>
  );
};

export default ComingSoon;