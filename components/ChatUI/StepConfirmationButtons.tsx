import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

type StepConfirmationButtonsProps = {
  onConfirm: (confirmed: boolean) => void;
};

const StepConfirmationButtons: React.FC<StepConfirmationButtonsProps> = ({ onConfirm }) => {
  return (
    <ScrollView className="max-h-[150px]">
      <TouchableOpacity
        className="bg-green-500 px-4 py-2 rounded-lg mb-2 items-center"
        onPress={() => onConfirm(true)}
      >
        <Text className="text-white text-xl">Yes, I’ve completed this step</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg items-center"
        onPress={() => onConfirm(false)}
      >
        <Text className="text-white text-xl">Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StepConfirmationButtons;