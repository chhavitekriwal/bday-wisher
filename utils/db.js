const { Client } = require('pg');
const client = new Client({connectionString: process.env.SUPABASE_CONNECTION_URI});

const {createTableQuery} = require('./queries');

const connectDB = async () => {
  try {
    await client.connect();
    await client.query(createTableQuery());
    return 'Connected';
  } catch(err) {
    return err;
  }
};

module.exports = {client, connectDB};