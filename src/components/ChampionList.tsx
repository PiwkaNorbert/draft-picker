import useChampionAvgQuery from "../API/useChampionAvgQuery"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table"
import { usePatch } from "../Utils/hooks/usePatch"
import { useState } from "react"
import { groupedStatOptions } from "../constants"
import { Button } from "./ui/button"

const ChamptionList = () => {

  const { patch } = usePatch()
  const { useChampionAvgData, latestVersion } = useChampionAvgQuery(patch);
  const { data, isLoading, isError } = useChampionAvgData;
  const [selectedIdx, setSelectedIdx] = useState(0); // Add this line


  const handleNext = () => {
    if (selectedIdx < groupedStatOptions.length - 1) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedIdx > 0) {
      setSelectedIdx(selectedIdx - 1);
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

  <section className="flex items-center justify-between gap-4 w-full">
    <Button onClick={handlePrevious}>Previous</Button>
      <h2 >{groupedStatOptions[selectedIdx]?.name}</h2>
    <Button onClick={handleNext}>Next</Button>
  </section>

    <Table className="">
      <TableCaption>A list of LoL champions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell className="text-left">Name</TableCell>
          <TableCell className="text-left">Win Ratio</TableCell>
          {groupedStatOptions[selectedIdx]?.stats.map((stat, idx) => (
            <TableCell  key={idx}>{stat.name}</TableCell>
          ))}

        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((champion, idx: number) => { 
           
          return (
            <TableRow key={champion.id} className="">
              <TableCell>{idx}.</TableCell>
              <TableCell  className="flex gap-2 items-center min-w-max ">
              <img 
                src={`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.championName}.png`} 
                alt={champion.championName} 
                className="size-14"
                loading="lazy"
              />
                {champion.championName}
              </TableCell>
              <TableCell className="text-left">{champion.win_ratio}%</TableCell>
              
             {groupedStatOptions.map(({stats}, groupIdx) =>  
                groupIdx === selectedIdx && stats.map(({value}, idx) => 
                    <TableCell key={idx}>{champion[value]}</TableCell> 
                )
              )}
         
            </TableRow>
          )}
        )}
      </TableBody>
    </Table>
    </>

);
}

export default ChamptionList

