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
  } = useFetch(() => fetchMovie({ query: "" }));

  // Tiếng Việt: Hàm này chứa các thành phần nằm phía trên danh sách.
  // English: This function contains the components located above the list.
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
    // Tiếng Việt: Đảm bảo View ngoài cùng có flex-1 để cho phép cuộn.
    // English: Ensure the outermost View has flex-1 to allow scrolling.
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
          // Tiếng Việt: Hiển thị tiêu đề từng bộ phim.
          // English: Display the title of each movie.
          renderItem={({ item }) => (
            <Text className="text-white text-sm px-5 py-2">{item.title}</Text>
          )}
          // Tiếng Việt: Cung cấp mã định danh duy nhất cho mỗi phần tử.
          // English: Provide a unique identifier for each element.
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          // Tiếng Việt: Chèn phần Logo và SearchBar vào đầu danh sách.
          // English: Insert the Logo and SearchBar sections at the top of the list.
          ListHeaderComponent={renderHeader}
          // Tiếng Việt: Khoảng cách đệm ở dưới cùng để nội dung không bị sát mép.
          // English: Padding at the bottom so the content is not too close to the edge.
          contentContainerStyle={{ paddingBottom: 20 }}
          // Tiếng Việt: Kích hoạt lại tính năng cuộn (mặc định là true).
          // English: Re-enable the scrolling feature (default is true).
          scrollEnabled={true}
        />
      )}
    </View>
  );
};

export default Home;
