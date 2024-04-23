import useChampionAvgQuery from "../API/useChampionAvgQuery"
import { usePatch } from "../Utils/hooks/usePatch"
import { useState } from "react"
import { groupedStatOptions } from "../constants"
import { Button } from "../components/ui/button"
import { DataTableDemo } from "../components/ui/data-table"
import { ChampionBox } from "../components/ChampionBox"

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
  </>

);
}

export default ChamptionList



