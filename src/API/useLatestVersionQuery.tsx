import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export async function getLatestVersion(signal?: AbortSignal) {
    const { data, status } = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json',
      {
        signal,
      }
    );
    if (status !== 200) {
      return ["14.8.1"];
    }
    return data;
  }


const useLatestVersionQuery = () => {

    const versionQuery = useQuery<string[]>({
        queryKey: ["latestVersion"],
        queryFn: ({ signal }) => getLatestVersion(signal),
        staleTime:  1000 * 60 * 60 * 1,
    
    });

    if (versionQuery?.data === undefined) {
      return { data: ["14.8.1"], isLoading: true, isError: false};
    }
    return versionQuery;
   
  };
  
  export default useLatestVersionQuery;
  