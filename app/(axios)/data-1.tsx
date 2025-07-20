import { IconSymbol } from "@/components/ui/IconSymbol";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
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
            "https://6874ee13dd06792b9c95e743.mockapi.io/api/v1/books"
          )
        )?.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const newBook = () => {
    navigation.navigate("data-2", { mode: "add" });
  };

  const openBookDetail = (book: any) => {
    navigation.navigate("data-2", { book, mode: "view" });
  };

  const openBookEdit = (book: any) => {
    navigation.navigate("data-2", { book, mode: "edit" });
  };

  const deleteBook = async (book: any) => {
    console.log("delete book");
    try {
      await axios.delete(
        "https://6874ee13dd06792b9c95e743.mockapi.io/api/v1/books/" + book.id
      );
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

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
            <View style={[styles.content, styles.fixedContent]}>
              <Text style={styles.title}>{data.name_book}</Text>
              <Text>{data.name_of_author}</Text>
              <Text style={styles.price}>{data.price_of_book}</Text>
              <Text>{data.description}</Text>
            </View>
            <View style={styles.flexRow}>
              <TouchableOpacity
                style={styles.content}
                onPress={() => openBookEdit(data)}
              >
                <IconSymbol size={28} name="pencil" color={"#0f4f8b"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.content}
                onPress={() => deleteBook(data)}
                activeOpacity={0.6}
              >
                <IconSymbol size={28} name="trash" color={"red"} />
              </TouchableOpacity>
            </View>
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
      <TouchableOpacity style={styles.floatingBtn} onPress={() => newBook()}>
        <IconSymbol size={42} name="plus" color={"blue"} />
      </TouchableOpacity>
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
    justifyContent: "space-around",
  },
  content: {
    maxWidth: cardWidth / 1.9,
  },
  fixedContent: {
    width: cardWidth / 2.2,
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
  floatingBtn: {
    position: "fixed",
    right: 50,
    bottom: 78,
    backgroundColor: "#eeede7",
    borderRadius: 100,
    width: 60,
    height: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
