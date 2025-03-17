import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Message } from '../../types/types';

type ChatHistoryProps = {
  messages: Message[];
};

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <ScrollView 
      ref={scrollViewRef} 
      className="flex-1 px-4 py-1"
      onContentSizeChange={() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }}
    >
      {messages.map((message, index) => (
        <View
          key={index}
          className={`p-3 rounded-lg mb-2 max-w-[80%] ${
            message.sender === 'user' ? 'bg-blue-500 self-end rounded-br-none' : 'bg-gray-300 self-start rounded-bl-none'
          } whitespace-pre-wrap`}
        >
          <Text className={`${
            message.sender === 'user' ? 'text-white' : 'text-black'}`}
            >{message.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ChatHistory;