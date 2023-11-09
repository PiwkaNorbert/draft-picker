export function CharacterCard({ character, version, fill_next_null, draft }) {
  const isCharacterDisabled = (champion: Champion) => {
    for (const [_, value] of Object.entries(draft)) {
      if (value === champion.championName) {
        return true;
      }
    }
    return false;
  };
  const disableCharacter = isCharacterDisabled(character);

  return (
    <div
      id={character.name}
      className={`justify-self-center w-[5rem] flex flex-col items-center gap-1 group cursor-pointer  hover:text-selected ${
        disableCharacter ? "opacity-50 " : ""
      }`}
      onClick={() => {
        if (disableCharacter) return;
        fill_next_null(character.id, draft);
      }}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${character.id}.png`}
        className="w-full aspect-square rounded-lg border-2 group-hover:border-6  group-hover:border-selected"
        width={76}
        height={76}
        alt={character.name}
      />
      <p className="whitespace-nowrap">{character.name}</p>
    </div>
  );
}
