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

const ChamptionList = () => {

  const { patch } = usePatch()
  const { useChampionAvgData, latestVersion } = useChampionAvgQuery(patch);
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
  console.log(data);
  

return (
    <Table className="max-w-screen-md">
      <TableCaption>A list of LoL champions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell className="text-left">Name</TableCell>
          <TableCell className="text-left">Win Ratio</TableCell>


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

            </TableRow>
          )}
        )}
      </TableBody>
    </Table>

);
}

export default ChamptionList

