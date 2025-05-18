import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function findUserById(id) {
  const db = await getDb();
  const collection = db.collection('User');
  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function findUserByEmail(email) {
  const db = await getDb();
  const collection = db.collection('User');
  return await collection.findOne({ email });
}

export async function updateUser(id, data) {
  const db = await getDb();
  const collection = db.collection('User');
  
  const { _id, ...updateData } = data;
  
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
}

export async function getUserPoints(id) {
  const db = await getDb();
  const collection = db.collection('User');
  
  const user = await collection.findOne(
    { _id: new ObjectId(id) },
    { projection: { points: 1 } }
  );
  
  return user?.points || 0;
} 