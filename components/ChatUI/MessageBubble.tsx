import React from 'react';
import { View, Text } from 'react-native';

type MessageBubbleProps = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender, timestamp }) => {
  const isUser = sender === 'user';

  return (
    <View className={`my-2 max-w-[80%] ${isUser ? 'self-end' : 'self-start'}`}>
      <View
        className={`rounded-lg p-3 ${
          isUser ? 'bg-blue-500 rounded-br-none' : 'bg-gray-300 rounded-bl-none'
        }`}
      >
        <Text className={`text-${isUser ? 'white' : 'black'}`}>{text}</Text>
        <Text
          className={`text-xs mt-1 ${
            isUser ? 'text-white/70' : 'text-black/50'
          }`}
        >
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;