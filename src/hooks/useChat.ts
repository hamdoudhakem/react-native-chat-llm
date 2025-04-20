import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';

import type { ChatProps, Message, Role } from '../utils/types';

const createMsg = (
  id: number,
  role: Role,
  msg: string,
  createdAt?: Date
): Message => {
  return {
    id,
    role,
    content: msg,
    createdAt: createdAt ?? new Date(),
    isEdited: false,
  };
};

export const useChat = (props: ChatProps) => {
  const refMsgInput = useRef<TextInput>(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [disableSend, setDisableSend] = useState(false);

  let { msg, setMsg, msgs, setMsgs, cancelResponse } = props;

  async function sendMsg() {
    const newMsgs = [...msgs];

    // User Msg
    const userMsg = msg.trim();
    newMsgs.push(
      createMsg(msgs.length <= 0 ? 0 : msgs.length, 'User', userMsg)
    );

    setMsgs(newMsgs);
    setMsg('');

    // AI Response
    let AIMsg = createMsg(newMsgs.length, 'AI', '');
    newMsgs.push(AIMsg);

    setIsLoadingResponse(true);
    await props.MsgGenerator((token: string) => {
      //Do something after each token of the msg is generated
      const text = AIMsg.content + token;
      AIMsg.content = text;
      editMsg(newMsgs, AIMsg, text, false);
    });
    setIsLoadingResponse(false);
  }

  function editMsg(
    msgs: Message[],
    msgToUpdate: Message,
    newMsgText: string,
    isEdited: boolean = true
  ) {
    // I create a new message so that the React.memo inside MsgContainer, knows about the change
    const newMsg = createMsg(
      msgToUpdate.id,
      msgToUpdate.role,
      newMsgText,
      msgToUpdate.createdAt
    );
    newMsg.isEdited = isEdited;
    msgs[msgToUpdate.id] = newMsg;

    // This instead of "setMsgs(msgs)" to change it's reference => so that the whole Chat updates
    setMsgs([...msgs]);
  }

  function stopResponseLLM() {
    cancelResponse();
    setIsLoadingResponse(false);
  }

  function cancelEdit() {
    setInEditMode(false);
    setMsg('');
  }

  return {
    setIsLoadingResponse, // TODO(ME): Delete this later, It was added to fix the linting error
    setDisableSend, // TODO(ME): Delete this later, It was added to fix the linting error
    refMsgInput,
    sendMsg,
    disableSend,
    isLoadingResponse,
    stopResponseLLM,
    inEditMode,
    cancelEdit,
  };
};
