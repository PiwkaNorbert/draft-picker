import { useContext } from 'react';
import { DraftContext } from '../providers/DraftProvider';


export const useDraft = () => {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error('useDraft must be used within a DraftProvider');
  }
  return context;
};
