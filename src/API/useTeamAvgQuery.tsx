import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getTeamAvg() {
  const { data, status } = await axios.get(
    `http://192.168.15.115:8000/team-avg/`
  );
  if (status !== 200) {
    throw new Error("Error fetching Team avarage");
  }
  console.log(data);

  return data;
}

const useChampionQuery = () => useQuery(["team-avg"], getTeamAvg);

export default useChampionQuery;
