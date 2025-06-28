import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import type { OptionsMenuProps } from '../utils/types';
import { renderImage } from '../utils/usefullFunctions';
import { optionsMenu } from '../utils/constant';
import { styles } from '../styles/chatStyles';

const { height } = Dimensions.get('window');

export const OptionsMenuModal = ({
  modalVisible,
  msgProps: { msg, onOptionPress },
  closeModal,
}: OptionsMenuProps) => {
  const [closing, setClosing] = useState(false);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const slidingAnim = useRef(new Animated.Value(height)).current;
  const FadeAnim = useRef(new Animated.Value(0)).current;

  const AnimateSliding = (val: number, animTime: number = 200) => {
    return Animated.timing(slidingAnim, {
      toValue: val,
      duration: animTime,
      easing: Easing.inOut(Easing.exp),
      useNativeDriver: false,
    });
  };

  const AnimateFade = (val: number, animTime: number = 200) => {
    return Animated.timing(FadeAnim, {
      toValue: val * 1000,
      duration: animTime,
      easing: Easing.inOut(Easing.exp),
      useNativeDriver: true,
    });
  };

  const close = () => {
    setClosing(true);

    Animated.parallel([
      Animated.sequence([Animated.delay(1), AnimateFade(0, 300)]),
      AnimateSliding(height, 400),
    ]).start(() => {
      closeModal();
      slidingAnim.setValue(height);
      FadeAnim.setValue(0);
    });
  };

  // Activates when the component loads
  useEffect(() => {
    if (modalVisible) {
      setClosing(false);
      Animated.sequence([Animated.delay(1), AnimateFade(0.3, 400)]).start();
      AnimateSliding(0, 400).start();
    }
  }, [modalVisible]); //eslint-disable-line

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => close()}
    >
      <View style={{ flex: 1 }}>
        {/* The Black Filter that makes everything under look darker*/}
        <AnimatedPressable
          onPress={() => close()}
          style={{
            flex: 1,
            backgroundColor: 'black',
            opacity: Animated.divide(FadeAnim, 1000),
          }}
        />

        {/* the Option Menu*/}
        <Animated.View
          style={[
            styles.optionsMenu,
            { transform: [{ translateY: slidingAnim }] },
          ]}
        >
          {/* The Option Menu Buttons*/}
          {/*TODO(ME): Maybe add an option to let the user choose how to show it */}
          {Object.entries(optionsMenu).map((obj, index) => {
            if (msg.role === 'AI' && obj[0] === 'Delete') {
              return null;
            }

            const item = obj[1];
            return (
              <TouchableHighlight
                key={index}
                style={styles.optionsButton}
                disabled={closing}
                underlayColor="rgba(1,1,1,0.08)"
                onPress={() => {
                  onOptionPress(item, msg);
                  close();
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {renderImage(item.image)}
                  <Text style={styles.OptionsButtonText}>{item.name}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </Animated.View>
      </View>
    </Modal>
  );
};
