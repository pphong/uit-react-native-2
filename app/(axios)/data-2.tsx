import Button from "@/components/Button";
import Input from "@/components/Input";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  Text,
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

export default function Data2Screen({ route }: any) {
  const navigation = useNavigation<any>();
  const { book }: { book: BookItemProps } = route?.params || {};
  
  const [data, setData] = useState([]);

  const save = () => {
    console.log("save data");
    console.log(book);
    navigation.goBack()
  };

  useEffect(() => {
    if (typeof book != 'object') {
      navigation.navigate("data-1")
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.flexCol]}>
        <Text style={styles.title}>Book Details</Text>
        <Input
          customStyle={styles.inputCustom}
          inputAccessoryViewID="bookName"
          placeHolder="Name"
          value={book.name_book}
          canEdit={false}
        ></Input>
        <Input
          customStyle={styles.inputCustom}
          inputAccessoryViewID="imgUrl"
          placeHolder="Image URL"
          value={book.cover?.toString()}
          canEdit={false}
        ></Input>
        <Input
          customStyle={styles.inputCustom}
          inputAccessoryViewID="author"
          placeHolder="Author"
          value={book.name_of_author}
          canEdit={false}
        ></Input>
        <Input
          customStyle={styles.inputCustom}
          inputAccessoryViewID="description"
          placeHolder="Description"
          value={book.description}
          canEdit={false}
        ></Input>
        <Button
          buttonTextStyle={styles.btnTextSave}
          customStyle={styles.btnSave}
          onPress={save}
          label="Save"
        ></Button>
      </View>
    </View>
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
  flexCol: {
    display: "flex",
    flexDirection: "column",
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
  inputCustom: {
    color: "black",
    width: "100%",
    height: 32,
  },
  btnSave: {
    width: '100%',
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#258eeb'
  },
  btnTextSave: {
    fontWeight: 500,
    color: 'white'
  },
});
