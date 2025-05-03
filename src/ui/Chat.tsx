import { useState } from 'react';
import { View, FlatList, Image, ActivityIndicator } from 'react-native';

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

      {/* The Chat List */}
      <FlatList
        ref={refMsgList}
        // These 2 properties are the logic behind the user loading new messages without any
        // stutter or quick flash of scrolling to the top and back to where he was after load
        inverted
        data={props.msgs.toReversed()} // TODO(ME): create a more effecient msgs function inutils, it will only reverse once and then it will push or insert new elements
        renderItem={({ item, index }) => (
          <MsgContainer key={index} msg={item} />
        )}
        ListHeaderComponent={props.header}
        ListHeaderComponentStyle={props.headerStyle}
        ListFooterComponent={() => {
          if (!props.remainingMsgs) {
            return props.footer;
          }
          //props.footer
          return (
            <ActivityIndicator
              animating={props.refreshing}
              size={'large'}
              color={'gray'}
            />
          );
        }}
        ListFooterComponentStyle={props.footerStyle}
        ListEmptyComponent={props.emptyList}
        // Discovered that this logic is flawed and is working because of the invert logic I did
        // previously. if I scroll slowly it will stutter, if rapidly RN will batch the setOffset
        // calls into one call (so I will rely on the inverted logic agin because the offset state
        // will be changed too late after reload) and I also can't preserve the velocity
        contentOffset={{ x: 0, y: offset }}
        scrollEventThrottle={50}
        onScroll={(event) => {
          if (props.refreshing) {
            setOffset(event.nativeEvent.contentOffset.y);
          }
        }}
        onMomentumScrollEnd={async (event) => {
          if (props.remainingMsgs) {
            const currentPosY =
              event.nativeEvent.contentOffset.y +
              event.nativeEvent.layoutMeasurement.height;

            const contentSizeY = event.nativeEvent.contentSize.height;
            console.log(
              'position: ' + currentPosY + ' || content Y Size: ' + contentSizeY
            );
            if (Math.abs(currentPosY - contentSizeY) < 35) {
              if (props.refreshing == false) {
                console.log('Start refreshing');
                setOffset(event.nativeEvent.contentOffset.y);
                props.setRefreshing(true);
                await props.onRefresh();
                props.setRefreshing(false);
              }
            }
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
