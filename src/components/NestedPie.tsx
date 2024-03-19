import NestedPieChart from "@toast-ui/chart/nestedPie";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { useRef, useEffect, useState } from "react";

const NestedPie = (teamAvg) => {
  const [selectedStat, setSelectedStat] = useState('damageDealtToBuildings__avg');

  const chartRef = useRef<HTMLDivElement | null>(null);

  const options = {
    chart: {
      title: "Nested Pie Chart",
      height: 330,
      width: 330,
    },
    series: {
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
          colors: ["#fa0c20", "#1717ff"],
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
  };

  const teamAvgData = teamAvg?.teamAvg?.teamAvg;
  console.log(teamAvgData);



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

  // ...

  <select value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)}>
    <option value="damageDealtToBuildings__avg">Damage Dealt To Buildings</option>
    {/* Add more options here */}
  </select>

  function getDamageAvg(
    teamColor: "red_team" | "blue_team",
    playerIndex: number
  ) {
    return teamAvgData[teamColor][playerIndex]?.stats
      ?.damageDealtToBuildings__avg;
  }

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
                  name: "Red Team",
                  data: redteamtotal,
                },
                {
                  name: "Blue Team",
                  data: blueteamtotal,
                },
              ],
            },
            {
              name: "champions",
              data: [
                {
                  name: teamAvgData?.red_team
                    ? teamAvgData?.red_team[0]?.champion
                    : "Name",
                  parentName: "Red Team",
                  data: teamAvgData?.red_team ? getDamageAvg("red_team", 0) : 0,
                },
                {
                  name: teamAvgData?.red_team
                    ? teamAvgData?.red_team[1]?.champion
                    : "Name",
                  parentName: "Red Team",
                  data: teamAvgData?.red_team ? getDamageAvg("red_team", 1) : 0,
                },
                {
                  name: teamAvgData?.red_team
                    ? teamAvgData.red_team[2]?.champion
                    : "Name",
                  parentName: "Red Team",
                  data: teamAvgData?.red_team ? getDamageAvg("red_team", 2) : 0,
                },
                {
                  name: teamAvgData?.red_team
                    ? teamAvgData?.red_team[3]?.champion
                    : "Name",
                  parentName: "Red Team",
                  data: teamAvgData?.red_team ? getDamageAvg("red_team", 3) : 0,
                },
                {
                  name: teamAvgData?.red_team
                    ? teamAvgData?.red_team[4]?.champion
                    : "Name",
                  parentName: "Red Team",
                  data: teamAvgData?.red_team ? getDamageAvg("red_team", 4) : 0,
                },
                {
                  name: teamAvgData?.blue_team
                    ? teamAvgData?.blue_team[0]?.champion
                    : "Name",
                  parentName: "Blue Team",
                  data: teamAvgData?.blue_team
                    ? getDamageAvg("blue_team", 0)
                    : 0,
                },
                {
                  name: teamAvgData?.blue_team
                    ? teamAvgData?.blue_team[1]?.champion
                    : "Name",
                  parentName: "Blue Team",
                  data: teamAvgData?.blue_team
                    ? getDamageAvg("blue_team", 1)
                    : 0,
                },
                {
                  name: teamAvgData?.blue_team
                    ? teamAvgData?.blue_team[2]?.champion
                    : "Name",
                  parentName: "Blue Team",
                  data: teamAvgData?.blue_team
                    ? getDamageAvg("blue_team", 2)
                    : 0,
                },
                {
                  name: teamAvgData?.blue_team
                    ? teamAvgData?.blue_team[3]?.champion
                    : "Name",
                  parentName: "Blue Team",
                  data: teamAvgData?.blue_team
                    ? getDamageAvg("blue_team", 3)
                    : 0,
                },
                {
                  name: teamAvgData?.blue_team
                    ? teamAvgData?.blue_team[4]?.champion
                    : "Name",
                  parentName: "Blue Team",
                  data: teamAvgData?.blue_team
                    ? getDamageAvg("blue_team", 4)
                    : 0,
                },
              ],
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
  }, [teamAvg]);

  return <div id="chart" ref={chartRef} />;
  // return "hi";
};

export default NestedPie;
