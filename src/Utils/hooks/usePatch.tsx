import { useContext } from 'react';
import { PatchContext } from '../providers/PatchProvider';

// Custom hook to access the draft context

export const usePatch = () => {
  const context = useContext(PatchContext);
  if (!context) {
    throw new Error('useDraft must be used within a PatchProvider');
  }
  return context;
};
