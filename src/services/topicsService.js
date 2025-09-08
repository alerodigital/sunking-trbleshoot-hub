// services/topicsService.js
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    getDocs,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    where,
  writeBatch
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  // Get all topics
  export const getTopics = async () => {
    try {
      const q = query(collection(db, 'topics'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting topics:', error);
      throw error;
    }
  };
  
  // Add a new topic
  export const addTopic = async (topicData) => {
    try {
      const docRef = await addDoc(collection(db, 'topics'), {
        ...topicData,
        subjects: 0, // Initialize with 0 subjects
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...topicData };
    } catch (error) {
      console.error('Error adding topic:', error);
      throw error;
    }
  };
  
  // Update a topic
  export const updateTopic = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'topics', id), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating topic:', error);
      throw error;
    }
  };
  
  // Delete a topic
  export const deleteTopic = async (id) => {
    try {
      const batch = writeBatch(db);

       // Delete the topic
    const topicRef = doc(db, 'topics', id);
    batch.delete(topicRef);

    // Find and delete all subtopics associated with this topic
    const subtopicsQuery = query(
      collection(db, 'subtopics'), 
      where('topicId', '==', id)
    );


    const subtopicsSnapshot = await getDocs(subtopicsQuery);
    subtopicsSnapshot.forEach((subtopicDoc) => {
      batch.delete(doc(db, 'subtopics', subtopicDoc.id));
    });

    // Commit the batch
    await batch.commit();
    } catch (error) {
      console.error('Error deleting topic:', error);
      throw error;
    }
  };
  
  // Real-time topics listener
  export const subscribeToTopics = (callback) => {
    const q = query(collection(db, 'topics'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const topics = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(topics);
    });
  };