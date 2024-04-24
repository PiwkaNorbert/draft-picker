import { useContext } from "react";
import { GroupedOptionContext } from "../providers/GroupedStatOptionsProvider";

export const useGroupedStatOptions = () => {
  const context = useContext(GroupedOptionContext);
  if (!context) {
    throw new Error('useGroupedStatOptions must be used within a GroupedStatOptionsProvider');
  }
  return context;
};