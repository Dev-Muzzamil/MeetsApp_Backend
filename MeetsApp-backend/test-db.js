import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const startTestDB = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log('Test MongoDB URI:', uri);
  
  await mongoose.connect(uri);
  console.log('Connected to in-memory MongoDB');
  
  return mongod;
};

export default startTestDB;