import { View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/chatStyles';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import type { InputFieldProps } from '../utils/types';

export const InputField = ({
  refMsgInput,
  msg,
  setMsg,
  sendMsg,
  disableSend,
  isLoadingResponse,
  StopResponseLLM,
  inEditMode,
  cancelEdit,
}: InputFieldProps) => {
  return (
    <View style={styles.inputAndSendContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          ref={refMsgInput}
          placeholder="Enter your text here"
          value={msg}
          onChangeText={(text) => setMsg(text)}
          style={styles.textInput}
          placeholderTextColor="gray"
          multiline
        />
        {inEditMode && (
          <TouchableOpacity onPress={() => cancelEdit()}>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.sendButton}
        activeOpacity={0.7}
        disabled={disableSend}
        onPress={() => {
          if (!isLoadingResponse) {
            sendMsg();
          } else {
            StopResponseLLM();
          }
        }}
      >
        {!isLoadingResponse ? (
          inEditMode ? (
            <FontAwesome name="check" size={24} color="white" />
          ) : (
            <FontAwesome name="send" size={24} color="white" />
          )
        ) : (
          <FontAwesome name="stop" size={22} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};
