// Fallback for using MaterialIcons on Android and web.

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
type IconMapping2 = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof Feather>["name"]
>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  'd.square': 'account-box',
  'e.square': 'rocket-launch',
  'arrow.backward': 'arrow-back-ios',
  'arrow.forward': 'arrow-forward-ios',
  'apple.logo': 'apple',
  'cart.badge.plus': 'shopping-cart',
  'arrow.backward.to.line':'keyboard-arrow-right'
} as IconMapping;

const MAPPING_2 = {
  trash: "trash-2",
  pencil: "edit",
  plus: "plus-circle"
} as IconMapping2;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <>
      {MAPPING[name] && (
        <MaterialIcons
          color={color}
          size={size}
          name={MAPPING[name]}
          style={style}
        />
      )}
      {MAPPING_2[name] && (
        <Feather
          color={color}
          size={size}
          name={MAPPING_2[name]}
          style={style}
        />
      )}
    </>
  );
}
