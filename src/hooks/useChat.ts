/*eslint-disable @typescript-eslint/no-unused-vars*/
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';

export const useChat = () => {
  const refMsgInput = useRef<TextInput>(null);
  const [msg, setMsg] = useState('');
  const [inEditMode, setInEditMode] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [disableSend, setDisableSend] = useState(false);

  const sendMsg = () => {};
  function StopResponseLLM() {}
  function cancelEdit() {
    setInEditMode(false);
    setMsg('');
  }

  return {
    setIsLoadingResponse, // TODO(ME): Delete this later, It was added to fix the linting error
    setDisableSend, // TODO(ME): Delete this later, It was added to fix the linting error
    refMsgInput,
    msg,
    setMsg,
    sendMsg,
    disableSend,
    isLoadingResponse,
    StopResponseLLM,
    inEditMode,
    cancelEdit,
  };
};
