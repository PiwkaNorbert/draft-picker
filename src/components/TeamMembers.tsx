

import { Suspense, memo } from 'react'
import { useDraft } from '../Utils/hooks/useDraft'
import useLatestVersionQuery from '../API/useLatestVersionQuery'
import { cn } from '../lib/utils'
import { MemberSlotProps, TeamMemberListProps } from '../types/team-picks'

const TeamMembers = () => {
  const { bluePicks, redPicks } = useDraft()

  return (
    <>
      <Suspense fallback={<div className='team'></div>}>
        <TeamMemberList
          team="blue"
          members={bluePicks}
        />
      </Suspense>
      <Suspense fallback={<div className='team'></div>}>
        <TeamMemberList
          team="red"
          members={redPicks}
        />
      </Suspense>
    </>
  )
}

export default TeamMembers


const TeamMemberList = memo(({
  team,
  members,
}: TeamMemberListProps) => {
   
  const { handleRightClick } = useDraft()
  const { data, isError } = useLatestVersionQuery()

  const version = data[0] 
  
  return (
      <div className={cn("flex flex-col gap-y-2 justify-between lg:justify-normal [&>*:nth-child(3)]:mb-8",
        team === 'blue' ? 'order-1' : 'order-3'
      )}>
        {members.map((member: string | null, index: number) => (
          <MemberSlot
            team={team}
            key={index}
            index={index}
            member={member}
            version={ isError ? "14.8.1" : version}
            handleRightClick={handleRightClick}
          />
        ))}
      </div>
)})



const MemberSlot = memo(({
  member,
  index,
  version,
  team,
  handleRightClick,
}: MemberSlotProps) => {

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    handleRightClick(index, team, 'pick')
  }

  const imageSource = member
    ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${member}.png`
    : 'no_champion.png'

  return (
    <div
      key={index + 1}
      className={cn("team-member-slot relative border-2 bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg  overflow-hidden cursor-pointer",
        member ? 'filled' : '',
        team === 'blue' ? 'border-blue-500 hover:border-selected ' : 'border-red-500 hover:border-selected ',
        
      )}
      onClick={handleClick}
    >
      <img 
        className="w-[7rem] h-[7rem] object-cover"
        width={112}
        height={112} 
        src={imageSource} 
        alt={member || 'no-member'}
      />
    </div>
  )
})