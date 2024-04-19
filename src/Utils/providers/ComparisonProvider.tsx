import { ChampionListData } from '@/src/types/chamption-list';
import React, { createContext, useReducer } from 'react';

type State = ChampionListData[];

type Action =
  | { type: 'ADD_CHAMPION'; payload: ChampionListData }
  | { type: 'REMOVE_CHAMPION'; payload: { id: number } };

const reducer = (state: State, action: Action): State => {
    
  switch (action.type) {
    case 'ADD_CHAMPION':

      return [...state, action.payload];
    case 'REMOVE_CHAMPION':
      return state.filter(champion => champion.id !== action.payload.id);
    default:
      return state;
  }
  
};

export const ComparisonListContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const ComparisonListProvider= ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <ComparisonListContext.Provider value={{ state, dispatch }}>
      {children}
    </ComparisonListContext.Provider>
  );
};

