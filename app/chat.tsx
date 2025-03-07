import React from 'react';
import { View } from 'react-native';
import ChatScreen from '../components/ChatUI/ChatScreen';

export default function Chat() {
  return (
    <View className="flex-1">
      <ChatScreen />
    </View>
  );
}