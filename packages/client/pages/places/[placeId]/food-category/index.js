import Router from 'next/router';

const IndexFoodCategory = ({ foodCategories, placeId }) => {

  const callPageNewCategory = () => {
    Router.push('/places/[placeId]/food-category/new', `/places/${placeId}/food-category/new`);
  }

  const foodCategoriesList = foodCategories.map(foodCategory => {
    return (
      <div className="card mb-3" key={foodCategory.id}>
        <div className="card-header">
          <h5 className="mb-0">
            <a href={`/places/${placeId}/food-category/${foodCategory.id}`}>{foodCategory.name}</a>
          </h5>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1>Categories</h1>
      {foodCategoriesList}
      <button className="btn btn-primary" onClick={() => callPageNewCategory()}>New Category</button>
    </div>
  );
};

IndexFoodCategory.getInitialProps = async (context, client, currentUser) => {
  const { placeId } = context.query;
  const { data } = await client.get(`/api/places/${placeId}/food-category`);
  console.log(data);
  return { foodCategories: data, placeId };
}

export default IndexFoodCategory;