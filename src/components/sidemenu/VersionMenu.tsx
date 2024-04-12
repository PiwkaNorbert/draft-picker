import useVersions from '../../API/usePatches';
import { usePatch } from '../../Utils/hooks/usePatch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

export const VersionMenu = () => {
  const { data, isLoading, error } = useVersions();
  const { setPatch } = usePatch();

  if (isLoading) {
    return <div className="mt-auto">Loading...</div>;
  }
  if (error) {
    return <div className="mt-auto">Error fetching versions</div>;
  }

  return (
    <Select
      onValueChange={(e) => {
        setPatch(e);
      }}
    >
      <SelectTrigger className="mt-auto w-full bg-[#252528] min-w-0">
        <SelectValue placeholder="Patch" />
      </SelectTrigger>
      <SelectContent>
        {data.length > 0 ? (
          data.map((patch: string) => (
            <SelectItem
              onChange={() => {
                console.log(patch);
              }}
              key={patch}
              value={patch}
            >
              {patch}
            </SelectItem>
          ))
        ) : (
          <SelectItem
            onChange={() => {
              console.log('Recent');
            }}
            key="Recent"
            value="Recent"
          >
            Recent
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
