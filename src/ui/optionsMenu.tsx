import { Modal, Pressable, TouchableOpacity, Text, View } from 'react-native';
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

export const OptionsMenuModal = ({
  modalVisible,
  msgProps: { msg, onOptionPress },
  closeModal,
}: {
  modalVisible: boolean;
  msgProps: OptionsMenuProps;
  closeModal: () => void;
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => closeModal()}
  >
    <View style={{ flex: 1 }}>
      {/* The Black Filter that makes everything under look darker*/}
      <Pressable
        onPress={() => closeModal()}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      />

      {/* the Option Menu*/}
      <View style={styles.optionsMenu}>
        {/* The Option Menu Buttons*/}
        {optionsMenu.map((item, index) => {
          if (item.name === 'Delete' && msg.role === 'AI') {
            return null;
          }

          return (
            <TouchableOpacity
              key={index}
              style={styles.optionsButton}
              onPress={() => {
                onOptionPress(item.name, msg);
                closeModal();
              }}
            >
              {item.image}
              <Text style={styles.OptionsButtonText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}

        {/* The Separation Line*/}
        <View style={styles.optionsMenuSeparationLine} />

        {/* The Cancel Button*/}
        <TouchableOpacity
          style={[styles.optionsButton, { marginBottom: 11 }]}
          onPress={() => closeModal()}
        >
          <MaterialIcons name="cancel" color="black" size={28} />
          <Text style={styles.OptionsButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
