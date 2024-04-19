import { useComparisonList } from "../Utils/hooks/useComparionList";

const Compare = () => {
  const { state } = useComparisonList();
  
 

  return (
    <div>
      wazzup madafaka
      <div className="flex gap-4">

      {state?.map((champion) => (
        <div key={champion.id}>
          <h1>{champion.championName}</h1>
          <p>{champion.win_ratio}</p>
          <p>{champion.sample_size}</p>
          <p>{champion.damageDealtToBuildings}</p>
          <p>{champion.damageDealtToObjectives}</p>
          <p>{champion.damageDealtToTurrets}</p>
          <p>{champion.goldEarned}</p>
          <p>{champion.goldSpent}</p>
          <p>{champion.totalMinionsKilled}</p>
          <p>{champion.neutralMinionsKilled}</p>
          <p>{champion.magicDamageDealt}</p>
          <p>{champion.magicDamageDealtToChampions}</p>
          <p>{champion.magicDamageTaken}</p>
          <p>{champion.physicalDamageDealt}</p>
          <p>{champion.physicalDamageDealtToChampions}</p>
          <p>{champion.physicalDamageTaken}</p>
          <p>{champion.totalDamageDealt}</p>
          <p>{champion.totalDamageDealtToChampions}</p>
          <p>{champion.totalDamageTaken}</p>
          <p>{champion.trueDamageDealt}</p>
          <p>{champion.trueDamageDealtToChampions}</p>
          <p>{champion.trueDamageTaken}</p>
          <p>{champion.damageSelfMitigated}</p>
          <p>{champion.totalHeal}</p>
          <p>{champion.totalHealsOnTeammates}</p>
          <p>{champion.totalDamageShieldedOnTeammates}</p>
          <p>{champion.timeCCingOthers}</p>
          <p>{champion.totalTimeCCDealt}</p>
          <p>{champion.wardsPlaced}</p>
          <p>{champion.visionWardsBoughtInGame}</p>
          <p>{champion.wardsKilled}</p>
          <p>{champion.visionScore}</p>

        </div>
      ))}
      </div>
      
    </div>
  )
}

export default Compare

