import React from 'react';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import { Option } from '../../types/types';

type QuickReplyButtonsProps = {
  options: Option[];
  onSendMessage: (option: Option) => void;
};

const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({ options, onSendMessage }) => (
  <ScrollView className="max-h-[150px]">
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onSendMessage(option)}
        className="bg-green-500 px-4 py-2 rounded-lg mb-2 items-center whitespace-nowrap"
      >
        <Text className="text-white text-xl">{option.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default QuickReplyButtons;