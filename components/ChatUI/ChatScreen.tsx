import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { fetchCarRepairDatasets, fetchConversationFlow } from '../../tools/database/operations';
import { Message, Option, ConversationFlow, CarRepairDataset } from '../../types/types';
import ChatHistory from '../ChatUI/ChatHistory';
import QuickReplyButtons from '../ChatUI/QuickReplyButtons';
import ProceedButtons from '../ChatUI/ProceedButtons';
import ToolsConfirmationButtons from '../ChatUI/ToolsConfirmationButtons';
import StepConfirmationButtons from '../ChatUI/StepConfirmationButtons';
import IssueResolutionButtons from '../ChatUI/IssueResolutionButtons';
import StartNewConversationButton from '../ChatUI/StartNewConversationButton';
import { MaterialIcons } from '@expo/vector-icons';

interface ChatScreenProps {
  conversationFlow: ConversationFlow;
  carRepairData: CarRepairDataset[];
}

const ChatScreen = ({ conversationFlow, carRepairData }: ChatScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentRepairStepIndex, setCurrentRepairStepIndex] = useState<number>(0);
  const [currentRepairDataset, setCurrentRepairDataset] = useState<CarRepairDataset | null>(null);
  const [conversationPhase, setConversationPhase] = useState<'initial' | 'tools' | 'steps' | 'resolution'>('initial');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (conversationFlow.start) {
          setMessages([{ text: conversationFlow.start.message, sender: 'bot' }]);
        } else {
          console.error('Start step is missing in the conversation flow.');
          setMessages([{ text: 'Welcome! How can I assist you today?', sender: 'bot' }]);
        }
      } catch (error) {
        console.error('Error initializing conversation:', error);
        setMessages([{ text: 'Welcome! How can I assist you today?', sender: 'bot' }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [conversationFlow]);

  const handleSendMessage = (option: Option) => {
    const currentMessage = conversationFlow[currentStep];
    if (!currentMessage) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: option.label, sender: 'user' },
    ]);

    setCurrentStep(option.next);

    const nextStep = conversationFlow[option.next];

    if (nextStep) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: nextStep.message, sender: 'bot' },
        ]);
      }, 10);
    } else {
      const matchingDataset = carRepairData.find((dataset) =>
        dataset.problem.toLowerCase().includes(option.next.toLowerCase())
      );

      if (matchingDataset) {
        setCurrentRepairDataset(matchingDataset);
        setConversationPhase('initial');

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Your goal is to fix: ${matchingDataset.problem}. Let’s proceed step by step.`, sender: 'bot' },
          ]);
        }, 10);
      } else {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Sorry, I could not find any repair details for this issue. You can contact a Specialist for further assistance', sender: 'bot' },
          ]);
        }, 10);
      }
    }
  };

  const handleProceedToTools = () => {
    if (currentRepairDataset) {
      setConversationPhase('tools');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Proceed', sender: 'user' },
        { text: `Before starting, make sure you have the following tools: ${currentRepairDataset.tools_required}`, sender: 'bot' },
      ]);
    }
  };

  const handleGoBackToStart = () => {
    setCurrentStep('start');
    setCurrentRepairDataset(null);
    setCurrentRepairStepIndex(0);
    setConversationPhase('initial');
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Go Back', sender: 'user' },
      { text: conversationFlow.start.message, sender: 'bot' },
    ]);
  };

  const handleProceedToSteps = () => {
    if (currentRepairDataset) {
      setConversationPhase('steps');
      setCurrentRepairStepIndex(0);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'I have the tools, let\'s proceed', sender: 'user' },
        { text: `Step 1: ${currentRepairDataset.detailed_steps[0]}`, sender: 'bot' },
      ]);
    }
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (!currentRepairDataset) return;

    if (confirmed) {
      if (currentRepairStepIndex < currentRepairDataset.detailed_steps.length - 1) {
        setCurrentRepairStepIndex(currentRepairStepIndex + 1);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Yes, I’ve completed this step', sender: 'user' },
          { text: `Step ${currentRepairStepIndex + 2}: ${currentRepairDataset.detailed_steps[currentRepairStepIndex + 1]}`, sender: 'bot' },
        ]);
      } else {
        setConversationPhase('resolution');
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Yes, I’ve completed this step', sender: 'user' },
          { text: `Have you successfully fixed the issue: ${currentRepairDataset.problem}?`, sender: 'bot' },
        ]);
      }
    } else {
      if (currentRepairStepIndex > 0) {
        setCurrentRepairStepIndex(currentRepairStepIndex - 1);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Go Back', sender: 'user' },
          { text: `Step ${currentRepairStepIndex}: ${currentRepairDataset.detailed_steps[currentRepairStepIndex - 1]}`, sender: 'bot' },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Go Back', sender: 'user' },
          { text: `Step 1: ${currentRepairDataset.detailed_steps[0]}`, sender: 'bot' },
        ]);
      }
    }
  };

  const handleIssueResolution = (resolved: boolean) => {
    if (resolved) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Yes, the issue is resolved', sender: 'user' },
        { text: 'Congratulations! You have successfully resolved the issue. If you have any other questions or need further assistance, feel free to ask.', sender: 'bot' },
      ]);
      setCurrentRepairDataset(null);
      setCurrentRepairStepIndex(0);
      setConversationPhase('initial');
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'No, I need further assistance', sender: 'user' },
        { text: 'Please let me know how I can assist you further.', sender: 'bot' },
      ]);
    }
  };

  const handleStartNewConversation = () => {
    if (conversationFlow.start) {
      setMessages([{ text: conversationFlow.start.message, sender: 'bot' }]);
      setCurrentStep('start');
      setCurrentRepairDataset(null);
      setCurrentRepairStepIndex(0);
      setConversationPhase('initial');
    } else {
      console.error('Start step is missing in the conversation flow.');
      setMessages([{ text: 'Welcome! How can I assist you today?', sender: 'bot' }]);
    }
  };

  const currentOptions = Array.isArray(conversationFlow[currentStep]?.options)
    ? conversationFlow[currentStep]?.options
    : [];
  const hasButtons = currentOptions.length > 0;
  const hasConversationEnded = !hasButtons && conversationPhase === 'initial' && !currentRepairDataset;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-lg text-blue-500">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <ChatHistory messages={messages} />

      <View className="mt-4">
        {hasButtons && (
          <QuickReplyButtons options={currentOptions} onSendMessage={handleSendMessage} />
        )}

        {!hasButtons && conversationPhase === 'initial' && currentRepairDataset && (
          <ProceedButtons onProceed={handleProceedToTools} onGoBack={handleGoBackToStart} />
        )}

        {!hasButtons && conversationPhase === 'tools' && currentRepairDataset && (
          <ToolsConfirmationButtons onProceed={handleProceedToSteps} onGoBack={handleGoBackToStart} />
        )}

        {!hasButtons && conversationPhase === 'steps' && currentRepairDataset && (
          <StepConfirmationButtons onConfirm={handleConfirmation} />
        )}

        {!hasButtons && conversationPhase === 'resolution' && currentRepairDataset && (
          <IssueResolutionButtons onResolve={handleIssueResolution} />
        )}

        {hasConversationEnded && (
          <StartNewConversationButton onStartNewConversation={handleStartNewConversation} />
        )}
      </View>
    </View>
  );
};

export default ChatScreen;