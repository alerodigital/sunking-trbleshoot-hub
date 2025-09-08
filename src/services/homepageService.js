// services/homepageService.js
import { 
    collection, 
    getDocs,
    query,
    orderBy,
    limit,
    where,
    doc, increment, updateDoc
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  // Get all topics for homepage
  export const getHomepageTopics = async () => {
    try {
      const q = query(
        collection(db, 'topics'),
        orderBy('createdAt', 'desc')
      );
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
  
  // Get popular topics (you can define popularity by view count, etc.)
  export const getPopularTopics = async () => {
    try {
      const q = query(
        collection(db, 'topics'),
        orderBy('subjects', 'desc'), // Assuming more subjects = more popular
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting popular topics:', error);
      throw error;
    }
  };

  // services/homepageService.js - Add this function
// Get popular subtopics (you can define popularity by view count, creation date, etc.)
  export const getPopularSubtopics = async (limit = 10) => {
    try {
      const q = query(
        collection(db, 'subtopics'),
        orderBy('views', 'desc'), // Or use another metric like 'views'
        
      );
      const querySnapshot = await getDocs(q);
      
    
      
       // Return only subtopic data without topic information
    const subtopics = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return subtopics;
    } catch (error) {
      console.error('Error getting popular subtopics:', error);
      throw error;
    }
  };

  // Increment view count for a subtopic
export const incrementSubtopicViews = async (subtopicId) => {
    try {
      const subtopicRef = doc(db, 'subtopics', subtopicId);
      await updateDoc(subtopicRef, {
        views: increment(1),
        lastViewedAt: new Date() // Optional: track when it was last viewed
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
      throw error;
    }
  };
  
  // Get FAQs for a specific topic
  export const getFAQsByTopic = async (topicId) => {
    try {
      const q = query(
        collection(db, 'subtopics'),
        where('topicId', '==', topicId),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting FAQs:', error);
      throw error;
    }
  };
  
  // Get all FAQs (for search functionality)
  export const getAllFAQs = async () => {
    try {
      const q = query(
        collection(db, 'subtopics'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting all FAQs:', error);
      throw error;
    }
  };
  
  // Search FAQs by keyword
  export const searchFAQs = async (searchTerm) => {
    try {
      const allFAQs = await getAllFAQs();
      const searchLower = searchTerm.toLowerCase();
      
      return allFAQs.filter(faq => 
        faq.title.toLowerCase().includes(searchLower) ||
        faq.content.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching FAQs:', error);
      throw error;
    }
  };