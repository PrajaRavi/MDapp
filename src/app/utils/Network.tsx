
// utils/useNetworkListener.ts

import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { router, usePathname } from "expo-router";

export default function useNetworkListener() {
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      (state) => {
        const isConnected =
          state.isConnected &&
          state.isInternetReachable !== false;

        if (!isConnected) {
          if (pathname !=="/Offline") {
            router.replace("/Offline");
          }
        } else {
          if (pathname === "/offline") {
            router.replace("/");
          }
        }
      }
    );

    return unsubscribe;
  }, [pathname]);
}
