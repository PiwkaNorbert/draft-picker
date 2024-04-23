import useChampionAvgQuery from '../API/useChampionAvgQuery'
import { usePatch } from '../Utils/hooks/usePatch'
import { useComparisonList } from '../Utils/hooks/useComparionList'
import { ChampionListData } from '../types/chamption-list'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export const ChampionBox = () => {
  const { state, dispatch } = useComparisonList()
  const { patch, dataLabel } = usePatch()
  const { latestVersion } = useChampionAvgQuery(patch, dataLabel)
  const navigate = useNavigate()

  const removeChampion = (champion: ChampionListData) => {
    const championId = champion.id
    dispatch({ type: 'REMOVE_CHAMPION', payload: { id: championId } })
  }

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 rounded-md border border-input bg-[#252528] p-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground empty:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      {state.length > 0 && (
        <>
          {/* create a button for adding a champion that navigates to the championss page */}
          <section className="flex gap-2">
            {state.length <= 4 && (
              <Button
                variant="secondary"
                onClick={() => navigate('/champions')}
                className="relative flex size-20 place-items-center rounded-md bg-background "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                </svg>
              </Button>
            )}
            {/* create a button to navigat to teha compare page */}

            {state.map((champion, index) => (
              <Button
                variant="ghost"
                key={index}
                className={`relative size-20 cursor-pointer p-0 hover:bg-transparent hover:opacity-80`}
                onClick={() => removeChampion(champion)}
              >
                <img
                  className="max-w-full rounded-md"
                  src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.championName}.png`}
                  alt={champion.championName}
                />
              </Button>
            ))}
          </section>

          <section className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate('/compare')}
              className="grow-1 relative h-10 w-full rounded-md p-1"
            >
              Compare
            </Button>
            {/* button to clear the sstate */}
            <Button
              variant="destructive"
              onClick={() => dispatch({ type: 'CLEAR_COMPARISON' })}
              className="relative h-10 w-full max-w-fit rounded-md px-3 py-2"
            >
              Clear
            </Button>
          </section>
        </>
      )}
    </div>
  )
}
