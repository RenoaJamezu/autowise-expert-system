import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ChatScreen from '../components/ChatUI/ChatScreen';
import { fetchCarRepairDatasets, fetchConversationFlow, initDatabase } from '../tools/database';
import { ConversationFlow, CarRepairDataset, Option } from '../types/types';
import * as Network from 'expo-network';
import { syncData } from '../tools/database/sync';

export default function Chat() {
  const [conversationFlow, setConversationFlow] = useState<ConversationFlow>({});
  const [carRepairData, setCarRepairData] = useState<CarRepairDataset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeData = async () => {
      try {

        await initDatabase();

        // Check if the device is connected to the internet
        const networkState = await Network.getNetworkStateAsync();
        if (networkState.isConnected) {
          // Sync data with Supabase if connected
          await syncData();
        }

        // Fetch data from SQLite
        const flow = await fetchConversationFlow();
        const datasets = await fetchCarRepairDatasets();

        // Transform the conversation flow into the correct format
        const transformedFlow = flow.reduce((acc: ConversationFlow, row: any) => {
          if (!row || !row.step_key || !row.message || !row.options) {
            console.error('Invalid row:', row);
            return acc;
          }

          try {
            const optionsString = row.options.slice(1, -1); // Remove outer quotes
            const cleanedOptionsString = optionsString.replace(/\\"/g, '"'); // Replace escaped quotes
            const parsedOptions = JSON.parse(cleanedOptionsString) as Option[];

            acc[row.step_key] = {
              message: row.message,
              options: parsedOptions,
            };
          } catch (error) {
            console.error('Error parsing options:', error);
          }

          return acc;
        }, {} as ConversationFlow);

        // Ensure the start step exists
        if (!transformedFlow.start) {
          console.error('Start step is missing in the conversation flow.');
          transformedFlow.start = {
            message: 'Welcome! How can I assist you today?',
            options: [],
          };
        }

        setConversationFlow(transformedFlow);
        setCarRepairData(datasets as CarRepairDataset[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();

    // Set up a listener for network connectivity changes
    const subscription = Network.addNetworkStateListener(async (networkState) => {
      if (networkState.isConnected) {
        // If the device is connected to the internet, sync data
        await syncData().catch(error => console.error('Error syncing data:', error));
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ChatScreen conversationFlow={conversationFlow} carRepairData={carRepairData} />
    </View>
  );
}