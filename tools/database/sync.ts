import { supabase } from '../../services/supabase';
import * as Network from 'expo-network';
import { openDatabase } from './init';
import { insertCarRepairDatasets, insertConversationFlow } from './operations';

export const syncData = async () => {
  try {
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) {
      console.log('No internet connection. Skipping sync.');
      return;
    }

    const db = await openDatabase();

    // Clear existing data to avoid duplicates
    await db.execAsync('DELETE FROM car_repair_datasets;');
    await db.execAsync('DELETE FROM conversation_flow;');

    // Fetch car repair datasets from Supabase
    const { data: carRepairData, error: carRepairError } = await supabase
      .from('car_repair_datasets')
      .select('*');

    if (carRepairError) throw carRepairError;
    console.log('Car repair data fetched from Supabase:', carRepairData);

    // Fetch conversation flow from Supabase
    const { data: conversationFlow, error: conversationError } = await supabase
      .from('conversation_flow')
      .select('*');

    if (conversationError) throw conversationError;
    console.log('Conversation flow fetched from Supabase:', conversationFlow);

    // Insert fresh data into SQLite
    await insertCarRepairDatasets(carRepairData);
    await insertConversationFlow(conversationFlow);

    console.log('Data synced successfully');
  } catch (error) {
    console.error('Error syncing data:', error);
  }
};

export const setupRealtimeUpdates = (onChange: () => void) => {
  // Listen for changes in the car_repair_datasets table
  const carRepairSubscription = supabase
    .channel('car-repair-datasets')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'car_repair_datasets' },
      () => onChange()
    )
    .subscribe();

  // Listen for changes in the conversation_flow table
  const conversationFlowSubscription = supabase
    .channel('conversation-flow')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'conversation_flow' },
      () => onChange()
    )
    .subscribe();

  // Return a cleanup function to unsubscribe
  return () => {
    carRepairSubscription.unsubscribe();
    conversationFlowSubscription.unsubscribe();
  };
};

// handle the synchronization of data between Supabase and SQLite.