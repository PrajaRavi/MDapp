import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const PRIMARY = "#01BCBC";
const DARK = "#023B40";

export default function CustomTabBar({
  state,
  navigation,
}: any) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: DARK,
          borderRadius: 999,
          paddingVertical: 12,
          paddingHorizontal: 8,
          shadowColor: PRIMARY,
          shadowOpacity: 0.2,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        {state.routes.map(
          (route: any, index: number) => {
            const focused =
              state.index === index;

            return (
              <TabItem
                key={route.key}
                label={route.name}
                focused={focused}
                onPress={() =>
                  navigation.navigate(
                    route.name
                  )
                }
              />
            );
          }
        )}
      </View>
    </View>
  );
}

type TabItemProps = {
  label: string;
  focused: boolean;
  onPress: () => void;
};

function TabItem({
  label,
  focused,
  onPress,
}: TabItemProps) {
  const animatedStyle =
    useAnimatedStyle(() => ({
      transform: [
        {
          scale: withSpring(
            focused ? 1.08 : 1
          ),
        },
      ],
    }));

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Animated.View
        style={[
          {
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 999,
            height:50
          },
          animatedStyle,
          focused && {
            backgroundColor: PRIMARY,
          },
        ]}
      >
        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

            {label=="Home"&&<Feather name={"home"} size={20} color={focused?"black":"white"} />}
            {label=="Orders"&&<Feather name="shopping-bag" size={24} color={focused?"black":"white"} />}
            {label=="Profile"&&<AntDesign name="user" size={24} color={focused?"black":"white"} />}
        <Text
          style={{
              color: focused
              ? "#000"
              : "#fff",
              fontWeight: "300",
              textTransform:
              "capitalize",
              fontSize:focused?13:10,
              
              
            }}
            
            >
          {label}
        </Text>
            </View>
      </Animated.View>
    </TouchableOpacity>
  );
}