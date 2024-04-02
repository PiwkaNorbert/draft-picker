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
    <div className=" py-6 px-12 rounded-2xl flex flex-col gap-y-10 container">
      <h1>Graphs</h1>
      <h2>{title}</h2>

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