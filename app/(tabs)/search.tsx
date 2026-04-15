import MoviesCard from "@/components/MoviesCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovie({ query: searchQuery }), false);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 flex-1 w-full"
        resizeMode="cover"
      />
      <FlatList
        key={3}
        data={movies}
        renderItem={({ item }) => <MoviesCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full justify-center flex-row mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-10 border border-white overflow-hidden rounded-full">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() !== "" &&
              movies &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search result for{" "}
                  <Text className="text-amber-500">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;
