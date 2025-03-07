import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type InputBoxProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const InputBox: React.FC<InputBoxProps> = ({ value, onChangeText }) => (
  <View className="flex-row items-center mt-2">
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Type a message..."
      className="flex-1 p-3 rounded-full bg-white mr-2"
      editable={false}
    />
    <TouchableOpacity
      className="bg-blue-500 p-3 rounded-full justify-center items-center"
      disabled
    >
      <MaterialIcons name="send" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

export default InputBox;