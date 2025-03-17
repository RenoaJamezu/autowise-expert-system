import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

type ToolsConfirmationButtonsProps = {
  onProceed: () => void;
  onGoBack: () => void;
};

const ToolsConfirmationButtons: React.FC<ToolsConfirmationButtonsProps> = ({ onProceed, onGoBack }) => {
  return (
    <ScrollView className="max-h-[150px]">
      <TouchableOpacity
        className="bg-green-500 px-4 py-2 rounded-lg mb-2 items-center"
        onPress={onProceed}
      >
        <Text className="text-white text-xl">I have the tools, let's proceed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg items-center"
        onPress={onGoBack}
      >
        <Text className="text-white text-xl">Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ToolsConfirmationButtons;