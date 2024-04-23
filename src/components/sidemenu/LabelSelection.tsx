import { usePatch } from '../../Utils/hooks/usePatch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';


const timeRanges = [
    'all',
    '15-25',
    '25-35',
    '35+',
]

export const LabelSelection = () => {
  const { setDataLabel } = usePatch();

  return (
    <Select
      onValueChange={(e) => {
        setDataLabel(e);
      }}
    >
      <SelectTrigger className=" bg-[#252528] min-w-0 ">
        <SelectValue placeholder="Match length" />
      </SelectTrigger>
      <SelectContent>
        {timeRanges.map((label: string) => (
            <SelectItem
              onChange={() => {
                console.log(label);
              }}
              key={label}
              value={label}
            >
              {label}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  );
};
