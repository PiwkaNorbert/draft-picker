import { Champion } from "../types";

export function CharacterCard({
  character,
  version,
  fill_next_null,
  draft,
  removeFromDraft,
}) {
  const isCharacterDisabled = (champion: Champion) => {
    for (const [_, value] of Object.entries(draft)) {
      if (value === champion.id) {
        return true;
      }
    }
    return false;
  };

  const disableCharacter = isCharacterDisabled(character);

  return (
    <div
      id={character.name}
      className={`justify-self-center relative w-[5rem] flex flex-col items-center gap-1 group cursor-pointer  hover:text-selected`}
      onClick={() => {
        if (disableCharacter) return;
        fill_next_null(character.id, draft);
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
        loading="lazy"
      />
      <div
        className={`absolute w-[5rem] h-[76px] ${
          disableCharacter ? "bg-blue-300 rounded-lg opacity-30" : ""
        }`}
      />
      <p
        className={`whitespace-nowrap ${disableCharacter ? "opacity-50 " : ""}`}
      >
        {character.name}
      </p>
    </div>
  );
}
