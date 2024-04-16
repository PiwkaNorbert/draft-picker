import { useDraft } from '../Utils/hooks/useDraft';
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


  return (
    <div
      id={character.name}
      className={`justify-self-center relative w-[5rem] flex flex-col items-center gap-1 group cursor-pointer  hover:text-selected`}
      onClick={() => {
        if (disableCharacter) return;
        fillNextNull(character.id, draft);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        removeFromDraft(character.id, draft);
      }}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${character.id}.png`}
        className={`w-full aspect-square rounded-lg border-2 group-hover:border-6  group-hover:border-selected ${
          disableCharacter ? "opacity-50 " : ""
        }`}
        width={76}
        height={76}
        alt={character.name}
        // loading={index < 24 ? "eager" : "lazy"}
        loading={'lazy'}
      />
      <div
        className={`absolute w-[5rem] h-[76px] ${
          disableCharacter ? " rounded-lg opacity-30" : ""
        }
        ${characterInRed ? "bg-red-400 text-red-400" : characterInBlue ? "bg-blue-400 text-blue-400" : ""}
        
        `}
      />
      <p
        className={`whitespace-nowrap ${disableCharacter ? "opacity-50 " : ""}`}
      >
        {character.name}
      </p>
    </div>
  );
}
