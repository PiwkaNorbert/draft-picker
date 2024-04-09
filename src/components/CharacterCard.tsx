import { useMutation } from "@tanstack/react-query";
import { useDraft } from "../Utils/providers/DraftProvider";
import { Champion } from "../types";
import axios from "axios";
import { DraftObject } from "../types/util";
import { usePatch } from "../Utils/providers/PatchProvider";
import { useEffect } from "react";

export function CharacterCard({
  character,
  version,
}) {
  const { redPicks, bluePicks, redBans, blueBans, draft, setDraft, setTeamavg } = useDraft()

  
    const { patch  } = usePatch();

    const sendDraftMutation = useMutation((data) => {
      return axios.post(`http://192.168.15.220:8000/game-avg/?patch=${patch}`, data);
    });
    const { mutate: updateGameAvg } = sendDraftMutation;

    useEffect(() => {
      if (draft) {
        updateGameAvg(draft, {
          onSuccess: (data) => {
            const { data: teamAvg } = data;
            setTeamavg(teamAvg);
          },
        });
      }
    }, [patch]); // This will trigger the effect whenever `patch` changes
  
  
    function fill_next_null(clicked_champ: string, currentDraft: DraftObject) {
      for (const [key, value] of Object.entries(currentDraft)) {
        if (value === null) {
  
          const newDraft = {
            ...currentDraft,
            [key]: clicked_champ,
          };
  
          setDraft(newDraft);
          if (
            (redPicks && redPicks[0] !== null) ||
            (bluePicks && bluePicks[0] !== null)
          ) {
            updateGameAvg(newDraft, {
              onSuccess: (data) => {
                const { data: teamAvg } = data;
                setTeamavg(teamAvg);
              },
            });
          }
          break;
        }
      }
    }
  
      // on right click check the draft and if the champion is in the draft then remove it from the draft
      function removeFromDraft(clicked_champ: string, currentDraft: DraftObject) {
        for (const [key, value] of Object.entries(currentDraft)) {
          if (value === clicked_champ) {
            const newDraft = {
              ...currentDraft,
              [key]: null,
            };
            setDraft(newDraft);
    
            updateGameAvg(newDraft, {
              onSuccess: (data) => {
                const { data: teamAvg } = data;
                setTeamavg(teamAvg);
              },
            });
            break;
          }
        }
      }


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
        // loading={index < 24 ? "eager" : "lazy"}
        loading={"eager"}
      />
      {patch}
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
