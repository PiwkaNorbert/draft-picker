import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getTeamAvg(signal?: AbortSignal) {
  const { data, status } = await axios.get(
    `http://192.168.15.220:8000/game-avg/`,
    {
      signal,
    }
  );
  if (status !== 200) {
    throw new Error("Error fetching Team avarage");
  }
  return data;
}

const useChampionQuery = (fetch: boolean) =>
  useQuery(["team-avg"], ({ signal }) => getTeamAvg(signal), {
    enabled: !!fetch,
  });

export default useChampionQuery;
