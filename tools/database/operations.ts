import { openDatabase } from './init';
import { CarRepairDataset } from '../../types/types';

export const insertCarRepairDatasets = async (datasets: any[]) => {
  const db = await openDatabase();
  for (const dataset of datasets) {
    const existingRecord = await db.getFirstAsync(
      'SELECT * FROM car_repair_datasets WHERE id = ?;',
      [dataset.id]
    );

    if (!existingRecord) {
      await db.runAsync(
        `INSERT INTO car_repair_datasets (id, symptoms, problem, solution, detailed_steps, tools_required)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [
          dataset.id,
          dataset.symptoms,
          dataset.problem,
          dataset.solution,
          JSON.stringify(dataset.detailed_steps), // Ensure this is a JSON string
          dataset.tools_required,
        ]
      );
    }
  }
  console.log('Car repair datasets inserted successfully');
};

export const insertConversationFlow = async (flow: any[]) => {
  const db = await openDatabase();
  for (const item of flow) {
    const existingRecord = await db.getFirstAsync(
      'SELECT * FROM conversation_flow WHERE id = ?;',
      [item.id]
    );

    if (!existingRecord) {
      await db.runAsync(
        `INSERT INTO conversation_flow (id, step_key, message, options)
         VALUES (?, ?, ?, ?);`,
        [item.id, item.step_key, item.message, JSON.stringify(item.options)]
      );
    }
  }
  console.log('Conversation flow inserted successfully');
};

export const fetchConversationFlow = async () => {
  try {
    const db = await openDatabase();
    const result = await db.getAllAsync('SELECT * FROM conversation_flow;');
    console.log('Conversation flow fetched from SQLite:', result);
    return result;
  } catch (error) {
    console.error('Error fetching conversation flow:', error);
    return [];
  }
};

export const fetchCarRepairDatasets = async (): Promise<CarRepairDataset[]> => {
  try {
    const db = await openDatabase();
    const result = await db.getAllAsync('SELECT * FROM car_repair_datasets;');

    // Parse the detailed_steps field from JSON string to an array of strings
    const parsedResult = result.map((dataset: any) => ({
      ...dataset,
      detailed_steps: JSON.parse(dataset.detailed_steps),
    }));

    console.log('Car repair datasets fetched from SQLite:', parsedResult);
    return parsedResult as CarRepairDataset[];
  } catch (error) {
    console.error('Error fetching car repair datasets:', error);
    return [];
  }
};

// handle all database operations like inserting, updating, and querying data.