import axios from "axios";

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