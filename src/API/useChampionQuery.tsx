import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { filterChampions } from "../Utils/filterChampions";
import { Root } from "../types/data";
import { QueryParams } from "../types/util";


export async function getPatchData (version: string, signal?: AbortSignal) {
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

  const queryClient = useQueryClient();
  const latestVersionRef = queryClient.getQueryData<string[]>(["latestVersion"]);

  const latestVersion = latestVersionRef?.[0] || "14.8.1";


  const selectChampionData = (data: Root) => {
    const result = filterChampions(
      data,
      query
    )
    return result 
  }

  return useSuspenseQuery<Root, AxiosError>({
    queryKey: ["champions", latestVersion],
    queryFn: ({ signal }) => getPatchData(latestVersion, signal),
    refetchOnWindowFocus: false,
    select: selectChampionData
    }
  );

  
};

export default useChampionQuery;
