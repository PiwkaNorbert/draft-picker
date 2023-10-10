import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getNewestVersion() {
  const response = await axios.get(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions = response.data;
  return versions[0];
}
export async function getChampions() {
  const newestVersion = await getNewestVersion();
  const response = await axios.get(
    `http://ddragon.leagueoflegends.com/cdn/${newestVersion}/data/en_US/champion.json`
  );
  if (response.status !== 200) {
    throw new Error("Error fetching champions");
  }
  const champions = response.data;
  return champions;
}

const useChampionQuery = () => useQuery(["champions"], getChampions);

export default useChampionQuery;
