import { Root } from "../types/data";

export const filterChampions = (
  data: Root,
  query?: string
)  => {
  if (!query) return data;

  const oldData = data;
  console.log(data);
  

  const { data: Champions } = data;

  // let filteredChampions = Champions;
  // // sort packs by input value
  // if (championFilterByInput.length > 0 || championFilterByTags.length > 0) {
  //   filteredChampions = Object.entries(Champions)
  //     .filter(([_, value]: [string, unknown]) => {
  //       const champion = value as Champion;
  //       if (championFilterByInput.length > 0) {
  //         return championFilterByInput.every((input) =>
  //           champion.name.toLowerCase().includes(input.toLowerCase())
  //         );
  //       }
  //       if (championFilterByTags.length > 0) {
  //         return championFilterByTags.every((tag) => {
  //           return champion.tags.includes(tag);
  //         });
  //       }
  //     })
  //     .reduce((obj: any, key) => {
  //       obj[key[0]] = key[1];

  //       return obj;
  //     }, {});
  // }

  // return { ...oldData, data: filteredChampions };
};
