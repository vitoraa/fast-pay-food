import Link from 'next/link';
const index = ({ currentUser, places }) => {
  const placeList = places.map(place => (
    <tr key={place.id}>
      <td>
        <Link href="/places/[placeId]" as={`/places/${place.id}`}>
          <a>{place.name}</a>
        </Link>
      </td>
      <td>{place.address}</td>
      <td>{place.type}</td>
    </tr>
  ));
  return (
    <div>
      <h1>FastPayFood</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {placeList}
        </tbody>
      </table>
    </div>
  )
};

index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/places');

  return { places: data };
}

export default index;