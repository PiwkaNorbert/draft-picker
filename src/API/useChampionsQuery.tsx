import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getLatestVersion(signal?: AbortSignal) {
  const { data, status } = await axios.get(
    `'https://ddragon.leagueoflegends.com/api/versions.json')`,
    {
      signal,
    }
  );
  if (status !== 200) {
    return 0
  }
  return data;
}

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


const useChampionsQuery = (fetch: boolean) =>{
    const { data } = useQuery(["latestPatch"], ({ signal }) => getLatestVersion(signal), { enabled: !!fetch });
    const latestVersion = data?.[0];


    return useQuery(["patchData", latestVersion], ({ signal }) => getPatchData(latestVersion, signal), { enabled: !!latestVersion });
}
export default useChampionsQuery;
