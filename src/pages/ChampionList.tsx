import useChampionAvgQuery from "../API/useChampionAvgQuery"
import { usePatch } from "../Utils/hooks/usePatch"
import { useState } from "react"
import { groupedStatOptions } from "../constants"
import { Button } from "../components/ui/button"
import { DataTableDemo } from "../components/ui/data-table"
import { useComparisonList } from "../Utils/hooks/useComparionList"
import { ChampionListData } from "../types/chamption-list"

const ChamptionList = () => {

  const { patch, dataLabel } = usePatch()
  const { useChampionAvgData, latestVersion } = useChampionAvgQuery(patch, dataLabel);
  const { data, isLoading, isError } = useChampionAvgData;
  const [selectedIdx, setSelectedIdx] = useState(0); // Add this line

  const handleNext = () => {
    if (selectedIdx < groupedStatOptions.length - 1) {
      setSelectedIdx(selectedIdx + 1);
    }
    if (selectedIdx === groupedStatOptions.length - 1) {
      setSelectedIdx(0);
    }
  };

  const handlePrevious = () => {
    if (selectedIdx > 0) {
      setSelectedIdx(selectedIdx - 1);
    }
    if (selectedIdx === 0) {
      setSelectedIdx(groupedStatOptions.length - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error fetching champions</div>
  }
  if (!data) {
    return <div>No champions found</div>
  }
  

return (
  <>
    <section className="flex items-center justify-between gap-4 w-full border-b pb-4">
      <Button onClick={handlePrevious}>Previous</Button>
        <h2 className="text-2xl">{groupedStatOptions[selectedIdx]?.name}</h2>
      <Button onClick={handleNext}>Next</Button>
    </section>
    <DataTableDemo data={data} selectedIdx={selectedIdx} latestVersion={latestVersion} />


    <ChampionBox latestVersion={latestVersion} />


  </>

);
}

export default ChamptionList



const ChampionBox = ({latestVersion}: {latestVersion: any}) => {
  const { state, dispatch } = useComparisonList();


  const removeChampion = (champion: ChampionListData) => {
    const championId = champion.id;
    dispatch({ type: 'REMOVE_CHAMPION', payload: { id: championId } });
  };
console.log(state);

  return (
    <div className="flex fixed bottom-5 right-5 gap-2 ">
      {state.length > 0 && state.map((champion, index) => (
        <div key={index} className="relative size-20">
          <img src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.championName}.png`} alt={champion.championName} />
          <button className="absolute -top-5 -right-5 bg-red-500" onClick={() => removeChampion(champion)}>
            close
          </button>
        </div>
      ))}
    </div>
  );
};