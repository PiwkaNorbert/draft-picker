import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { filterChampions } from "../Utils/filterChampions";

export async function getChampions(signal) {
  const { data, status } = await axios.get(
    `http://192.168.15.220:8000/champions-data/`,
    signal
  );
  if (status !== 200) {
    throw new Error("Error fetching champions");
  }
  return data;
}

const useChampionQuery = () => {
  const [championFilterByInput, setChampionFilterByInput] = useState<string[]>(
    []
  );
  const [championFilterByTags, setChampionFilterByTags] = useState<string[]>(
    []
  );

  const useChampionData = useQuery(
    ["champions"],
    ({ signal }) => getChampions(signal),
    {
      refetchOnWindowFocus: false,
      select: (data) =>
        filterChampions(data, championFilterByInput, championFilterByTags),
    }
  );

  return {
    useChampionData,
    championFilterByInput,
    setChampionFilterByInput,
    championFilterByTags,
    setChampionFilterByTags,
  };
};

export default useChampionQuery;
