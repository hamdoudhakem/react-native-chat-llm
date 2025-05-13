import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import type { Message } from '../utils/types';
import { styles } from '../styles/chatStyles';

type OptionsMenuProps = {
  msg: Message;
  onOptionPress: (option: string, msg: Message) => void;
  lastMsgId?: number;
};

const optionsMenu = [
  { name: 'Copy', image: <Ionicons name="copy-outline" size={28} /> },
  { name: 'Edit', image: <MaterialIcons name="edit" size={28} /> },
  { name: 'Delete', image: <MaterialIcons name="delete" size={28} /> },
];

const { height } = Dimensions.get('window');

export const OptionsMenuModal = ({
  modalVisible,
  msgProps: { msg, onOptionPress },
  closeModal,
}: {
  modalVisible: boolean;
  msgProps: OptionsMenuProps;
  closeModal: () => void;
}) => {
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
          {optionsMenu.map((item, index) => {
            if (msg.role === 'AI' && item.name === 'Delete') {
              return null;
            }

            return (
              <TouchableOpacity
                key={index}
                style={styles.optionsButton}
                disabled={closing}
                onPress={() => {
                  onOptionPress(item.name, msg);
                  close();
                }}
              >
                {item.image}
                <Text style={styles.OptionsButtonText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    </Modal>
  );
};
