import "@toast-ui/chart/dist/toastui-chart.min.css";
import { useMemo, useCallback, FC } from "react";
import { TeamAvg } from "../types/util";
import { cn } from "../lib/utils";
import { PieChart } from '@mui/x-charts/PieChart';
import { Player } from "../types/graphs";
interface ChartData {
  label: string;
  value: number;
  color: string;
}

const NestedPie: FC<{ teamAvg: TeamAvg | null, selectedStat: string, title: string, className: string }> = ({ teamAvg, selectedStat, title, className }) => {
  
  
  const colors = useMemo(() => {
    const redColors = ["#ef4444","#f06565","#f38585","#f5a8a8", "#fec8c8"];
    const blueColors = ["#2563eb",  "#3b82f5", "#60a4f8", "#90bff0", "#b8d3f8"];
    
    return { redColors, blueColors };
  }, []);
    
  const { redColors, blueColors } = colors;


  const colorMapping: Record<"red_team" | "blue_team", string[]> = useMemo(() => {
    return {
    "red_team": redColors,
    "blue_team": blueColors,
  }
}, [redColors, blueColors]);



  const getDamageAvg = useCallback((
      teamColor: "red_team" | "blue_team",
      playerIndex: number
    ): number  => {
      if (teamAvg === null) return 0;

      return (teamAvg[teamColor][playerIndex] as unknown as {[key: string]: number})[selectedStat] || 0;
    }, [teamAvg, selectedStat]);

    const blueTeamTotal: number = useMemo(() => {
      if (teamAvg === null) return 0;

      return teamAvg.blue_team.reduce((acc, player) => {
        return acc + (player as unknown as {[key: string]: number})[selectedStat]
      }, 0);
    }, [teamAvg, selectedStat]);

    const redTeamTotal: number = useMemo(() => {
      if (teamAvg === null) return 0;

      return teamAvg.red_team.reduce((acc, player) => {
        return acc + (player as unknown as {[key: string]: number})[selectedStat]
      }, 0);
    }, [teamAvg, selectedStat]);




    const data: ChartData[] = useMemo(() => {
      const result: ChartData[] = [];
      const teams: ("red_team" | "blue_team")[] = ['red_team', 'blue_team'];

      teams.forEach((team) => {
        if (teamAvg && (teamAvg as unknown as {[key: string]: number | string})[team]) {
          for (let i = 0; i < 5; i++) {

            const player = teamAvg[team][i];
            const champName = (player as unknown as Player)?.championName;
            
            if (player) {
              const damageAvg = getDamageAvg(team, i);
              if (damageAvg !== undefined && damageAvg !== 0) {
                result.push({
                  label: champName ?? '',
                  value: damageAvg,
                  color: colorMapping[team][i],
                });
              }
            }
        }
      }});
 
      
      return result;

    }, [teamAvg, getDamageAvg, colorMapping]);


  const totalsData = [
    { value: redTeamTotal, label: 'Red Team', color: redColors[2]},
    { value: blueTeamTotal , label: 'Blue Team', color: blueColors[2]},
  ];

 

  

  return (

    <div className={cn(
      "col-span-2 grid place-items-center p-4",
      className
    )}>
      <h2 className=" font-semibold text-sm text-gray-500">{title}</h2>
      {/* #TODO: dyanamic colors */}
      <PieChart
        colors={undefined}
        height={280}
        width={280}
        series={[
          {
            data: totalsData,
            innerRadius: 0,
            outerRadius: 80,
            id: 'series-1',
            cornerRadius: 3,
            paddingAngle: 2,
            cx: 150,
            highlightScope: { faded: 'series', highlighted: 'item'},
            faded: { innerRadius: 10, additionalRadius: -10, color: 'gray',  },
          },
          {
            data: data,
            innerRadius: 83,
            outerRadius: 120,
            id: title,
            cornerRadius: 3,
            paddingAngle: 1,
            cx: 150,
            highlightScope: { faded: 'series', highlighted: 'item'},
            faded: { innerRadius: 10, additionalRadius: -10, color: 'gray',  },
          }
        ]}
        slotProps={{
          legend: { hidden: true },
        }}
        
        // skipAnimation={skipAnimation}
        />
      </div>


  )
};

export default NestedPie;
