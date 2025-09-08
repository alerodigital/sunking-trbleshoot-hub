// services/subtopicsService.js
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
    where,
    serverTimestamp,
    increment
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  // Get all subtopics for a specific topic
  export const getSubtopics = async (topicId) => {
    try {
      const q = query(
        collection(db, 'subtopics'), 
        where('topicId', '==', topicId),
        // orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);

      // Sort manually on the client side as a temporary workaround
    const subtopics = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    // Manual sorting by createdAt
    return subtopics.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return a.createdAt.toDate() - b.createdAt.toDate();
      }
      return 0;
    });
    } catch (error) {
      console.error('Error getting subtopics:', error);
      throw error;
    }
  };
  
  // Add a new subtopic
  export const addSubtopic = async (topicId, subtopicData) => {
    try {
      const docRef = await addDoc(collection(db, 'subtopics'), {
        ...subtopicData,
        topicId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
  
      // Update the topic's subject count
      await updateDoc(doc(db, 'topics', topicId), {
        subjects: increment(1),
        updatedAt: serverTimestamp(),
      });
  
      return { id: docRef.id, ...subtopicData };
    } catch (error) {
      console.error('Error adding subtopic:', error);
      throw error;
    }
  };
  
  // Update a subtopic
  export const updateSubtopic = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'subtopics', id), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating subtopic:', error);
      throw error;
    }
  };
  
  // Delete a subtopic
  export const deleteSubtopic = async (topicId, subtopicId) => {
    try {
      await deleteDoc(doc(db, 'subtopics', subtopicId));
  
      // Update the topic's subject count
      await updateDoc(doc(db, 'topics', topicId), {
        subjects: increment(-1),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error deleting subtopic:', error);
      throw error;
    }
  };
  
  // Real-time subtopics listener for a specific topic
  export const subscribeToSubtopics = (topicId, callback) => {
    const q = query(
      collection(db, 'subtopics'), 
      where('topicId', '==', topicId),
      // Remove orderBy temporarily: orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (querySnapshot) => {
      const subtopics = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

       // Manual sorting by createdAt
    subtopics.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return a.createdAt.toDate() - b.createdAt.toDate();
        }
        return 0;
      });
      
      callback(subtopics);
    });
  };