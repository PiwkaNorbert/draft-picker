import { Suspense, lazy, useEffect, useRef } from 'react'
import  TeamMembers  from '../components/TeamMembers'
import useChampionQuery from '../API/useChampionQuery'
import { useDraft } from '../Utils/hooks/useDraft'
import { useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { DraftObject, TeamAvg } from '../types/util'
import { usePatch } from '../Utils/hooks/usePatch'
import axios, { AxiosResponse } from 'axios'
import '../App.css'

const CharacterCard = lazy(() => import('../components/CharacterCard'))
const Graphs = lazy(() => import('../components/Graphs'))
const TeamBans = lazy(() => import('../components/TeamBans'))
const ChampionSearch = lazy(() => import('../components/ChampionSearch'))

export default function App() {
  const { draft, setDraft, setTeamavg, redPicks, bluePicks } = useDraft()
  const { patch, dataLabel } = usePatch()

  const graphsRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const tags = searchParams.get('tag')?.split(',') || []
  const search = searchParams.get('search') || ''
  const query = { tags, search }

  const championQuery = useChampionQuery(query)

  // Send the draft to the backend
  const { mutate: updateGameAvg } = useMutation<
    AxiosResponse<TeamAvg>,
    unknown,
    DraftObject
  >({
    mutationKey: ['gameAvg', draft],
    mutationFn: () =>
      axios.post(
        `https://ourcraft.pl/game-avg/?patch=${patch}&time_label=${dataLabel}`,
        draft
      ),
    onSuccess: ({ data: teamAvg }) => {
      // for mateusz later
      const blueRecs = teamAvg.blue_recommendation
      const sortedBlueRecs = Object.entries(blueRecs).sort(
        (a, b) => b[1] - a[1]
      )
      const sortedBlueRecsJson = Object.fromEntries(sortedBlueRecs)

      const redRecs = teamAvg.red_recommendation
      const sortedRedRecs = Object.entries(redRecs).sort((a, b) => b[1] - a[1])
      const sortedRedRecsJson = Object.fromEntries(sortedRedRecs)
      console.log({ sortedBlueRecsJson, sortedRedRecsJson })

      setTeamavg(teamAvg)
    },
    onSettled: () => {
      if (graphsRef.current) {
        // graphsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
  })

  // Update the game average when the draft is filled
  useEffect(() => {
    if (draft) {
      updateGameAvg(draft)
    }
  }, [patch, draft, updateGameAvg, setTeamavg]) // This will trigger the effect whenever `patch` changes

  // fill the next null slot in the draft with the clicked champion
  function fillNextNull(clicked_champ: string, currentDraft: DraftObject) {
    for (const [key, value] of Object.entries(currentDraft)) {
      if (value === null) {
        const newDraft = {
          ...currentDraft,
          [key]: clicked_champ,
        }

        setDraft(newDraft)
        if (
          (redPicks && redPicks[0] !== null) ||
          (bluePicks && bluePicks[0] !== null)
        ) {
          updateGameAvg(newDraft, {
            onSuccess: (data) => {
              const { data: teamAvg } = data
              setTeamavg(teamAvg)
            },
          })
        }
        break
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
        }
        setDraft(newDraft)

        updateGameAvg(newDraft, {
          onSuccess: (data) => {
            const { data: teamAvg } = data
            setTeamavg(teamAvg)
          },
        })
        break
      }
    }
  }


  return (
    <>
      <div className="mx-auto min-h-screen snap-start">
        <Suspense
          fallback={
            <div className="mx-auto flex w-full flex-col justify-between gap-2 lg:flex-row"></div>
          }
        >
          <TeamBans />
        </Suspense>
        <section className="flex justify-between pt-10 lg:gap-4">
          <TeamMembers />

          <div className="order-2 grid w-fit place-items-center">
            <Suspense
              fallback={
                <div className="mx-auto mb-10 flex max-w-[613px] flex-col items-center justify-center gap-2 px-[18px] lg:flex-row">
                  Loading...
                </div>
              }
            >
              <ChampionSearch />
            </Suspense>

            <div className=" mx-auto h-[544px]  w-full flex-grow basis-0 overflow-x-clip overflow-y-scroll px-[18px]">
              <div className="grid w-full grid-cols-2 items-start justify-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:items-center min-[1100px]:grid-cols-6 ">
                <Suspense
                  fallback={
                    <div className="col-span-full w-full">
                      <div className=" mx-auto h-[544px] w-full flex-grow basis-0 overflow-x-clip overflow-y-scroll px-[18px]">
                        Loading...
                      </div>
                    </div>
                  }
                >
                  {championQuery.isError ? (
                    <p className="col-span-full w-full">{championQuery.error?.message}</p>

                  ) : championQuery.isSuccess && championQuery.data  && Object.keys(championQuery.data.data).length === 0 ? (
                    <div className="col-span-full w-full">
                      No champions found
                    </div>
                  ) : (
                    championQuery.data && Object.entries(championQuery.data.data).map(([championName, champion], index) => {
                      champion.championName = championName;
                      return (
                        <CharacterCard
                          key={index}
                          character={champion}
                          version={championQuery.data.version}
                          fillNextNull={fillNextNull}
                          removeFromDraft={removeFromDraft}
                        />
                      )
                    })
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        className=" flex min-h-screen snap-start flex-col bg-white p-10 px-20"
        ref={graphsRef}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Graphs />
        </Suspense>
      </section>
    </>
  )
}

