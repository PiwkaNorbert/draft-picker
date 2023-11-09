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
        console.log(obj);

        return obj;
      }, {});
  }

  // sort packs by tags
  if (championFilterByTags.length > 0) {
    filteredChampions = Object.entries(Champions).filter((key, value) =>
      console.log(key, value)
    );
  }

  return { ...oldData, data: filteredChampions };
};

export const tags = [
  "Fighter",
  "Tank",
  "Mage",
  "Assassin",
  "Support",
  "Marksman",
];
