import NestedPieChart from "@toast-ui/chart/nestedPie";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { useRef, useEffect, useMemo, useCallback, FC } from "react";
import { TeamAvg } from "../types/util";


const NestedPie: FC<{ teamAvg: TeamAvg | null, selectedStat: string }> = ({ teamAvg, selectedStat }) => {



    const chartRef = useRef<HTMLDivElement | null>(null);

    const redteamtotal = Array(5)
    .fill(null)
    .reduce((total, _, index) => {
      const value = ~~(teamAvg?.red_team[index]?.stats?.[selectedStat] || 0);

      return total + value;
    }, 0);
  
    const blueteamtotal = Array(5)
      .fill(null)
      .reduce((total, _, index) => {
        const value = ~~(teamAvg?.blue_team[index]?.stats?.[selectedStat] || 0);
        return total + value;
      }, 0);

    const getDamageAvg = useCallback((
      teamColor: "red_team" | "blue_team",
      playerIndex: number
    ): number => {
      if (teamAvg === null) return 0;
      
      return teamAvg[teamColor][playerIndex]?.stats
        ?.[selectedStat] || 0
    }, [teamAvg, selectedStat]);


    const options = useMemo(()=> ({
      chart: {
        title: "Nested Pie Chart",
        height: 330,
        width: 330,
      },
      series: {
        clockwise: false,
        teams: {
          radiusRange: {
            inner: "0%",
            outer: "50%",
          },
        },
        champions: {
          radiusRange: {
            inner: "60%",
            outer: "90%",
          },
          dataLabels: {
            visible: false,
            pieSeriesName: {
              visible: true,
            },
          },
        },
      },
      exportMenu: {
        visible: false,
      },

      theme: {
        series: {
          teams: {
            colors: ["#1717ff","#fa0c20"],
            lineWidth: 1,
            strokeStyle: "#000000",
            hover: {
              lineWidth: 2,
              strokeStyle: "#000000",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 10,
            },
          },
          champions: {
            lineWidth: 1,
            strokeStyle: "#000000",
            hover: {
              lineWidth: 2,
              strokeStyle: "#000000",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 0,
            },
          },
        },
      },
    }), []);


    interface ChartData {
      name: string;
      parentName: string;
      data: number;
    }

    const data: ChartData[] = useMemo(() => {
      const result: ChartData[] = [];
      const teams = ['blue_team', 'red_team'];

      teams.forEach((team) => {
        if (teamAvg && teamAvg[team]) {
          for (let i = 0; i < 5; i++) {

            const player = teamAvg[team][i];

            const parentName = team.charAt(0).toUpperCase() + team.slice(1);
            console.log(player, parentName);
            
            if (player) {
              result.push({
                name: player.champion,
                parentName: team === "red_team" ? "Red Team" : "Blue Team",
                data: getDamageAvg(team as "red_team" | "blue_team", i),
              });
            }
        }
      }});

      return result;
    }, [teamAvg, getDamageAvg]);



  useEffect(() => {
    let chart: NestedPieChart | null = null;

    if (chartRef.current) {
      chart = new NestedPieChart({
        el: chartRef.current,
        data: {
          categories: ["Team Damage", "Champion Damage"],
          series: [
            {
              name: "teams",
              data: [
                {
                  name: "Blue Team",
                  data: blueteamtotal,
                },
                {
                  name: "Red Team",
                  data: redteamtotal,
                },
              ],
            },
            {
              name: "champions",
              data: data
            },
          ],
        },
        options: options,
      });
    }

    // Cleanup function
    return () => {
      if (chart) {
        // Assuming that NestedPieChart has a destroy method
        chart.destroy();
      }
    };
  }, [teamAvg, selectedStat, redteamtotal, blueteamtotal, getDamageAvg, options, data]);

  return (
  <div id="chart" ref={chartRef} />


  )
  // return "hi";
};

export default NestedPie;
