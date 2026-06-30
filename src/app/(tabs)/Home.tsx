import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";

import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
import ServiceItemsModal, { ServiceItem } from "../components/services";
import SignInCard from "../components/Signincard";
import Popup from "../utils/Popup";
import SignInScreen from "../Signin";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store"
import { AccessTokenKey, BackendUrl } from "../utils/Dotenv";

import api from "../utils/api";
import { login, setUser } from "@/Redux/slice/user.slice";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#01BCBC",
  dark: "#023B40",
  white: "#FFFFFF",
};

const IronIcon=Image.resolveAssetSource(require("@/assets/images/iron.png"))
const cleancloth=Image.resolveAssetSource(require("@/assets/images/clean-clothes.png"))
const BagICon=Image.resolveAssetSource(require("@/assets/images/school-bag.png"))
const ShoeCon=Image.resolveAssetSource(require("@/assets/images/running-shoe.png"))
const BestPrice=Image.resolveAssetSource(require("@/assets/images/best-price.png"))
const clock=Image.resolveAssetSource(require("@/assets/images/clock.png"))
const delivery=Image.resolveAssetSource(require("@/assets/images/delivery.png"))
const guarentty=Image.resolveAssetSource(require("@/assets/images/guarantee.png"))
const payment=Image.resolveAssetSource(require("@/assets/images/payment-gateway.png"))



const whyChooseUs = [
  {label:"Free Pickup",Icon:delivery.uri,id:1},
  {label:"Quality Care",Icon:guarentty.uri,id:2},
  {label:"On-time Delivery",Icon:clock.uri,id:3},
  {label:"Secure Payment",Icon:payment.uri,id:4},
  // "Live Tracking",
  {label:"Best Prices",Icon:BestPrice.uri,id:5},
];

