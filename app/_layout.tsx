import Colors from "@/constants/Colors";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
const InitialLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Welcome Back",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          presentation: "modal",
          title: "Enter your Email Address",
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} color={Colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Otp"
        options={{
          presentation: "modal",
          title: "Enter your Verification Code",
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
