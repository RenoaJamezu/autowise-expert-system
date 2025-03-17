import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

type IssueResolutionButtonsProps = {
  onResolve: (resolved: boolean) => void;
};

const IssueResolutionButtons: React.FC<IssueResolutionButtonsProps> = ({ onResolve }) => {
  return (
    <ScrollView className="max-h-[150px]">
      <TouchableOpacity
        className="bg-green-500 px-4 py-2 rounded-lg mb-2 items-center"
        onPress={() => onResolve(true)}
      >
        <Text className="text-white text-xl">Yes, the issue is resolved</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg items-center"
        onPress={() => onResolve(false)}
      >
        <Text className="text-white text-xl">No, I need further assistance</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default IssueResolutionButtons;