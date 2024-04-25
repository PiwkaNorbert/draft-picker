import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { filterChampions } from "../Utils/filterChampions";
import { Root } from "../types/data";
import { QueryParams } from "../types/util";
import { getLatestVersion } from "./fetch";


export async function getPatchData (version: string, signal?: AbortSignal): Promise<Root> {
    const { data, status } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
        {
        signal,
        }
    );
    if (status !== 200) {
        throw new Error("Error fetching champions");
    }
    
    return data;
}



const useChampionQuery = (query?: QueryParams) => {

  const { data: version } = useQuery<string[]>({ 
    queryKey: ["latestPatch"],
    queryFn: ({signal}) => getLatestVersion(signal), enabled: !!query });

  const latestVersion = version?.[0] as string;

  const selectChampionData = (data: Root|undefined) => {
    const result = filterChampions(
      data,
      query
    )
    return result 
  }

  return useQuery<Root|undefined>({
    queryKey: ["champions", latestVersion],
    queryFn: ({ signal }) => getPatchData(latestVersion, signal),
    
      refetchOnWindowFocus: false,
      enabled: !!latestVersion && !!query && latestVersion !== undefined,
      select: selectChampionData
    }
  );

  
};

export default useChampionQuery;
