import { Champion } from "../types";
export const filterChampions = (
  data: any,
  championFilterByInput: string[],
  championFilterByTags: string[]
) => {
  if (!(championFilterByInput || championFilterByTags)) return data;

  const oldData = data;

  const { data: Champions } = data;
  let filteredChampions = Champions;
  // sort packs by input value
  if (championFilterByInput.length > 0) {
    filteredChampions = Object.keys(Champions)
      .filter((key) => {
        return key
          .toLowerCase()
          .includes(championFilterByInput[0].toLowerCase());
      })
      .reduce((obj: any, key) => {
        obj[key] = Champions[key];

        return obj;
      }, {});
  }

  // sort packs by tags
  if (championFilterByTags.length > 0) {
    filteredChampions = Object.entries(Champions)
      .filter(([_, value]: [string, unknown]) => {
        const champion = value as Champion;
        return championFilterByTags.every((tag) => {
          return champion.tags.includes(tag);
        });
      })
      .reduce((obj: any, key) => {
        obj[key[0]] = key[1];
        return obj;
      }, {});
  }

  return { ...oldData, data: filteredChampions };
};
