
import { groupedStatOptions } from "../../constants";
import { useComparisonList } from "../../Utils/hooks/useComparionList";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  } from 'chart.js';


import { Radar } from 'react-chartjs-2';
import { useGroupedStatOptions } from "../../Utils/hooks/useGroupedStatOptions";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );


const RadarGraph = () => {
    const { state: selectedChampions } = useComparisonList();
    const { selectedIdx } = useGroupedStatOptions();

    
    const selectedOption = groupedStatOptions[selectedIdx];
    const labels = selectedOption ? selectedOption.stats.map(stat => stat.name) : [];
    const labelValues = selectedOption ? selectedOption.stats.map(stat => stat.value) : [];
  

    const data = {
      labels: labels,
      datasets: selectedOption ? selectedChampions.map((champion) => ({
          label: champion.championName,
          data: labelValues.map(stat => Number(champion[stat])),

          borderWidth: 1,
          // backgroundColor: `rgba()`

      })) : []
    };


  return (
    <div className=" bg-[#f0f0f0] rounded-md p-4 mt-4">
      <Radar data={data} />
    </div>
  )
}

export default RadarGraph

