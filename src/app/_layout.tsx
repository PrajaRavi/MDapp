import { Stack } from "expo-router";
import { Alert, StatusBar } from "react-native";
import {Provider, useDispatch} from "react-redux"
import {store} from "../Redux/Store/user.store"
import { useEffect } from "react";
import api from "./utils/api";
import apiForRefreshToken from "./utils/apiForRefreshToken";
import * as SecureStore from "expo-secure-store"
import { AccessTokenKey, RefreshTokenKey } from "./utils/Dotenv";
import AuthLoader from "./utils/Authloader";
import useNetworkListener from "./utils/Network";
export default function RootLayout() {
  // function AppNavigator() {
  //    useNetworkListener(); 
  //    return <AuthLoader/> 
  //   }
async function RefreshToken(){
  let token=await SecureStore.getItemAsync(AccessTokenKey)
  if(token){

    try {
      let {data}=await apiForRefreshToken.post(`/user/refresh-token-for-app`)
      // useNetworkListener()
      if(data?.success){
        console.log(data)
      await SecureStore.setItemAsync(AccessTokenKey,data?.token)
      await SecureStore.setItemAsync(RefreshTokenKey,data?.refresh)
    }
  } catch (error:any) {
    console.log("error aya hai")
          let {data,status}=error.response;
          if(data?.msg){
            // Alert.alert(data?.msg+"refreshtoken failed")
            console.log(data?.msg+"refreshtoken failed")
          }
    
          console.log(status)
          console.log(error)
  }
}
}

  useEffect(()=>{
    // AppNavigator();
    let interval=setInterval(RefreshToken, 5000);
    return ()=>{
      clearInterval(interval)
    }
  },[])

  
  return(
  <>
   <StatusBar
        
        backgroundColor="#023B40"
      />
      <Provider store={store}>
<AuthLoader/>
      </Provider>

        </> )
}
