import Button from "@/components/Button";
import Input from "@/components/Input";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TabNav1Screen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ message: "" });

  const login = () => {
    console.log("login");
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      // credentials: "include", // Include cookies (e.g., accessToken) in the request
    }).then((res) => {
      const { status } = res;
      res.json().then((data) => {
        if (status != 200) {
          const { message } = data;
          if (message) {
            setError({ message });
          }
        } else {
          const userData = data;
          localStorage.setItem("userData", JSON.stringify(userData));
          const { accessToken, refreshToken } = data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          router.push("/(axios)/data-1");
        }
      });
    });
  };

  const signUp = () => {
    console.log("signup");
    router.push("/(auths)/nav-2");
  };

  return (
    <>
      <View style={styles.loginScreen}>
        <View style={styles.viewflexCol}>
          <Text style={styles.siginTitle}>Sign In</Text>

          <View style={styles.signinContent}>
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
            {error.message !== "" && (
              <Text style={[styles.error]}>{error.message ?? "Error"}</Text>
            )}
          </View>

          <View
            style={[
              styles.loginContent,
              styles.viewflexCol,
              styles.center,
              styles.gap35,
            ]}
          >
            <Button
              buttonTextStyle={styles.whiteText}
              customStyle={[styles.buttonCustom, styles.loginBtn]}
              label="Log in"
              key={"login"}
              onPress={login}
            ></Button>

            <Button
              buttonTextStyle={styles.blackText}
              customStyle={[styles.buttonCustom, styles.appleBtn]}
              key={"loginApple"}
              onPress={signUp}
            >
              <Text style={styles.appleText}> Sign Up</Text>
            </Button>
          </View>
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
  gap35: {
    gap: 35,
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
  error: {
    color: "red",
    fontWeight: 600,
  },
});
