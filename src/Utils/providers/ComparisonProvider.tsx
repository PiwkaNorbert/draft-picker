import { ChampionListData } from '@/src/types/chamption-list';
import React, { createContext, useReducer } from 'react';

type State = ChampionListData[];

type Action =
  | { type: 'ADD_CHAMPION'; payload: ChampionListData }
  | { type: 'REMOVE_CHAMPION'; payload: { id: number } }
  | { type: 'CLEAR_COMPARISON' };


const reducer = (state: State, action: Action): State => {
    
  switch (action.type) {
    case 'ADD_CHAMPION':
      if (state.length < 5) {
        return [...state, action.payload];
      } else {
        return state;
      }
    case 'REMOVE_CHAMPION':
      return state.filter(champion => champion.id !== action.payload.id);
    case 'CLEAR_COMPARISON':
      return [];
    default:
      return state;
  }
  
};

export const ComparisonListContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const ComparisonListProvider= ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, [
    {
        "id": 15570,
        "cache_version": "recent",
        "time_label": "all",
        "championName": "Aatrox",
        "displayName": "Aatrox",
        "win_ratio": "47.927",
        "sample_size": 20473,
        "baronKills": "0.018",
        "dragonKills": "0.045",
        "inhibitorKills": "0.102",
        "kills": "5.049",
        "assists": "4.645",
        "deaths": "5.464",
        "damageDealtToBuildings": 3637,
        "damageDealtToObjectives": 6743,
        "damageDealtToTurrets": 3637,
        "goldEarned": 10597,
        "goldSpent": 9882,
        "totalMinionsKilled": 173,
        "neutralMinionsKilled": 6,
        "magicDamageDealt": 6969,
        "magicDamageDealtToChampions": 3076,
        "magicDamageTaken": 9884,
        "physicalDamageDealt": 120122,
        "physicalDamageDealtToChampions": 16631,
        "physicalDamageTaken": 17474,
        "totalDamageDealt": 130849,
        "totalDamageDealtToChampions": 19974,
        "totalDamageTaken": 28992,
        "trueDamageDealt": 3757,
        "trueDamageDealtToChampions": 265,
        "trueDamageTaken": 1632,
        "damageSelfMitigated": 21206,
        "totalHeal": 9725,
        "totalHealsOnTeammates": 0,
        "totalDamageShieldedOnTeammates": 0,
        "timeCCingOthers": 19,
        "totalTimeCCDealt": 197,
        "wardsPlaced": 7,
        "visionWardsBoughtInGame": 1,
        "wardsKilled": 1,
        "visionScore": 16
    },
    {
        "id": 15590,
        "cache_version": "recent",
        "time_label": "all",
        "championName": "Ahri",
        "displayName": "Ahri",
        "win_ratio": "51.532",
        "sample_size": 26527,
        "baronKills": "0.016",
        "dragonKills": "0.025",
        "inhibitorKills": "0.140",
        "kills": "5.755",
        "assists": "7.424",
        "deaths": "4.474",
        "damageDealtToBuildings": 3058,
        "damageDealtToObjectives": 4987,
        "damageDealtToTurrets": 3058,
        "goldEarned": 10973,
        "goldSpent": 10175,
        "totalMinionsKilled": 188,
        "neutralMinionsKilled": 1,
        "magicDamageDealt": 77261,
        "magicDamageDealtToChampions": 14300,
        "magicDamageTaken": 8512,
        "physicalDamageDealt": 13550,
        "physicalDamageDealtToChampions": 1808,
        "physicalDamageTaken": 9967,
        "totalDamageDealt": 131010,
        "totalDamageDealtToChampions": 20607,
        "totalDamageTaken": 19207,
        "trueDamageDealt": 40197,
        "trueDamageDealtToChampions": 4497,
        "trueDamageTaken": 726,
        "damageSelfMitigated": 9223,
        "totalHeal": 4783,
        "totalHealsOnTeammates": 106,
        "totalDamageShieldedOnTeammates": 0,
        "timeCCingOthers": 18,
        "totalTimeCCDealt": 77,
        "wardsPlaced": 7,
        "visionWardsBoughtInGame": 2,
        "wardsKilled": 3,
        "visionScore": 20
    }
]);

  return (
    <ComparisonListContext.Provider value={{ state, dispatch }}>
      {children}
    </ComparisonListContext.Provider>
  );
};

