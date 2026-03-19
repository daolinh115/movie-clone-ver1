import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MoviesCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://via.placeholder.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-white font-bold mt-2 text-sm"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View className="flex-row justify-start items-center gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-sm mt-1 font-medium">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-white text-sm mt-1 font-medium">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MoviesCard;
