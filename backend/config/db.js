const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    // Force a version compatible with Render's Debian 12 environment
    const mongoServer = await MongoMemoryServer.create({
      binary: {
        version: '7.0.3', 
      },
    });
    const localUri = mongoServer.getUri();

    const conn = await mongoose.connect(localUri);
    console.log(`🚀 Local Embedded MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;