// hooks/useSubtopicViews.js
import { useMutation } from '@tanstack/react-query';
import { incrementSubtopicViews } from '../services/homepageService';

export const useSubtopicViews = () => {
  return useMutation({
    mutationFn: incrementSubtopicViews,
    onError: (error) => {
      console.error('Failed to record view:', error);
    }
  });
};