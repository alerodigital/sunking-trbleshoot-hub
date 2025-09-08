// hooks/useHomepageData.js
import { useQuery } from '@tanstack/react-query';
import { 
  getHomepageTopics, 
  getPopularTopics, 
  getFAQsByTopic,
  searchFAQs, 
  getPopularSubtopics
} from '../services/homepageService';
import { useSubtopicViews } from './useSubtopicViews';

export const useHomepageTopics = () => {
  return useQuery({
    queryKey: ['homepageTopics'],
    queryFn: getHomepageTopics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePopularTopics = () => {
  return useQuery({
    queryKey: ['popularTopics'],
    queryFn: getPopularTopics,
    staleTime: 5 * 60 * 1000,
  });
};

// hooks/useHomepageData.js - Add this hook
export const usePopularSubtopics = (limit = 10) => {
   
    return useQuery({
      queryKey: ['popularSubtopics', limit],
      queryFn: () => getPopularSubtopics(limit),
      staleTime: 5 * 60 * 1000,
    });
  };

export const useTopicFAQs = (topicId) => {
  return useQuery({
    queryKey: ['topicFAQs', topicId],
    queryFn: () => getFAQsByTopic(topicId),
    enabled: !!topicId, // Only run if topicId exists
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchFAQs = (searchTerm) => {
  return useQuery({
    queryKey: ['searchFAQs', searchTerm],
    queryFn: () => searchFAQs(searchTerm),
    enabled: searchTerm.length > 2, // Only search if term has at least 3 characters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};