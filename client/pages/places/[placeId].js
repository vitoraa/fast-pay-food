import Router from "next/router";
import useRequest from "../../hooks/use-request";

const PlaceShow = ({ place }) => {

  const callPageNewMenu = () => {
    Router.push('/places/[placeId]/menus/new', `/places/${place.id}/menus/new`);
  }

  return (
    <div>
      <h1>{place.name}</h1>
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