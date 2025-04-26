import { useState } from 'react';
import { View, FlatList, Image, ActivityIndicator, Text } from 'react-native';

import type { ChatProps } from '../utils/types';
import { MsgContainer } from './MsgContainer';
import { InputField } from './InputField';
import { useChat } from '../hooks';

import { styles } from '../styles/chatStyles';

export const ChatLlm = (props: ChatProps) => {
  const {
    refMsgInput,
    refMsgList,
    sendMsg,
    disableSend,
    isLoadingResponse,
    stopResponseLLM,
    inEditMode,
    cancelEdit,
  } = useChat(props);

  const [offset, setOffset] = useState(0);

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

      {/* <Button
        title="Press me to add an element"
        onPress={() => {
          props.setMsgs((prev) => {
            const newMessages = [
              {
                id: -1 * fakeMessageState,
                content: `Fake message 1 - State: ${fakeMessageState}`,
                role: 'User' as Role,
                createdAt: new Date(),
                isEdited: false,
              },
              {
                id: -1 * fakeMessageState - 1,
                content: `Fake message 2 - State: ${fakeMessageState}`,
                role: 'AI' as Role,
                createdAt: new Date(),
                isEdited: false,
              },
            ];
            setFakeMessageState((prevState) => prevState + 2); // Increment state value
            return [...newMessages, ...prev];
          });
        }}
      /> */}

      {/* The Chat List */}
      <FlatList
        ref={refMsgList}
        data={props.msgs.toReversed()} // TODO(ME): create a more effecient msgs function inutils, it will only reverse once and then it will push or insert new elements
        renderItem={({ item, index }) => (
          <MsgContainer key={index} msg={item} />
        )}
        ListHeaderComponent={() => {
          //props.header
          return <Text>Hello</Text>;
        }}
        ListHeaderComponentStyle={props.headerStyle}
        ListFooterComponent={() => {
          //props.footer
          return <ActivityIndicator size={'large'} color={'gray'} />;
        }}
        // onMomentumScrollEnd={(event) => {
        //   // TODO(ME): Check if I have reached the edge
        // }}
        ListFooterComponentStyle={props.footerStyle}
        ListEmptyComponent={props.emptyList}
        // These 3 properties are the logic behind the user loading new messages without any
        // stutter or quick flash of scrolling to the top and back to where he was after load
        inverted
        contentOffset={{ x: 0, y: offset }}
        onScroll={(event) => {
          if (props.refreshing) {
            setOffset(event.nativeEvent.contentOffset.y);
          }
        }}
        // TODO(ME): Change the refresh Control visual and way to trigger
        // refreshControl={
        //   props.refreshing !== undefined ? (
        //     props.refreshComponent !== undefined ? (
        //       props.refreshComponent
        //     ) : (
        //       <RefreshControl
        //         onRefresh={() => {
        //           setOffset(0);
        //           props.onRefresh();
        //         }}
        //         refreshing={props.refreshing}
        //       />
        //     )
        //   ) : undefined
        // }
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
