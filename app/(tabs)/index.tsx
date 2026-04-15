import MoviesCard from "@/components/MoviesCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Home = () => {
  const route = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovie({ query: "iron man" }));
  const renderHeader = () => (
    <View className="mt-20 mx-auto w-full px-5">
      <Image source={icons.logo} className="h-12 w-10 mx-auto mb-5" />
      <SearchBar
        placeholder="Enter your movie"
        onPress={() => route.push("/search")}
      />
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </View>
  );

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute z-0 w-full" />

      {moviesLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#0000ff"}
          className="mt-10 self-center"
        />
      ) : moviesError ? (
        <Text className="text-white text-center mt-10">
          Error: {moviesError?.message}
        </Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MoviesCard {...item} />}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100 }}
          scrollEnabled={true}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 10,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32"
        />
      )}
    </View>
  );
};

export default Home;
