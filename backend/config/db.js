const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    // Spin up an isolated, self-contained local database
    const mongoServer = await MongoMemoryServer.create();
    const localUri = mongoServer.getUri();

    const conn = await mongoose.connect(localUri);
    console.log(`🚀 Local Embedded MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;