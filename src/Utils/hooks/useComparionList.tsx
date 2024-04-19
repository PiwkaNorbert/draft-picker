import { useContext } from "react";
import { ComparisonListContext } from "../providers/ComparisonProvider";

export const useComparisonList = () => {
  const context = useContext(ComparisonListContext);
  if (!context) {
    throw new Error('useComparisonList must be used within a ComparisonListProvider');
  }
  return context;
};