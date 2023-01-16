const { Client } = require('pg');
const connectionURI = "postgresql://postgres:bday.wisher@db.mdphkcpozvdufvteephd.supabase.co:5432/postgres";
const client = new Client({connectionString: connectionURI});

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