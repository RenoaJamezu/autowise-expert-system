import React, { useState, Suspense, useRef, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, ActivityIndicator, TextInput, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ConversationFlow } from '../../constants/ConversationFlow';

// Lazy load components
const MessageBubble = React.lazy(() => import('./MessageBubble'));
const QuickReplyButtons = React.lazy(() => import('./QuickReplyButtons'));
const StartNewConversationButton = React.lazy(() => import('./StartNewConversationButton'));
const InputBox = React.lazy(() => import('./InputBox'));

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user'; timestamp: Date }[]>([
    { text: ConversationFlow.start.message, sender: 'bot', timestamp: new Date() },
  ]);
  const [currentStep, setCurrentStep] = useState<keyof typeof ConversationFlow>('start');
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = (option?: string) => {
    const currentMessage = ConversationFlow[currentStep];
    if (!currentMessage) return;

    if (option) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: option, sender: 'user', timestamp: new Date() },
      ]);
    }

    if (option && currentMessage.options) {
      const selectedOption = currentMessage.options.find((opt) => opt.label === option);
      if (selectedOption) {
        setCurrentStep(selectedOption.next as keyof typeof ConversationFlow);
        const nextMessage = ConversationFlow[selectedOption.next as keyof typeof ConversationFlow]?.message;
        if (nextMessage) {
          setTimeout(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: nextMessage, sender: 'bot', timestamp: new Date() },
            ]);
          }, 10);
        }
      }
    }
  };

  const handleStartNewConversation = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: ConversationFlow.start.message, sender: 'bot', timestamp: new Date() },
    ]);
    setCurrentStep('start');
  };

  const currentOptions = ConversationFlow[currentStep].options || [];
  const hasButtons = currentOptions.length > 0;
  const hasConversationEnded = !hasButtons;

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <View className="flex-1 bg-gray-100 p-4">
        {/* Chat History */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => (
            <Suspense key={index} fallback={<ActivityIndicator />}>
              <MessageBubble text={message.text} sender={message.sender} timestamp={message.timestamp} />
            </Suspense>
          ))}
        </ScrollView>

        {/* Bottom Section */}
        <View className="mt-4">
          {hasButtons && (
            <Suspense fallback={<ActivityIndicator />}>
              <QuickReplyButtons options={currentOptions} onPress={handleSendMessage} />
            </Suspense>
          )}

          {hasConversationEnded && (
            <Suspense fallback={<ActivityIndicator />}>
              <StartNewConversationButton onPress={handleStartNewConversation} />
            </Suspense>
          )}

          {/* Input Box */}
          <View className="flex-row items-center bg-white p-2 rounded-lg shadow-sm">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              className="flex-1 p-2"
              editable={false}
            />
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-lg"
              disabled
            >
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;