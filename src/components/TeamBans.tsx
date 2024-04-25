import { Suspense, memo } from 'react'
import { useDraft } from '../Utils/hooks/useDraft'
import { BannedPickSlotProps, TeamBanListProps } from '../types/team-bans'
import useLatestVersionQuery from '../API/useLatestVersionQuery'


const TeamBans = () => {
  const { blueBans, redBans } = useDraft()

  return (
    <div className="mx-auto flex w-full flex-col justify-between gap-2 lg:flex-row">
      <Suspense fallback={<div className='team'></div>}>
        <TeamBanList
          team="blue"
          bans={blueBans}
        />
      </Suspense>
      <Suspense fallback={<div className='team'></div>}>
        <TeamBanList
          team="red"
          bans={redBans}
        />
      </Suspense>

    </div>
  )
}

export default TeamBans

const TeamBanList = memo(({
  team,
  bans,
}: TeamBanListProps) => {
   
  const { handleRightClick } = useDraft()
  const { data, isError } = useLatestVersionQuery()

  const version = data[0] 
  
  return (
    <div className="team">
      <h2>{team === 'blue' ? 'Team 1' : 'Team 2'}</h2>
      <div className="banned-picks">
        {bans.map((bannedPick: string | null, index: number) => (
          <BannedPickSlot
            team={team}
            key={index}
            index={index}
            bannedPick={bannedPick}
            version={ isError ? "14.8.1" : version}
            handleRightClick={handleRightClick}
          />
        ))}
      </div>
    </div>
)})

const BannedPickSlot = memo(({
  bannedPick,
  index,
  version,
  team,
  handleRightClick,
}: BannedPickSlotProps) => {


  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    handleRightClick(index, team, 'ban')
  }

  const imageSource = bannedPick
    ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bannedPick}.png`
    : 'no_champion.png'

  return (
    <div
      key={index + 1}
      className={`banned-pick-slot ${bannedPick ? 'filled' : ''}`}
      onClick={handleClick}
    >
      <img className="w-[7rem] h-[7rem] rounded-lg  object-contain" src={imageSource} alt={bannedPick || 'no-champion'} />
    </div>
  )
})
