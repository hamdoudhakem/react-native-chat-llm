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
  token?: {
    newMsg: boolean;
    msgToUpdateId: number /*REMARK/IMPORTANT: WE GOT A ARCHITECTURE PROBLEM HERE, I NEED TO UNDERSTAND HOW TO DO THIS PART BEFORE CODING IT */;
    msg: string;
    role: Role;
  } | null;

  // Msg Rendering
  userImage?: number | { uri: string };
  aiImage?: number | { uri: string };
  msgContainerStyle?: StyleProp<ViewStyle>;
  msgTextStyle?: { role: Role; style: StyleProp<ViewStyle> };
  msgTextParsers?: ((msg: string) => React.ReactElement[])[]; // Italicize, etc...

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
  saveOption?: SaveOptionsType;

  // TODO(ME): Complete this later/ Or completely discard it. depends on the architecture
  auto?: boolean;
  MsgGenerator?: (func: (token: string) => void) => Promise<void>; // returns the AI response
  // REMARK(ME): I don't think we can create this (too constraining for user), but let's keep it for now
  GenerateGenerator?: () => (func: (token: string) => void) => Promise<void>; // returns the AI response generator
}

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
export type Role = 'User' | 'AI' | 'All';
