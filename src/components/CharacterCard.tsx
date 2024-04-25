import { useDraft } from '../Utils/hooks/useDraft';
import { cn } from '../lib/utils';
import { Champion } from "../types";
import { DraftObject } from "../types/util";

interface CharacterCardProps {
  character: Champion;
  version: string;
  fillNextNull: (id: string, draft: DraftObject) => void;
  removeFromDraft: (id: string, draft: DraftObject) => void;
}

export default function CharacterCard({
  character,
  version,
  fillNextNull,
  removeFromDraft,
}: CharacterCardProps): React.ReactElement {
  const { redPicks, bluePicks, redBans, blueBans, draft } = useDraft()

  const isCharacterInRed = (champion: Champion) => {
      return redPicks.includes(champion.id) || redBans.includes(champion.id);
  };

  const isCharacterInBlue = (champion: Champion) => {
      return bluePicks.includes(champion.id) || blueBans.includes(champion.id);
  };

  const isCharacterDisabled = (champion: Champion) => {
      return redPicks.includes(champion.id) || redBans.includes(champion.id) || bluePicks.includes(champion.id) || blueBans.includes(champion.id);
  }

  const characterInRed = isCharacterInRed(character);
  const characterInBlue = isCharacterInBlue(character);
  const disableCharacter = isCharacterDisabled(character);
  const isDraftFull = Object.values(draft).every((champ) => champ !== null);


  return (
    <div
      id={character.name}
      className="justify-self-center w-full lg:w-20 flex flex-col items-center gap-1 group  hover:text-selected"
      onClick={() => {
        if (disableCharacter) {
          return removeFromDraft(character.id, draft);
        }
        fillNextNull(character.id, draft);
      }}
    >
      <div className='relative w-full h-full aspect-square rounded-lg border-2 group-hover:border-6 group-hover:border-selected'>

        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${character.id}.png`}
          className="max-w-full max-h-full rounded-md"
          width={150}
          height={150}
          alt={character.name}
          loading={'lazy'}
        />
        <div
          className={cn("absolute inset-0 cursor-pointer ",
          isDraftFull ? "bg-gray-400 opacity-80 cursor-default pointer-events-none" : "",
          characterInRed ? "!bg-red-400  !opacity-30" : 
          characterInBlue ? "!bg-blue-400 !opacity-30" : "",
          //  disableCharacter ? " rounded-lg opacity-30" : "",
          )}
        />
      </div>

      <p
        className={cn("whitespace-nowrap text-pretty lg:text-nowrap text-xs min-[500px]:text-sm md:text-base",
          isDraftFull ? "text-gray-800 opacity-80 cursor-default pointer-events-none" : "",
          characterInRed ? "!text-red-400 " : 
          characterInBlue ? "!text-blue-400 " : "",
        )}
      >
        {character.name}
      </p>
    </div>
  );
}
