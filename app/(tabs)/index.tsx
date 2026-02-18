import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const Home = () => {
  const route = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovie({ query: "" }));
  return (
    <View className="bg-white flex-1">
      <Image source={images.bg} className="absolute z-0" />
      <ScrollView
        className="px-5"
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="h-12 w-10 mt-20 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="mt-5">
            <SearchBar
              placeholder="Enter your movie"
              onPress={() => route.push("/search")}
            />
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Lastest Movies
              </Text>
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
