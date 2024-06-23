import Colors from "@/constants/Colors";
import { db } from "@/firebase.config";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
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
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isLoaded, isSignedIn, userId } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  const getdoc = async () => {
    const docRef = doc(db, "users", userId!);
    const docSnap = await getDoc(docRef);
    await console.log(docSnap.data(), "docSnap");

    if (docSnap.id) {
      return docSnap.data();
    } else {
      return null;
    }
  };
  const useDoc = useMemo(async () => await getdoc(), [userId]);
  console.log(useDoc, "useDoc");

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(tabs)";

    if (isSignedIn && !inAuthGroup && useDoc !== null) {
      router.replace("/(tabs)/Chat");
    } else if (isSignedIn && useDoc === null) {
      console.log("not signed in");

      router.replace("/username");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, isLoaded, segments, userId]);

  if (!loaded || !isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={"#000"} />
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
