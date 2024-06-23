import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/defultStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

export default function Otp() {
  const { email } = useLocalSearchParams<{ email: string }>();
  console.log(email, "email");

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  console.log(otp, "otp");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
      }}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <View
        style={{
          height: "35%",
          backgroundColor: Colors.primary,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="lock" size={50} color={Colors.white} />
      </View>
      <View
        style={{
          height: "65%",
          backgroundColor: Colors.white,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: 13,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Enter your verification code to verify your email address{" "}
            <Text
              style={{
                color: Colors.secondary,
              }}
            >
              {email}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 40,
              }}
            ></View>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
