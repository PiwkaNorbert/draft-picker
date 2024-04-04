import "@toast-ui/chart/dist/toastui-chart.min.css";
import NestedPie from "./NestedPie";
import { FC, useEffect, useState } from "react";
import { TeamAvg } from "../types/util";


import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../src/components/ui/carousel";


const Graphs: FC<{ teamAvg: TeamAvg | null }> = ({ teamAvg }) => {

  const [api, setApi] = useState<CarouselApi>()
  const [title, setTitle] = useState(groupedStatOptions[0].name); // Add this line

  
  useEffect(() => {
    if (!api) {
      return
    }
 
    api.on("select", () => {
      const selectedIdx = api.selectedScrollSnap();
      const newTitle = groupedStatOptions[selectedIdx].name
      setTitle(newTitle);
      
    })
  }, [api])
  
  return (
    <div className=" py-6 px-12 rounded-2xl flex flex-col gap-y-4 container">
      <h1>{title}</h1>

        <Carousel
          opts={{
            loop: true,
          }}
          setApi={setApi}
          className="max-w-screen-xl place-self-center">
          <CarouselContent>
          {groupedStatOptions.map((group, groupIdx) => (
            <CarouselItem key={groupIdx} className=" p-2 py-9 wrap max-w-full">
              <div className="grid grid-cols-6 gap-4 px-4 place-items-center">

              {group.stats.map((stat, idx) => {
                const gridClasses = {
                  default: '',
                  lastInRowOfThree: 'col-start-3',
                  fourthInRowOfFive: 'col-start-2',
                  fifthInRowOfFive: 'col-start-4',
                };
              
                let gridClass = gridClasses.default;
                const groupLenth = group.stats.length;

                if (groupLenth % 3 === 1 && idx === groupLenth - 1) {
                  gridClass = gridClasses.lastInRowOfThree;
                }
                if (groupLenth === 5 && idx === groupLenth - 2) {
                  gridClass = gridClasses.fourthInRowOfFive;
                }
                if (groupLenth === 5 && idx === groupLenth - 1) {
                  gridClass = gridClasses.fifthInRowOfFive;
                }


                return (
                  <NestedPie key={idx} className={gridClass} teamAvg={teamAvg} selectedStat={stat.value} title={stat.name} />
                );
              })}
                </div>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
    </div>
  );
}

export default Graphs



const groupedStatOptions = [
  {
    name: "Damage Dealt - Type",
    stats: [
      {value: "magicDamageDealt", name: "Magic Damage Dealt"},
      {value: "physicalDamageDealt", name: "Physical Damage Dealt"},
      {value: "trueDamageDealt", name: "True Damage Dealt"},
      {value: "totalDamageDealt", name: "Total Damage Dealt"},

    ]
  },
  {
    name: "Damage Dealt - Target",
    stats: [
      {value: "damageDealtToBuildings", name: "Damage Dealt To Buildings"},
      {value: "damageDealtToObjectives", name: "Damage Dealt To Objectives"},
      {value: "damageDealtToTurrets", name: "Damage Dealt To Turrets"},
    ]
  },
  {
    name: "Damage Taken",
    stats: [
      {value: "damageSelfMitigated", name: "Damage Self Mitigated"},
      {value: "magicDamageTaken", name: "Magic Damage Taken"},
      {value: "physicalDamageTaken", name: "Physical Damage Taken"},
      {value: "totalDamageTaken", name: "Total Damage Taken"},
      {value: "trueDamageTaken", name: "True Damage Taken"},
    ]
  },
  {
    name: "Damage Dealt To Champions",
    stats: [
      {value: "magicDamageDealtToChampions", name: "Magic Damage Dealt To Champions"},
      {value: "physicalDamageDealtToChampions", name: "Physical Damage Dealt To Champions"},
      {value: "totalDamageDealtToChampions", name: "Total Damage Dealt To Champions"},
      {value: "trueDamageDealtToChampions", name: "True Damage Dealt To Champions"},
    ]
  },
  {
    name: "Healing and Shielding",
    stats: [
      {value: "totalHeal", name: "Total Heal"},
      {value: "totalHealsOnTeammates", name: "Total Heals On Teammates"},
      {value: "totalDamageShieldedOnTeammates", name: "Total Damage Shielded On Teammates"},
    ]
  },
  {
    name: "Crowd Control",
    stats: [
      {value: "timeCCingOthers", name: "Time CCing Others"},
      {value: "totalTimeCCDealt", name: "Total Time CC Dealt"},
    ]
  },
  {
    name: "Gold",
    stats: [
      {value: "goldEarned", name: "Gold Earned"},
      {value: "goldSpent", name: "Gold Spent"},
    ]
  },
  {
    name: "Minions and Monsters",
    stats: [
      {value: "totalMinionsKilled", name: "Total Minions Killed"},
      {value: "neutralMinionsKilled", name: "Neutral Minions Killed"},
    ]
  },
  {
    name: "Vision",
    stats: [
      {value: "wardsPlaced", name: "Wards Placed"},
      {value: "visionWardsBoughtInGame", name: "Vision Wards Bought In Game"},
      {value: "wardsKilled", name: "Wards Killed"},
      {value: "visionScore", name: "Vision Score"},
    ]
  },
];