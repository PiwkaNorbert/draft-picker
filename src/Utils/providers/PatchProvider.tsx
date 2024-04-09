// DraftContext.tsx

import React, { createContext, useContext, useState } from 'react';

// Define the shape of your context
interface PatchContextType {
  patch: string;
  setPatch: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const PatchContext = createContext<PatchContextType | undefined>(undefined);

// Create the provider component
export const PatchProvider = ({ children }: {children: React.ReactNode}) => {

  const [patch, setPatch] = useState<string>('recent');


  return (
    <PatchContext.Provider value={{ patch, setPatch }}>
      {children}
    </PatchContext.Provider>
  );
};

// Custom hook to access the draft context
export const usePatch = () => {
  const context = useContext(PatchContext);
  if (!context) {
    throw new Error('useDraft must be used within a PatchProvider');
  }
  return context;
};