export default function HomeScreen() {
  let [OpenPopUpModel, setOpenPopUpModel] =
  useState<boolean>(false);
  const isLoggedIn =useSelector((state:any)=>state.User.isLoggedIn)
  const dispatch=useDispatch();
  const LogedInUser=useSelector((state:any)=>state.User.user)
  const {t}=useTranslation();
  const services = [
    {
      id: 1,
      name: t("wash_fold"),
      image:
        cleancloth.uri,
         items: [
        {
          id: "shirt",
          label: t("shirt"),
          price: 15,
        },
        {
          id: "tshirt",
          label: t("tshirt"),
          price: 10,
        },
        {
          id: "jeans",
          label: t("jeans"),
          price: 10,
        },
        {
          id: "saree",
          label: t("saree_regular"),
          price: 30,
        },
        {
          id: "sareeE",
          label: t("saree_etc"),
          price: 120,
        },
        {
          id: "Dress",
          label: t("dress_material"),
          price: 20,
        },
      ]
    },
    {
      id: 2,
      name: t("wash_iron"),
      image:
      IronIcon.uri
        ,
    items: [
      {
        id: t("shirt"),
        label: t("shirt"),
        price: 15,
        },
        {
          id: "tshirt",
          label: t("tshirt"),
          price: 12,
        },
        {
          id: "Trouser",
          label: t("trouser"),
          price: 15,
        },
        {
          id: "schl",
          label: t("school_uniform"),
          price: 30,
        },
        {
          id: "kurti",
          label: t("kurti"),
          price: 15,
        },
        {
          id: "plazzo",
          label: t("plazzo"),
          price: 15,
        },
        { id: 34, label: t("saree"), price: 40 },
        { id: 35, label: t("saree_etc"), price: 130 },
        { id: 36, label: t("dress_material"), price: 25 },
  
        
      ]
    },
    {
      id: 3,
      name: t("heavy_wash"),
      image:
        cleancloth.uri,
        items: [
       { id: 1, label: t("curtain"), price: 25 },
    { id: 2, label: t("bed_sheet"), price: 20 },
    { id: 3, label: t("pillow_cover"), price: 12 } 
      ]
    },
    {
      id: 4,
      name: t("bag_cleaning"),
      image:
        BagICon.uri,
        items: [
        { id: 1, label: "Sch. Bag/Office Bag", price: 80 },
    { id: 2, label: "Travel Bag", price: 100 },
   
      ]
    },
    {
      id: 5,
      name: t("shoe_cleaning"),
      image:
        ShoeCon.uri,
        items: [
        { id: 1, label: "Sports shoes", price: 80 },
    { id: 2, label: "Sneakers", price: 80 },
    { id: 3, label: "Casual shoes", price: 60 },
    
      ]
    },
  ];

  const handleServiceClick = (service:any) => {
    // if (!isLoggedIn) {
    //   Alert.alert(
    //     "Login Required",
    //     "You are not logged in"
    //   );
      
    //   return;
    // }
    router.push({pathname:"/ServicesDetail",params:{service:JSON.stringify(service)}})
  };

  
  async function GetLogedInUser(){
    try {
      let {data}=await api.get(`/user/loged-in-user-for-app`);
      if(data.success){
        console.log(data)
        console.log("ravi")
        dispatch(setUser(data?.data))
        
      }
      } catch (error:any) {
        console.log("error aya hai")
      let {data,status}=error.response;
      if(data?.msg){
        Alert.alert(data?.msg+"getuser failed")
      }

      console.log(status)
      console.log(error)
    }
  }
  useEffect(()=>{
    if(isLoggedIn){

      GetLogedInUser();
      // CheckIfUserIsLoginOrNot();
    }
  },[isLoggedIn])

  return (
    <View style={styles.container}>
      <Popup onClose={()=>{setOpenPopUpModel(false)}} visible={OpenPopUpModel} >
    <SignInScreen/>
      </Popup>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        {isLoggedIn?<Animated.View
          entering={FadeInDown}
          style={styles.header}
        >
          <View>
            <Text style={styles.heading}>
              {t("welcome")}, {LogedInUser?.username||"Unknown"} 👋
            </Text>

            <Text style={styles.subHeading}>
            {t("laundry_done_right")}
            </Text>
          </View>

          {isLoggedIn && (
            <Image
              source={{
                uri: `${BackendUrl}/Images/Profile/${LogedInUser?.profilePicture}`,
              }}
              style={styles.avatar}
            />
          )}
        </Animated.View>:
        <SignInCard onPress={()=>{
          router.push("/Signin")
          // router.push("/DeliveryAdmin")
        }}/>
        }

        {/* OFFER BANNER */}

        <Animated.View
          entering={FadeInUp.delay(100)}
          style={styles.banner}
        >
          <View>
            <Text style={styles.offerText}>
              20% OFF
            </Text>

            <Text style={styles.offerSub}>
              ON YOUR FIRST WASH
            </Text>

            <View style={styles.coupon}>
              <Text style={styles.couponText}>
                FIRSTWASH20
              </Text>
            </View>
          </View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
            }}
            style={styles.bannerImage}
          />
        </Animated.View>

        {/* SERVICES */}
        <Animated.View
          entering={FadeInUp.delay(200)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>
            {t("our_services")}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
          >
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                activeOpacity={0.9}
                onPress={
                  ()=>{
                    
                    handleServiceClick(service)
                  }
                }
              >
                <Image
                  source={{
                    uri: service.image,
                  }}
                  style={
                    styles.serviceImage
                  }
                />

                <Text
                  style={
                    styles.serviceText
                  }
                >
                  {service.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* WHY CHOOSE US */}

        <Animated.View
          entering={FadeInUp.delay(300)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>
            {t("schedule_pickup")}
          </Text>

          <View style={styles.grid}>
            {whyChooseUs.map(
              (item, index) => (
                 <TouchableOpacity
                key={item.id}
                style={styles.whyCard}
                activeOpacity={0.9}
                              >
                <Image
                  source={{
                    uri: item.Icon,
                  }}
                  style={
                    styles.serviceImage
                  }
                />

                <Text
                  style={
                    styles.serviceText
                  }
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
              )
            )}
          </View>
        </Animated.View>

        {/* OFFERS */}

        {/* <Animated.View
          entering={FadeInUp.delay(400)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>
            Offers For You
          </Text>

          <View style={styles.offerCard}>
            <Text
              style={styles.offerCardText}
            >
              Free Pickup On Orders
              Above ₹199
            </Text>
          </View>

          <View style={styles.offerCard}>
            <Text
              style={styles.offerCardText}
            >
              10% Cashback On All
              Prepaid Orders
            </Text>
          </View>
        </Animated.View> */}

        <View
          style={{ height: 120 }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021F24",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
  },

  subHeading: {
    color: "#C9D6D8",
    marginTop: 5,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },

  banner: {
    margin: 20,
    backgroundColor: "#01BCBC",
    borderRadius: 25,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  offerText: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "800",
  },

  offerSub: {
    color: "#fff",
    marginTop: 5,
  },

  coupon: {
    marginTop: 15,
    backgroundColor: "#023B40",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },

  couponText: {
    color: "#fff",
    fontWeight: "700",
  },

  bannerImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },

  serviceCard: {
    width: 120,
    backgroundColor: "#023B40",
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
  },

  serviceImage: {
    width: 60,
    height: 60,
  },

  serviceText: {
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  whyCard: {
    width: "48%",
    backgroundColor: "#023B40",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },

  whyTitle: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  offerCard: {
    backgroundColor: "#023B40",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  offerCardText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});