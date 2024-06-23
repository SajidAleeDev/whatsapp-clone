import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/defultStyles";
import { useSignUp } from "@clerk/clerk-expo";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import OptView from "react-native-otp-textinput";

export default function Otp() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Error", "Please fill all fields", [{ text: "OK" }]);
      return;
    }
    if (!isLoaded) return;
    setLoading(true);
    try {
      const SetupComplete = await signUp.attemptEmailAddressVerification({
        code: otp,
      });
      await setActive({
        session: SetupComplete.createdSessionId,
      });
    } catch (error) {
      //@ts-ignore
      Alert.alert("Error", error.errors[0].message);

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <OptView
            inputCount={6}
            autoFocus={true}
            keyboardType="number-pad"
            handleTextChange={(text) => {
              setOtp(text);
            }}
            containerStyle={{
              justifyContent: "space-between",
              width: "100%",
            }}
            textInputStyle={{
              width: 40,
              height: 40,
              borderColor: Colors.grey,
            }}
            inputCellLength={1}
            offTintColor={Colors.grey}
            tintColor={Colors.secondary}
            handleCellTextChange={(text, index) => {
              console.log(text, index, "text, index");
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <Pressable
          onPress={handleVerify}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 15,
            padding: 15,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Verify
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
