import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { AppColor } from "@/constants/Style";
import { Tabs } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";

interface props {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabIcon = ({ focused, icon, title }: props) => {
  if (focused) {
    return (
      <View className="justify-center items-center h-[52px] min-w-[112px]">
        <ImageBackground
          source={images.highlight}
          className="h-full w-full overflow-hidden px-5 justify-center items-center"
          imageStyle={{ borderRadius: 26 }}
          resizeMode="stretch"
        >
          <Image
            source={icon}
            tintColor={AppColor.tinColorActive}
            className="5"
          />
          <Text className="text-base font-semibold text-center">{title}</Text>
        </ImageBackground>
      </View>
    );
  }
  return (
    <View>
      <Image
        source={icon}
        tintColor={AppColor.tinColorInActive}
        className="5"
      />
    </View>
  );
};

const tabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: {
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarItemStyle: {
          height: 52,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          height: 52,
          backgroundColor: AppColor.tabBar,
          borderRadius: 26,
          overflow: "hidden",
          position: "absolute",
          marginBottom: 36,
          marginHorizontal: 15,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />
    </Tabs>
  );
};

export default tabLayout;
