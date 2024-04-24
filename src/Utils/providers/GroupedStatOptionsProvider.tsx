// GroupedStatOptionsProvider.tsx

import { groupedStatOptions } from '../../constants';
import React, { createContext, useEffect, useState } from 'react';

// Define the shape of your context
interface GroupedOptionContextType {
    selectedIdx: number;
    setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    handleNext: () => void;
    handlePrevious: () => void;
}

// Create the context
export const GroupedOptionContext = createContext<GroupedOptionContextType | undefined>(undefined);

// Create the provider component
export const GroupedStatOptionsProvider = ({ children }: {children: React.ReactNode}) => {

    const [selectedIdx, setSelectedIdx] = useState<number>(0); 
    const [title, setTitle] = useState<string>(""); 


    useEffect(() => {
        setTitle(groupedStatOptions[selectedIdx]?.name || "");
    }, [selectedIdx]);


    const handleNext = () => {
      if (selectedIdx < groupedStatOptions.length - 1) {
        setSelectedIdx(selectedIdx + 1);
      }
      if (selectedIdx === groupedStatOptions.length - 1) {
        setSelectedIdx(0);
      }
    };
  
    const handlePrevious = () => {
      if (selectedIdx > 0) {
        setSelectedIdx(selectedIdx - 1);
      }
      if (selectedIdx === 0) {
        setSelectedIdx(groupedStatOptions.length - 1);
      }
    };



  return (
    <GroupedOptionContext.Provider value={{  selectedIdx, setSelectedIdx, title, handleNext, handlePrevious }}>
      {children}
    </GroupedOptionContext.Provider>
  );
};

