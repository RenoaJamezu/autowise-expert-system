import React from 'react';
import { TouchableOpacity, Text, ScrollView } from 'react-native';

type QuickReplyButtonsProps = {
  options: { label: string; next: string }[];
  onPress: (label: string) => void;
};

const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({ options, onPress }) => (
  <ScrollView className="max-h-[150px]">
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onPress(option.label)}
        className="bg-green-500 px-4 py-2 rounded-lg mb-2 items-center"
      >
        <Text className="text-white">{option.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default QuickReplyButtons;