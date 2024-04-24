import { groupedStatOptions } from "../constants";
import { Button } from "./ui/button";

interface StatOptionType {
  selectedIdx: number;
  handleNext: () => void;
  handlePrevious: () => void;
}
export const StatOptionSelector = ({ selectedIdx, handleNext, handlePrevious }: StatOptionType) => {

  return (
    <section className="flex items-center justify-between gap-4 w-full border-b pb-4">
      <Button onClick={handlePrevious}>Previous</Button>
      <h2 className="text-2xl">{groupedStatOptions[selectedIdx]?.name}</h2>
      <Button onClick={handleNext}>Next</Button>
    </section>
  );
};
