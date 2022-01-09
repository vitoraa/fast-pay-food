import Router from "next/router";
import useRequest from "../../hooks/use-request";

const PlaceShow = ({ place }) => {

  return (
    <div>
      <h1>{place.name}</h1>
    </div>
  );
}

PlaceShow.getInitialProps = async (context, client) => {
  const { placeId } = context.query;
  const { data } = await client.get(`/api/places/${placeId}`);
  return { place: data };
}

export default PlaceShow;