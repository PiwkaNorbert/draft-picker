import "@toast-ui/chart/dist/toastui-chart.min.css";
import NestedPie from "./NestedPie";

export default function Graphs(teamAvg) {
  return (
    <div>
      <h1>Graphs</h1>
      <NestedPie teamAvg={teamAvg} />
    </div>
  );
}
