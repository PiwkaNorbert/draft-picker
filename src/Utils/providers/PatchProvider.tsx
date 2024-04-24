// PatchProvider.tsx

import React, { createContext, useState } from 'react';

// Define the shape of your context
interface PatchContextType {
  patch: string;
  setPatch: React.Dispatch<React.SetStateAction<string>>;
  dataLabel: string;
  setDataLabel: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
export const PatchContext = createContext<PatchContextType | undefined>(undefined);

// Create the provider component
export const PatchProvider = ({ children }: {children: React.ReactNode}) => {

  const [patch, setPatch] = useState<string>('recent');
  const [dataLabel, setDataLabel] = useState<string>('all');


  return (
    <PatchContext.Provider value={{ patch, setPatch, dataLabel, setDataLabel }}>
      {children}
    </PatchContext.Provider>
  );
};

