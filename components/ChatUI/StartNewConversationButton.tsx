import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type StartNewConversationButtonProps = {
  onStartNewConversation: () => void;
};

const StartNewConversationButton: React.FC<StartNewConversationButtonProps> = ({ onStartNewConversation }) => {
  return (
    <TouchableOpacity
      onPress={onStartNewConversation}
      className="flex flex-row justify-center bg-purple-500 px-4 py-2 rounded-lg mb-2 items-center"
    >
      <MaterialIcons name="refresh" size={24} color="white" />
      <Text className="text-white text-xl ml-2">Start New Conversation</Text>
    </TouchableOpacity>
  );
};

export default StartNewConversationButton;