import React from 'react';
import { View, FlatList, ImageBackground, RefreshControl } from 'react-native';

import type { ChatProps } from '../utils/types';
import { MsgContainer } from './MsgContainer';
import { InputField } from './InputField';
import { useChat } from '../hooks';

export const ChatLlm = (props: ChatProps) => {
  const {
    refMsgInput,
    sendMsg,
    disableSend,
    isLoadingResponse,
    StopResponseLLM,
    inEditMode,
    cancelEdit,
  } = useChat();

  return (
    <Container
      chatProps={props}
      style={{ flex: 1, backgroundColor: props.backgroundColor }}
    >
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
        StopResponseLLM={StopResponseLLM}
        inEditMode={inEditMode}
        cancelEdit={cancelEdit}
      />
    </Container>
  );
};

// Add a static method to ChatLlm
ChatLlm.send = (message: string) => {
  console.log(`Sending message: ${message}`);
  // Add your logic here to handle sending a message
};

const Container = ({
  chatProps,
  children,
  ...rest
}: {
  chatProps: ChatProps;
  children: React.ReactElement | React.ReactElement[];
  [key: string]: any;
}) => {
  if (chatProps.backgroundImage) {
    return (
      <ImageBackground
        source={chatProps.backgroundImage}
        resizeMode={chatProps.backgroundImageResizeMode || 'cover'}
        {...rest}
      >
        {children}
      </ImageBackground>
    );
  } else {
    return <View {...rest}>{children}</View>;
  }
};
