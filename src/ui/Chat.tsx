import { View, FlatList, RefreshControl, Image } from 'react-native';

import type { ChatProps } from '../utils/types';
import { MsgContainer } from './MsgContainer';
import { InputField } from './InputField';
import { useChat } from '../hooks';

import { styles } from '../styles/chatStyles';

export const ChatLlm = (props: ChatProps) => {
  const {
    refMsgInput,
    sendMsg,
    disableSend,
    isLoadingResponse,
    stopResponseLLM,
    inEditMode,
    cancelEdit,
  } = useChat(props);

  return (
    <View style={{ flex: 1, backgroundColor: props.backgroundColor }}>
      {/* Background Image  */}
      {props.backgroundImage && (
        <Image
          source={props.backgroundImage}
          resizeMode={props.backgroundImageResizeMode || 'cover'}
          style={styles.backgroundImage}
        />
      )}

      {/* The Chat List */}
      <FlatList
        data={props.msgs}
        renderItem={({ item, index }) => (
          <MsgContainer key={index} msg={item} />
        )}
        ListHeaderComponent={props.header}
        ListHeaderComponentStyle={props.headerStyle}
        ListFooterComponent={props.footer}
        ListFooterComponentStyle={props.footerStyle}
        ListEmptyComponent={props.emptyList}
        refreshControl={
          props.refreshing === undefined ? undefined : (
            <RefreshControl
              onRefresh={props.onRefresh}
              refreshing={props.refreshing}
            />
          )
        }
        ItemSeparatorComponent={() => props.itemSeparatorComponent}
        onViewableItemsChanged={props.onViewableItemsChanged}
        viewabilityConfig={props.viewabilityConfig}
      />

      {/* The Text Field and Send Button */}
      <InputField
        refMsgInput={refMsgInput}
        msg={props.msg}
        setMsg={props.setMsg}
        sendMsg={sendMsg}
        disableSend={disableSend}
        isLoadingResponse={isLoadingResponse}
        StopResponseLLM={stopResponseLLM}
        inEditMode={inEditMode}
        cancelEdit={cancelEdit}
      />
    </View>
  );
};

// Add a static method to ChatLlm
ChatLlm.send = (message: string) => {
  console.log(`Sending message: ${message}`);
  // Add your logic here to handle sending a message
};
