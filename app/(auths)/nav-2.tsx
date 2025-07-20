import Button from "@/components/Button";
import Input from "@/components/Input";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PhoneInput from "react-native-phone-input";
import Toast from "react-native-toast-message";

export default function TabNav2Screen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const phoneInput = useRef(null);
  const [image, setImage] = useState<string | null>(null);

  const create = () => {
    console.log("add new user");
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        age,
        email: username,
        username,
        password,
        phone,
        image
      }),
    }).then((res) => {
      const { status } = res;

      res.json().then((data) => {
        if (status !== 200) {
          Toast.show({
            type: "success", // 'success' | 'error' | 'info'
            text1: "Thành công",
            text2: "Dữ liệu đã được lưu ✅",
            position: "top",
            visibilityTime: 3000,
          });
          setTimeout(() => {
            router.push("/(auths)/nav-1");
          }, 3100);
        } else {
          const { message } = data;
          Toast.show({
            type: "error",
            text1: "Lỗi xảy ra ❌",
            text2: message,
            position: "top",
            visibilityTime: 3000,
          });
        }
      });
    });
  };

  const login = () => {
    router.push("/(auths)/nav-1");
  };

  

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <View style={styles.loginScreen}>
        <View style={styles.viewflexCol}>
          <Link href="/(auths)/nav-1">
            <IconSymbol
              size={32}
              color="#5C46CC"
              name="arrow.backward"
              style={styles.headerImage}
            />
          </Link>

          <Text style={styles.siginTitle}>Create new account</Text>

          <View style={styles.container}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("@/assets/images/react-logo.png")
              }
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.signinContent}>
            <Input
              customStyle={styles.inputCustom}
              inputAccessoryViewID="firstname"
              placeHolder="First Name"
              value={firstName}
              setText={setFirstName}
            ></Input>
            <Input
              customStyle={styles.inputCustom}
              inputAccessoryViewID="lastname"
              placeHolder="Last Name"
              value={lastName}
              setText={setLastName}
            ></Input>
            <Input
              customStyle={styles.inputCustom}
              inputAccessoryViewID="age"
              placeHolder="Age"
              value={age}
              setText={setAge}
            ></Input>
            <Input
              customStyle={styles.inputCustom}
              inputAccessoryViewID="username"
              placeHolder="E-mail"
              value={username}
              setText={setUsername}
            ></Input>
            <Input
              customStyle={styles.inputCustom}
              inputAccessoryViewID="password"
              placeHolder="Password"
              secureTextEntry={true}
              value={password}
              setText={setPassword}
            ></Input>
            <PhoneInput
              style={styles.phoneInput}
              ref={phoneInput}
              initialCountry="vn"
              textProps={{
                placeholder: "Nhập số điện thoại",
              }}
              textStyle={{
                color: "white",
                fontSize: 16,
              }}
              onChangePhoneNumber={setPhone}
            />
          </View>

          <View
            style={[
              styles.loginContent,
              styles.viewflexCol,
              styles.center,
              styles.gap25,
            ]}
          >
            <Button
              buttonTextStyle={styles.whiteText}
              customStyle={[styles.buttonCustom, styles.loginBtn]}
              label="Create an account"
              key={"sendcode"}
              onPress={create}
            ></Button>
            <Button
              buttonTextStyle={styles.blackText}
              customStyle={[styles.buttonCustom, styles.appleBtn]}
              key={"login"}
              onPress={login}
            >
              <Text style={styles.appleText}> Go back to Login</Text>
            </Button>
          </View>

          <Text
            style={[styles.whiteText, styles.marginAuto, styles.marginTop30]}
          >
            By creating an account you agree with our{" "}
            <Link style={styles.loginPhone} href="/(auths)/nav-1">
              Term of policy
            </Link>
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#5C46CC",
    paddingLeft: 15,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  viewflexCol: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  viewflexRow: {
    display: "flex",
    height: 50,
    flexDirection: "row",
    gap: 2,
  },
  viewflexColRev: {
    display: "flex",
    height: 200,
    flexDirection: "column-reverse",
  },
  viewflexRowRev: {
    display: "flex",
    height: 50,
    flexDirection: "row-reverse",
    gap: 2,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  gap10: {
    gap: 10,
  },
  gap20: {
    gap: 20,
  },
  gap25: {
    gap: 25,
  },
  box: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: "8px",
    alignItems: "center",
    justifyContent: "center",
  },
  loginScreen: {
    backgroundColor: "black",
    height: "100%",
  },
  inputCustom: {
    borderRadius: "25px",
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    color: "gray",
  },
  signinContent: {
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 50,
    gap: 20,
  },
  siginTitle: {
    fontSize: 30,
    color: "#5C46CC",
    fontWeight: 700,
    paddingLeft: 30,
  },
  forgot: {
    fontSize: 16,
    color: "#007ad0",
    marginLeft: "auto",
  },
  loginPhone: {
    fontSize: 16,
    color: "#007ad0",
    paddingTop: 15,
    margin: "auto",
  },
  loginContent: {
    paddingTop: 40,
    paddingLeft: 65,
    paddingRight: 65,
  },
  buttonCustom: {
    borderRadius: 25,
    height: 40,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "#5C46CC",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    backgroundColor: "#5C46CC",
    fontSize: 16,
    fontWeight: 700,
  },
  whiteText: {
    color: "white",
  },
  blackText: {
    color: "black",
  },
  fbBtn: {
    backgroundColor: "#1877F2",
    borderBlockColor: "#1877F2",
    fontSize: 16,
    fontWeight: 700,
  },
  appleBtn: {
    backgroundColor: "white",
    borderBlockColor: "white",
    fontSize: 16,
    flexDirection: "row",
  },
  signupText: {
    color: "#5C46CC",
  },
  logoGG: {
    width: 50,
    height: 50,
  },
  appleLogo: {
    color: "black",
  },
  appleText: {
    fontWeight: 500,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 18,
    padding: 10,
    height: 40,
  },
  marginAuto: {
    margin: "auto",
  },
  marginTop30: {
    marginTop: "auto",
  },
  container: {
    alignSelf: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 6,
  },
});
