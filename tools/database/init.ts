import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('autowise.db');
  return db;
};

export const initDatabase = async () => {
  try {
    const db = await openDatabase();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS car_repair_datasets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        symptoms TEXT,
        problem TEXT,
        solution TEXT,
        detailed_steps TEXT,  -- JSON data stored as TEXT
        tools_required TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS conversation_flow (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        step_key TEXT,
        message TEXT,
        options TEXT  -- JSON data stored as TEXT
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// handle the initialization of the SQLite database and table creation.