import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { AppColor } from "@/constants/Style";

interface props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: props) => {
  return (
    <View className="flex-row items-center gap-2 px-5 py-1 rounded-3xl">
      <Image
        source={icons.search}
        tintColor={"#ffffff"}
        className="size-5"
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        className="flex-1"
        placeholderTextColor={"#ffffff"}
      />
    </View>
  );
};

export default SearchBar;
