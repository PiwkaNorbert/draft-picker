
import { useComparisonList } from "../../Utils/hooks/useComparionList";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';

import { ChartData } from 'chart.js';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );


const RadarGraph = () => {
    const { state } = useComparisonList();

    const data: ChartData = {
        labels: ['Win Ratio', 'Sample Size', 'Damage Dealt To Buildings', 'Gold Earned', 'Total Minions Killed'],
        datasets: state.map((champion, index) => ({
            label: champion.championName,
            data: [champion.win_ratio, champion.sample_size, champion.damageDealtToBuildings, champion.goldEarned, champion.totalMinionsKilled],
            backgroundColor: `rgba(${index * 50}, ${index * 50}, ${index * 50}, 0.2)`,
            borderColor: `rgba(${index * 50}, ${index * 50}, ${index * 50}, 1)`,
            borderWidth: 1,
        }))
    };

  return (
    <Radar data={data} />
  )
}

export default RadarGraph