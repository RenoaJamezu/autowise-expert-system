import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

type ProceedButtonsProps = {
  onProceed: () => void;
  onGoBack: () => void;
};

const ProceedButtons: React.FC<ProceedButtonsProps> = ({ onProceed, onGoBack }) => {
  return (
    <ScrollView className="max-h-[150px]">
      <TouchableOpacity
        className="bg-green-500 px-4 py-2 rounded-lg mb-2 items-center"
        onPress={onProceed}
      >
        <Text className="text-white text-xl">Proceed</Text>
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

export default ProceedButtons;