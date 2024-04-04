import "@toast-ui/chart/dist/toastui-chart.min.css";
import { useMemo, useCallback, FC } from "react";
import { TeamAvg } from "../types/util";
import { cn } from "../lib/utils";
import { PieChart } from '@mui/x-charts/PieChart';
import { Player } from "../types/graphs";


const NestedPie: FC<{ teamAvg: TeamAvg | null, selectedStat: string, title: string, className: string }> = ({ teamAvg, selectedStat, title, className }) => {

    const getDamageAvg = useCallback((
      teamColor: "red_team" | "blue_team",
      playerIndex: number
    ): number  => {
      if (teamAvg === null) return 0;

      return (teamAvg[teamColor][playerIndex] as unknown as {[key: string]: number})[selectedStat] || 0
    }, [teamAvg, selectedStat]);


    interface ChartData {
      label: string;
      value: number;
    }

    const data: ChartData[] = useMemo(() => {
      const result: ChartData[] = [];
      const teams: ("red_team" | "blue_team")[] = ['red_team', 'blue_team'];

      teams.forEach((team) => {
        if (teamAvg && (teamAvg as unknown as {[key: string]: number | string})[team]) {
          for (let i = 0; i < 5; i++) {

            const player = teamAvg[team][i];
            const champName = (player as unknown as Player).championName;
            
            if (player) {
              result.push({
                label: champName ?? '',
                value: getDamageAvg(team, i) ?? 0,
              });
            }
        }
      }});
 
      
      return result;

    }, [teamAvg, getDamageAvg]);


    const series = [
      {
        innerRadius: 25,
        outerRadius: 120,
        id: title,
        cornerRadius: 3,
        paddingAngle: 1,
        cx: 150,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 10, additionalRadius: -10, color: 'gray',  },
        data: data,
      }
    ];

    //   const result: ChartData[] = [];
    //   const teams = ['blue_team', 'red_team'];

    //   teams.forEach((team) => {
    //     if (teamAvg && teamAvg[team]) {
    //       for (let i = 0; i < 5; i++) {

    //         const player = teamAvg[team][i];

    //         const parentName = team.charAt(0).toUpperCase() + team.slice(1);
    //         console.log(player, parentName);
            
    //         if (player) {
    //           result.push({
    //             id: i, 
    //             label: player.champion,
    //             value: getDamageAvg(team as "red_team" | "blue_team", i),
    //           });
    //         }
    //     }
    //   }});

    //   return result;
    // }, [teamAvg, getDamageAvg]);


  // useEffect(() => {
  //   let chart: NestedPieChart | null = null;

  //   if (chartRef.current) {
  //     chart = new NestedPieChart({
  //       el: chartRef.current,
  //       data: {
  //         categories: ["Team Damage", "Champion Damage"],
  //         series: [
  //           {
  //             name: "teams",
  //             data: [
  //               {
  //                 name: "Blue Team",
  //                 data: blueteamtotal,
  //               },
  //               {
  //                 name: "Red Team",
  //                 data: redteamtotal,
  //               },
  //             ],
  //           },
  //           {
  //             name: "champions",
  //             data: data
  //           },
  //         ],
  //       },
  //       options: options,
  //     });
  //   }

  //   // Cleanup function
  //   return () => {
  //     if (chart) {
  //       // Assuming that NestedPieChart has a destroy method
  //       chart.destroy();
  //     }
  //   };
  // }, [teamAvg, selectedStat, redteamtotal, blueteamtotal, getDamageAvg, options, data]);
  const generateColors = (blueTeamSize: number, redTeamSize: number) => {
    // const redColors = ["#ef4444","#f87171","#fca5a5","#fecaca", "#fee2e2"];
    const redColors = ["#ef4444","#f06565","#f38585","#f5a8a8", "#fec8c8"];
    // const blueColors = ["#2563eb",  "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];
    const blueColors = ["#2563eb",  "#3b82f5", "#60a4f8", "#90bff0", "#b8d3f8"];
  
    return [
      ...redColors.slice(0, redTeamSize),
      ...blueColors.slice(0, blueTeamSize),
    ];
  };
  const blueTeamSize = teamAvg?.blue_team.length ?? 0;
  const redTeamSize = teamAvg?.red_team.length  ?? 0;
  const colors = generateColors(blueTeamSize, redTeamSize);

  return (

    <div className={cn(
      "col-span-2 grid place-items-center p-4",
      className
    )}>
      <h2 className=" font-semibold text-sm text-gray-500">{title}</h2>
      {/* #TODO: dyanamic colors */}
      <PieChart
        colors={colors}
        height={280}
        width={280}
        series={series}
        slotProps={{
          legend: { hidden: true },
        }}
        
        // skipAnimation={skipAnimation}
        />
      </div>


  )
};

export default NestedPie;
