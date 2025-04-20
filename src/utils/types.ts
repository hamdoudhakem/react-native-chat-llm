import React from 'react';
import type {
  StyleProp,
  TextInput,
  ViewabilityConfig,
  ViewStyle,
  ViewToken,
} from 'react-native';

type ReactElements = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
>;

// ==============================
// Chat Props Types
// ==============================

// ChatPropsBase is the base type for ChatPropsWithRefresh and ChatPropsWithoutRefresh
export interface ChatPropsBase {
  // Logic properties
  msg: string; // TODO(ME): Check if I should use a string or a Message Type
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  msgs: Message[];
  setMsgs: React.Dispatch<React.SetStateAction<Message[]>>;
  // TODO(ME): Complete this later/ Or completely discard it. depends on the architecture
  auto?: boolean;
  MsgGenerator: (func: (token: string) => void) => Promise<void>; // returns the AI response
  cancelResponse: () => void;
  // REMARK(ME): I don't think we can create this (too constraining for user), but let's keep it for now
  GenerateGenerator?: () => (func: (token: string) => void) => Promise<void>; // returns the AI response generator

  // Selected Options (additional options to "Copy" and "delete")
  selectedOptions?: {
    name: string;
    image: number | { uri: string } | ReactElements; // in case of custom components or expo-vetors
    onPress: () => void;
  }[];

  // Send Options (additional options like send image or file)
  sendOptions?: {
    name: string;
    image: number | { uri: string } | ReactElements; // in case of custom components or expo-vetors
    onPress: () => void;
  }[];

  // Msg Rendering
  userImage?: number | { uri: string };
  aiImage?: number | { uri: string };
  msgContainerStyle?: StyleProp<ViewStyle>;
  msgTextStyle?: { role: Role; style: StyleProp<ViewStyle> };
  msgTextParsers?: (msg: string) => React.ReactElement[]; // Italicize, etc...
  msgLoader?: ReactElements; // what to show inside the msg container when the msg is loading
  aiMsgLoadingOption?: AiMsgLoadingType; // TODO(ME): set if the msg loads in one go or with each token

  // Sounds
  userMsgSound?: number; // TODO(ME): set the Sound logic
  aiMsgSound?: number;

  // ListView Behavior
  viewabilityConfig?: ViewabilityConfig;
  onViewableItemsChanged?: (info: {
    viewableItems: ViewToken<Message>[];
    changed: ViewToken<Message>[];
  }) => void;

  // List Properties
  header?: ReactElements;
  headerStyle?: StyleProp<ViewStyle>;
  footer?: ReactElements;
  footerStyle?: StyleProp<ViewStyle>;
  emptyList?: ReactElements;
  itemSeparatorComponent?: ReactElements;

  // List background properties
  backgroundColor?: string;
  backgroundImage?: number | { uri: string };
  backgroundImageResizeMode?:
    | 'cover'
    | 'contain'
    | 'stretch'
    | 'repeat'
    | 'center';

  // Persistence Options
  loadSaved?: boolean; // TODO(Me): if I should show the last saved convo or just use what's in msgs
  saveOption?: SaveOptionsType;
}

//TODO(ME): Refreshing will be about showing pervious messages to the loaded ones (or loading everything)
// Maybe I will get rid of this
type ChatPropsWithRefresh = ChatPropsBase & {
  refreshing: boolean;
  onRefresh: () => void;
};

type ChatPropsWithoutRefresh = ChatPropsBase & {
  refreshing?: never;
  onRefresh?: never;
};

export type ChatProps = ChatPropsWithRefresh | ChatPropsWithoutRefresh;

// ==============================
// Message Types
// ==============================

export interface MsgContainerProps {
  msg: Message;
  onOptionPress?: (option: string, msg: Message) => void;
}

export interface Message {
  id: number;
  content: string;
  role: Role;
  createdAt: Date;
  isEdited: boolean;
}

export interface InputFieldProps {
  refMsgInput: React.RefObject<TextInput>;
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  inEditMode: boolean;
  cancelEdit: () => void;
  disableSend: boolean;
  sendMsg: () => void;
  StopResponseLLM: () => void;
  isLoadingResponse: boolean;
}

export type SaveOptionsType = 'MMKV' | 'AsyncStorage' | undefined;
export type AiMsgLoadingType = 'All' | 'typing' | undefined;
export type Role = 'User' | 'AI' | 'All';
