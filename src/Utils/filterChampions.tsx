import { Root, Data } from "../types/data";
import { QueryParams } from "../types/util";

export const filterChampions = (
  data: Root,
  query?: QueryParams
): Root => {
  if (!data) return data;
  if (!query) return data;

  const { search, tags = [] } = query;

  const newData: Data = { ...data.data };
  

  if (search) {
    Object.keys(newData).forEach(key => {
      if (!key.toLowerCase().includes(search.toLowerCase())) {
        delete newData[key];
      }
    });
  }

  if (tags.length > 0) {
    Object.keys(newData).forEach(key => {
      if (!tags.every(tag => newData[key].tags.includes(tag))) {
        delete newData[key];
      }
    });
  }
  return { ...data, data: newData };
}