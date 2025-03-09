import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type StartNewConversationButtonProps = {
  onPress: () => void;
};

const StartNewConversationButton: React.FC<StartNewConversationButtonProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row justify-center bg-purple-500 px-4 py-2 rounded-lg mb-2 items-center"
  >
    <MaterialIcons name="refresh" size={16} color="white" /> 
    <Text className="text-white text-xl ml-2">
    Start New Conversation
    </Text>
  </TouchableOpacity>
);

export default StartNewConversationButton;