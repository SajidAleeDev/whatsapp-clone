import Colors from "@/constants/Colors";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/defultStyles";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields", [{ text: "OK" }]);
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Invalid email address", [{ text: "OK" }]);
      return;
    }
    if (!isLoaded) return;
    setLoading(true);
    try {
      const SetupComplete = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({
        session: SetupComplete.createdSessionId,
      });
    } catch (error) {
      //@ts-ignore
      Alert.alert("Error", error.errors[0].message);
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={70}
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
          flex: 1,
          backgroundColor: Colors.white,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 30,
        }}
      >
        <Text
          style={{
            color: Colors.dark,
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Please enter your email address and password to login
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TextInput
            style={{
              marginVertical: 4,
              height: 50,
              borderWidth: focus.email ? 1 : 0.2,
              borderColor: focus.email ? Colors.primary : Colors.dark,
              borderRadius: 12,
              padding: 10,
              backgroundColor: "#fff",
              flex: 1,
            }}
            placeholder="Email Address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            onSubmitEditing={() => passwordRef.current?.focus()}
            ref={emailRef}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onFocus={() => setFocus({ ...focus, email: true })}
            onBlur={() => setFocus({ ...focus, email: false })}
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View
          style={{
            flexDirection: "row",

            marginTop: 10,
            flex: 1,
          }}
        >
          <TextInput
            style={{
              marginVertical: 4,
              height: 50,
              borderWidth: focus.password ? 1 : 0.2,
              borderColor: focus.password ? Colors.primary : Colors.dark,
              borderRadius: 12,
              padding: 10,
              backgroundColor: "#fff",
              flex: 1,
            }}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            onFocus={() => setFocus({ ...focus, password: true })}
            onBlur={() => setFocus({ ...focus, password: false })}
            placeholderTextColor={Colors.dark}
            ref={passwordRef}
            returnKeyType="done"
            secureTextEntry
          />
        </View>
        <Pressable
          onPress={handleLogin}
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
            Login
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: Colors.dark,
            }}
          >
            Don't have an account?{" "}
          </Text>
          <Pressable
            onPress={() => {
              router.push("SignUp");
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
