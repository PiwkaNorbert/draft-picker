import "@toast-ui/chart/dist/toastui-chart.min.css";
import NestedPie from "./graphs/NestedPie";
import { FC, useEffect, useState } from "react";


import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../src/components/ui/carousel";
import { groupedStatOptions } from "../constants";


const Graphs: FC = () => {

  const [api, setApi] = useState<CarouselApi>()
  const [title, setTitle] = useState(groupedStatOptions[0].name); // Add this line
  const [selectedIdx, setSelectedIdx] = useState(0); // Add this line
  
  useEffect(() => {
    if (!api) {
      return
    }
 
    api.on("select", () => {
      const selectedIdx = api.selectedScrollSnap();
      const newTitle = groupedStatOptions[selectedIdx].name
      setTitle(newTitle);
      setSelectedIdx(selectedIdx); // Update the selected index
    })
  }, [api])
  
  return (
    <div className=" py-6 px-12 rounded-2xl flex flex-col gap-y-4 container h-full">
      <h1>{title}</h1>

        <Carousel
          opts={{
            loop: true,
          }}
          setApi={setApi}
          className="max-w-screen-xl place-self-center h-full">
          <CarouselContent>
          {groupedStatOptions.map((group, groupIdx) => (
            <CarouselItem key={groupIdx} className=" p-2 py-9 wrap max-w-full h-full cursor-pointer hover:bg-opacity-90">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 px-4 place-items-center">

              {groupIdx === selectedIdx && group.stats.map((stat, idx) => {
                const gridClasses = {
                  default: '',
                  lastInRowOfThree: 'lg:col-start-3',
                  fourthInRowOfFive: 'lg:col-start-2',
                  fifthInRowOfFive: 'lg:col-start-4',
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
                  <NestedPie key={idx} className={gridClass} selectedStat={stat.value} title={stat.name} />
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



