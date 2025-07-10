import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-gesture-handler";

type ButtonProps = {
  label?: string;
  children?: React.ReactNode;
  customStyle?: object;
  buttonTextStyle?: object;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  customStyle,
  buttonTextStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      {label ? <Text style={buttonTextStyle}>{label}</Text> : children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 3,
    minHeight: 20,
    minWidth: 20,
    borderRadius: "6px",
    backgroundColor: "#C4E1E6",
  },
});

export default Button;
