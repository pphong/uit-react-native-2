import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

type InputProps = {
  inputAccessoryViewID: string;
  placeHolder: string;
  secureTextEntry?: boolean;
  textContentType?: string;
  value?: string;
  setText?: (text: string) => void;
  customStyle?: object;
  canEdit?: boolean;
};
const Input: React.FC<InputProps> = ({
  inputAccessoryViewID,
  placeHolder,
  secureTextEntry,
  value,
  setText,
  customStyle,
  canEdit,
}) => {
  const [editable, setEditable] = useState(canEdit);

  return (
    <TextInput
      style={[
        styles.textInput,
        customStyle,
        !editable && { backgroundColor: "#dbdbdb" },
      ]}
      inputAccessoryViewID={inputAccessoryViewID}
      onChangeText={setText}
      value={value ?? ""}
      placeholder={placeHolder}
      secureTextEntry={secureTextEntry}
      editable={editable}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 3,
    minHeight: 5,
    minWidth: 5,
    borderRadius: "6px",
    borderWidth: 2,
    borderColor: "gray",
    color: "white",
  },
});

export default Input;
