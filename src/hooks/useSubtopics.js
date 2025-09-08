// hooks/useSubtopics.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getSubtopics, 
  addSubtopic, 
  updateSubtopic, 
  deleteSubtopic 
} from '../services/subtopicsService';

export const useSubtopics = (topicId) => {
  const queryClient = useQueryClient();

  // Get all subtopics for a topic
  const useSubtopicsQuery = () => {
    return useQuery({
      queryKey: ['subtopics', topicId],
      queryFn: () => getSubtopics(topicId),
      enabled: !!topicId, // Only run if topicId exists
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Add subtopic mutation
  const addSubtopicMutation = useMutation({
    mutationFn: (subtopicData) => addSubtopic(topicId, subtopicData),
    onSuccess: () => {
      // Invalidate both subtopics and topics queries
      queryClient.invalidateQueries(['subtopics', topicId]);
      queryClient.invalidateQueries(['topics']);
    },
  });

  // Update subtopic mutation
  const updateSubtopicMutation = useMutation({
    mutationFn: ({ id, updates }) => updateSubtopic(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['subtopics', topicId]);
    },
  });

  // Delete subtopic mutation
  const deleteSubtopicMutation = useMutation({
    mutationFn: (subtopicId) => deleteSubtopic(topicId, subtopicId),
    onSuccess: () => {
      queryClient.invalidateQueries(['subtopics', topicId]);
      queryClient.invalidateQueries(['topics']);
    },
  });

  return {
    useSubtopicsQuery,
    addSubtopic: addSubtopicMutation.mutateAsync,
    updateSubtopic: updateSubtopicMutation.mutateAsync,
    deleteSubtopic: deleteSubtopicMutation.mutate,
    isLoading: addSubtopicMutation.isLoading || updateSubtopicMutation.isLoading || deleteSubtopicMutation.isLoading,
    isAdding: addSubtopicMutation.isLoading,
    isUpdating: updateSubtopicMutation.isLoading,
    isDeleting: deleteSubtopicMutation.isLoading,
  };
};