import Router from "next/router";

const PlaceShow = ({ menu }) => {

  const callPageNewMenu = () => {
    Router.push('/places/[placeId]/menus/new', `/places/${place.id}/menus/new`);
  }

  return (
    <div>
      <h1>{menu.name}</h1>
    </div>
  );
}

PlaceShow.getInitialProps = async (context, client) => {
  const { placeId, menuId } = context.query;
  const { data } = await client.get(`/api/places/${placeId}/menus/${menuId}`);
  return { menu: data };
}

export default PlaceShow;