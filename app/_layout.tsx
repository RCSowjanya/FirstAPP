import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { UserDetailContext } from "./../context/UserDetailContext";
import { useState } from "react";
export default function RootLayout() {
  useFonts({
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
  });
  const [userDetail, setUserDetail] = useState();
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </UserDetailContext.Provider>
  );
}
