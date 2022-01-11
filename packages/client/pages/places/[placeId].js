import Router from "next/router";

const PlaceShow = ({ place }) => {

  const callPageNewMenu = () => {
    Router.push('/places/[placeId]/menus/new', `/places/${place.id}/menus/new`);
  }

  const menus = place.menus.map(menu => {
    return (
      <div className="card mb-3" key={menu.id}>
        <div className="card-header">
          <h5 className="mb-0">
            <a href={`/places/${place.id}/menus/${menu.id}`}>{menu.name}</a>
          </h5>
        </div>
        <div className="card-body">
          <p className="card-text">Descrição</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1>{place.name}</h1>
      {menus}
      <button className="btn btn-primary" onClick={() => callPageNewMenu()}>New Menu</button>
    </div>
  );
}

PlaceShow.getInitialProps = async (context, client) => {
  const { placeId } = context.query;
  const { data } = await client.get(`/api/places/${placeId}`);
  return { place: data };
}

export default PlaceShow;