import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getPatches(signal?: AbortSignal) {
  const { data, status } = await axios.get(
    `http://192.168.15.220:8000/patches/`,
    {
      signal,
    }
  );
  if (status !== 200) {
    throw new Error("Error fetching game patches");
  }
  return data;
}

const usePatches = () =>
  useQuery(["patches"], ({ signal }) => getPatches(signal), {
    enabled: !!fetch,
    placeholderData: [
      "recent",
      "14.7",
      "14.6",
      "14.5",
      "14.4"
      ],
  });

export default usePatches;
