/*eslint-disable @typescript-eslint/no-unused-vars*/
import { View, Text, Pressable, Animated } from 'react-native';
import type { MsgContainerProps } from '../utils/types';

import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../styles/chatStyles';
import { ItalicizeText } from '../utils/italicize';

// import { OptionsMenuModal } from './options-menu';

const MsgContainer = ({
  msg, //onOptionPress
}: MsgContainerProps) => {
  // const [modalVisible, setModalVisible] = useState(false);

  // console.log({msgID: msg.id, text: msg.content.substring(0, 10)})
  // console.log('MSG', msg)

  // const selectedAnim = useRef(new Animated.Value(1)).current;

  // const Animate = (val: number, animTime: number = 200) => {
  //   Animated.timing(selectedAnim, {
  //     toValue: val,
  //     duration: animTime,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  //   selectedAnim.setValue(1);
  // };

  return (
    <View style={{ marginVertical: 3 }}>
      {/* The Options menu that appears when Long clicking a Message */}
      {/* <OptionsMenuModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        msgProps={{
          msg,
          onOptionPress,
        }}
      /> */}

      <View
        style={
          msg.role === 'User'
            ? { flexDirection: 'row-reverse' }
            : { flexDirection: 'row' }
        }
      >
        {/* The User Icon*/}
        {
          <View
            style={{
              flexDirection: 'column-reverse',
              height: '100%',
            }}
          >
            <Entypo
              name="user"
              size={24}
              color="black"
              style={styles.msgImage}
            />
          </View>
        }

        {/* The Message box*/}
        <Pressable
        // onPressIn={() => setTimeout(() => Animate(0.92, 100), 60)}
        // onLongPress={() => {
        //   Keyboard.dismiss();
        //   setModalVisible(true);
        //   Animate(1.05, 100);
        // }}
        // onPressOut={() => {
        //   if (!modalVisible) {
        //     selectedAnim.setValue(1);
        //   }
        // }}
        >
          <Animated.View
            style={[
              styles.msgBox,
              msg.role === 'User'
                ? { borderBottomEndRadius: 2 }
                : { borderBottomStartRadius: 2 },
              {
                // paddingHorizontal: Animated.multiply(10, selectedAnim),
                // paddingVertical: Animated.multiply(5, selectedAnim),
                paddingHorizontal: 10,
                paddingVertical: 5,
              },
              // modalVisible && {
              //   backgroundColor: '#91c0dc',
              // },
            ]}
          >
            <Animated.Text
              style={{
                fontFamily: 'regular',
                // maxWidth: Animated.multiply(200, selectedAnim),
                // fontSize: Animated.multiply(14, selectedAnim),
              }}
            >
              <ItalicizeText text={msg.content} />
            </Animated.Text>
          </Animated.View>
        </Pressable>

        {/* The (edited) Flag */}
        {msg.isEdited ? (
          <View style={{ flexDirection: 'column-reverse', height: '100%' }}>
            <Text style={{ fontSize: 9, color: 'white' }}>(Edited)</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const MsgContainerOptimized = React.memo(
  (props: MsgContainerProps) => (
    // console.log('Rendred Item with ID',props.msg?.id)

    <MsgContainer {...props} />
  ),
  (prev, next) => prev.msg === next.msg
);

export { MsgContainerOptimized as MsgContainer };
