import useTeamAvgQuery from "../API/useTeamAvgQuery";

export default function Graphs(onChange: any) {
  const { data, isLoading, isError } = useTeamAvgQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching champions</div>;
  }

  return (
    <div>
      <h1>Graphs</h1>
    </div>
  );
}
