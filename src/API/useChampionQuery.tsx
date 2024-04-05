import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { filterChampions } from "../Utils/filterChampions";
import { Root } from "../types/data";

export async function getLatestVersion(signal?: AbortSignal) {
  const { data, status } = await axios.get(
    'https://ddragon.leagueoflegends.com/api/versions.json',
    {
      signal,
    }
  );
  if (status !== 200) {
    return 0
  }
  return data;
}

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


const useChampionQuery = (query?: string) => {


  const { data } = useQuery(["latestPatch"], ({ signal }) => getLatestVersion(signal), { enabled: !!fetch });
  const latestVersion = data?.[0];


  const selectChampionData = (data: Root) => {
    const result = filterChampions(
      data,
      query
    )
    return result 
  }

  return useQuery<Root>(
    ["champions", latestVersion],
    ({ signal }) => getPatchData(latestVersion, signal),
    {
      refetchOnWindowFocus: false,
      enabled: !!latestVersion,
      select: selectChampionData
    }
  );

  
};

export default useChampionQuery;
