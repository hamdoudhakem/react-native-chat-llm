import { View, FlatList, Image, ActivityIndicator } from 'react-native';

import type { ChatProps } from '../utils/types';
import { OptionsMenuModal } from './optionsMenu';
import { MsgContainer } from './MsgContainer';
import { InputField } from './InputField';
import { useChat } from '../hooks';

import { styles } from '../styles/chatStyles';
import {
  renderElementOrComponent,
  optimizedReverseArray,
} from '../utils/usefullFunctions';

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
    onOptionPress,
    modalVisible,
    selectedMsg,
    closeModal,
    SelectMsg,
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

      {/* The Options menu that appears when Long clicking a Message */}
      <OptionsMenuModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        msgProps={{
          msg: selectedMsg,
          onOptionPress,
        }}
      />

      {/* The Chat List */}
      <FlatList
        ref={refMsgList}
        // These 2 properties are the logic behind the user loading new messages without any
        // stutter or quick flash of scrolling to the top and back to where he was after load
        inverted
        data={optimizedReverseArray(props.msgs)}
        renderItem={({ item, index }) => (
          <MsgContainer key={index} msg={item} onSelected={SelectMsg} />
        )}
        // List Components
        ListHeaderComponent={renderElementOrComponent(props.footer)}
        ListHeaderComponentStyle={props.footerStyle}
        ListFooterComponent={
          !props.remainingMsgs ? (
            renderElementOrComponent(props.header)
          ) : (
            <>
              {renderElementOrComponent(props.msgLoader) ?? (
                <ActivityIndicator
                  animating={props.refreshing}
                  size={'large'}
                  color={'gray'}
                />
              )}
              {renderElementOrComponent(props.header)}
            </>
          )
        }
        ListFooterComponentStyle={props.headerStyle}
        ListEmptyComponent={renderElementOrComponent(props.emptyList)}
        // Refresh Starter
        onMomentumScrollEnd={async (event) => {
          if (props.remainingMsgs) {
            const currentPosY =
              event.nativeEvent.contentOffset.y +
              event.nativeEvent.layoutMeasurement.height;

            const contentSizeY = event.nativeEvent.contentSize.height;
            // console.log(
            //   'position: ' + currentPosY + ' || content Y Size: ' + contentSizeY
            // );
            if (Math.abs(currentPosY - contentSizeY) < 35) {
              if (props.refreshing === false) {
                console.log('Start refreshing');
                props.setRefreshing(true);
                await props.onRefresh();
                props.setRefreshing(false);
              }
            }
          }
        }}
        ItemSeparatorComponent={() =>
          renderElementOrComponent(props.itemSeparatorComponent)
        }
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
