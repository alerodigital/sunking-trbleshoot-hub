// hooks/useTopics.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTopics, 
  addTopic, 
  updateTopic, 
  deleteTopic,
  subscribeToTopics 
} from '../services/topicsService';
import { useEffect } from 'react';

export const useTopics = () => {
  const queryClient = useQueryClient();

  // Get all topics
  const useTopicsQuery = () => {
    return useQuery({
      queryKey: ['topics'],
      queryFn: getTopics,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Set up real-time listener
  useEffect(() => {
    const unsubscribe = subscribeToTopics((topics) => {
      queryClient.setQueryData(['topics'], topics);
    });

    return unsubscribe;
  }, [queryClient]);

  // Add topic mutation
  const addTopicMutation = useMutation({
    mutationFn: addTopic,
    onSuccess: () => {
      queryClient.invalidateQueries(['topics']);
    },
  });

  // Update topic mutation
  const updateTopicMutation = useMutation({
    mutationFn: ({ id, updates }) => updateTopic(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['topics']);
    },
  });

  // Delete topic mutation
  const deleteTopicMutation = useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      queryClient.invalidateQueries(['topics']);
    },
  });

  return {
    useTopicsQuery,
    addTopic: addTopicMutation.mutateAsync,
    updateTopic: updateTopicMutation.mutateAsync,
    deleteTopic: deleteTopicMutation.mutate,
    isLoading: addTopicMutation.isLoading || updateTopicMutation.isLoading || deleteTopicMutation.isLoading,
  };
};