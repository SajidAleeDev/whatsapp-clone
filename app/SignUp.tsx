import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/defultStyles";
import { useSignUp } from "@clerk/clerk-expo";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoaded, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
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
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      //@ts-ignore
      await router.push({
        pathname: "/Otp",
        params: { email },
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
        <Text
          style={{
            color: Colors.dark,
            fontSize: 13,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Enter your email address and password to an create account and we will
          send you a verification code to verify your email address
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
        {/* <Link
          href={{
            pathname: "/Otp",
            params: { email },
          }}
          asChild
        > */}
        <Pressable
          onPress={handleSignUp}
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
            Sign Up
          </Text>
        </Pressable>
        {/* </Link> */}
      </View>
    </KeyboardAvoidingView>
  );
}
