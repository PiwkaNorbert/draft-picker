import useChampionAvgQuery from "../API/useChampionAvgQuery"
import { usePatch } from "../Utils/hooks/usePatch"
import { DataTableDemo } from "../components/ui/data-table"
import { useGroupedStatOptions } from "../Utils/hooks/useGroupedStatOptions"
import { StatOptionSelector } from "../components/StatOptionSelector"

const ChamptionList = () => {

  const { patch, dataLabel } = usePatch()
  const { selectedIdx, handleNext, handlePrevious } = useGroupedStatOptions()
  const { useChampionAvgData, latestVersion } = useChampionAvgQuery(patch, dataLabel);
  const { data, isLoading, isError } = useChampionAvgData;


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
      <StatOptionSelector selectedIdx={selectedIdx} handleNext={handleNext} handlePrevious={handlePrevious} />
      <DataTableDemo data={data} selectedIdx={selectedIdx} latestVersion={latestVersion} />
    </>

  );
}

export default ChamptionList


