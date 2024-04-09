import { useSearchParams } from "react-router-dom"
import useChampionQuery from "../API/useChampionQuery"
import { Champion } from "../types/data"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table"

const ChamptionList = () => {

  const [searchParams] = useSearchParams()
  const tags = searchParams.get('tag')?.split(',') || []
  const search = searchParams.get('search') || ''
  const query = {tags, search}

  const { data, isLoading, isError} = useChampionQuery(query);
  

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
    <Table className="max-w-screen-md">
      <TableCaption>A list of LoL champions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell className="text-left">Name</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Blurb</TableCell>


        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(data.data).map((champion: Champion, idx: number) => { 
           
          return (
            <TableRow key={champion.id} className="">
              <TableCell>{idx}.</TableCell>
              <TableCell  className="flex gap-2 items-center min-w-max ">
              <img 
                src={`http://ddragon.leagueoflegends.com/cdn/${data.version}/img/champion/${champion.image.full}`} 
                alt={champion.name} 
                className="size-14"
                loading="lazy"
              />
                {champion.name}
              </TableCell>
              <TableCell className="text-left">{champion.title}</TableCell>
              <TableCell className="text-left">{champion.blurb}</TableCell>

            </TableRow>
          )}
        )}
      </TableBody>
    </Table>

);
}

export default ChamptionList

