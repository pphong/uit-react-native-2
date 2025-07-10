import axios from "axios";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface BookItemProps {
  id: string;
  createdAt: string; // ISO string format
  cover: ImageSourcePropType;
  price_of_book: string;
  email_of_seller: string;
  name_of_author: string;
  name_book: string;
  description: string;
}

export default function Data1Screen() {
  const navigation = useNavigation<any>();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setData(
        (
          await axios.get(
            "https://686d0a2314219674dcca2eca.mockapi.io/api/v1/user"
          )
        )?.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openBookDetail = (book: any) => {
    navigation.navigate("data-2", { book });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }: any) => {
    const data: BookItemProps = item;
    return (
      <>
        <TouchableOpacity
          style={styles.card}
          onPress={() => openBookDetail(data)}
        >
          <View style={[styles.card, styles.flexRow]}>
            <Image
              source={data.cover}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <Text style={styles.title}>{data.name_book}</Text>
              <Text>{data.name_of_author}</Text>
              <Text style={styles.price}>{data.price_of_book}</Text>
              <Text>{data.description}</Text>
            </View>
            <View style={styles.content}></View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: BookItemProps) => item.id}
          numColumns={1}
          contentContainerStyle={styles.list}
        />
      </View>
    </>
  );
}
const { width } = Dimensions.get("window");
const cardWidth = width - 48;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  image: {
    width: width / 4,
    height: "80%",
    borderWidth: 1,
    borderRadius: 30,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    margin: 6,
    width: cardWidth,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    minHeight: 250,
  },
  content: {
    maxWidth: cardWidth / 1.9,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  price: {
    fontSize: 16,
    fontWeight: 500,
    color: "#0f4f8b",
  },
});
