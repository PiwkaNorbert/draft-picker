import "@toast-ui/chart/dist/toastui-chart.min.css";
import NestedPie from "./NestedPie";
import { FC, useState } from "react";
import { TeamAvg } from "../types/util";

const Graphs: FC<{ teamAvg: TeamAvg | null }> = ({ teamAvg }) => {

  const stat = "totalDamageDealtToChampions";

  const [selectedStat, setSelectedStat] = useState(stat);

  
  return (
    <div className=" py-6 px-12 rounded-2xl">
      <h1>Graphs</h1>


      <select value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)}>
    {groupedStatOptions.map((group, groupIdx) => (
      <optgroup key={groupIdx} label={group.name}>
        {group.stats.map(({value, name}, statIdx) => (
          <option key={statIdx} value={value}>
            {name}
          </option>
        ))}
      </optgroup>
    ))}
  </select>


      <NestedPie teamAvg={teamAvg} selectedStat={stat} />
    </div>
  );
}

export default Graphs



const groupedStatOptions = [
  {
    name: "Damage Dealt",
    stats: [
      {value: "damageDealtToBuildings__avg", name :"Damage Dealt To Buildings" },
      {value: "damageDealtToObjectives__avg", name: "Damage Dealt To Objectives"},
      {value: "damageDealtToTurrets__avg", name: "Damage Dealt To Turrets"},
    ]
  },
  {
    name: "Damage Taken",
    stats: [
      {value: "damageSelfMitigated__avg", name: "Damage Self Mitigated"},
      {value: "magicDamageTaken__avg", name: "Magic Damage Taken"},
      {value: "physicalDamageTaken__avg", name: "Physical Damage Taken"},
      {value: "trueDamageTaken__avg", name: "True Damage Taken"},
    ]
  },
  {
    name: "Damage Dealt To Champions",
    stats: [
      {value: "magicDamageDealtToChampions__avg", name: "Magic Damage Dealt To Champions"},
      {value: "physicalDamageDealtToChampions__avg", name: "Physical Damage Dealt To Champions"},
      {value: "trueDamageDealtToChampions__avg", name: "True Damage Dealt To Champions"},
    ]
  },
  {
    name: "Healing and Shielding",
    stats: [
      {value: "totalHeal__avg", name: "Total Heal"},
      {value: "totalHealsOnTeammates__avg", name: "Total Heals On Teammates"},
      {value: "totalDamageShieldedOnTeammates__avg", name: "Total Damage Shielded On Teammates"},
    ]
  },
  {
    name: "Crowd Control",
    stats: [
      {value: "timeCCingOthers__avg", name: "Time CCing Others"},
      {value: "totalTimeCCDealt__avg", name: "Total Time CC Dealt"},
    ]
  },
];