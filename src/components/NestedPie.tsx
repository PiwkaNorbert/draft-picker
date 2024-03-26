import NestedPieChart from "@toast-ui/chart/nestedPie";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";

const NestedPie = ({teamAvg}) => {
    const [selectedStat, setSelectedStat] = useState('damageDealtToBuildings__avg');
    const teamAvgData = teamAvg?.teamAvg;

    const chartRef = useRef<HTMLDivElement | null>(null);

    const redteamtotal = Array(5)
    .fill(null)
    .reduce((total, _, index) => {
      const value = ~~teamAvgData?.red_team[index]?.stats?.[selectedStat];
      return total + (value ? +value : 0);
    }, 0);

    const blueteamtotal = Array(5)
      .fill(null)
      .reduce((total, _, index) => {
        const value = ~~teamAvgData?.blue_team[index]?.stats?.[selectedStat];
        return total + (value ? +value : 0);
      }, 0);

    const getDamageAvg = useCallback((
      teamColor: "red_team" | "blue_team",
      playerIndex: number
    ) => {
      return teamAvgData[teamColor][playerIndex]?.stats
        ?.[selectedStat]
    }, [teamAvgData, selectedStat]);


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
        if (teamAvgData && teamAvgData[team]) {
          for (let i = 0; i < 5; i++) {
            result.push({
              name: teamAvgData[team][i]?.champion ? teamAvgData[team][i].champion : "Name",
              parentName: team === "red_team" ? "Red Team" : "Blue Team",
              data: getDamageAvg(team, i) || 0,
            });
          }
        }
      });

      return result;
    }, [teamAvgData, getDamageAvg]);



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
  }, [teamAvg, selectedStat, redteamtotal, blueteamtotal, getDamageAvg, options, teamAvgData, data]);

  return (
  <section className="flex gap-6">
  <div id="chart" ref={chartRef} />
  <select value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)}>
    {statOptions.map(({value, name}, idx: number) => (
      <option key={idx} value={value}>
        {name}
      </option>
    ))}
  </select>
  </section> 

  )
  // return "hi";
};

export default NestedPie;

const statOptions = [
  {value: "damageDealtToBuildings__avg", name :"Damage Dealt To Buildings" },
  {value: "damageDealtToObjectives__avg", name: "Damage Dealt To Objectives"},
  {value: "damageDealtToTurrets__avg", name: "Damage Dealt To Turrets"},
  {value: "damageSelfMitigated__avg", name: "Damage Self Mitigated"},
  {value: "magicDamageDealtToChampions__avg", name: "Magic Damage Dealt To Champions"},
  {value: "magicDamageTaken__avg", name: "Magic Damage Taken"},
  {value: "physicalDamageDealtToChampions__avg", name: "Physical Damage Dealt To Champions"},
  {value: "physicalDamageTaken__avg", name: "Physical Damage Taken"},
  {value: "timeCCingOthers__avg", name: "Time CCing Others"},
  {value: "totalDamageShieldedOnTeammates__avg", name: "Total Damage Shielded On Teammates"},
  {value: "totalHeal__avg", name: "Total Heal"},
  {value: "totalHealsOnTeammates__avg", name: "Total Heals On Teammates"},
  {value: "totalTimeCCDealt__avg", name: "Total Time CC Dealt"},
  {value: "trueDamageDealtToChampions__avg", name: "True Damage Dealt To Champions"},
  {value: "trueDamageTaken__avg", name: "True Damage Taken"},
];