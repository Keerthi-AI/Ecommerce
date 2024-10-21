import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  if (!favorites) {
    return <div className="ml-[10rem]">Loading...</div>;
  }

  return (
    <div className="ml-[10rem]">
      <h1 className="text-3xl font-bold ml-[3rem] mt-[3rem] text-gray-800">
        Favorite Products
      </h1>

      {favorites.length === 0 ? (
        <p className="ml-[3rem] mt-[2rem] text-lg text-gray-600">
          You have no favorite products yet!
        </p>
      ) : (
        <div className="flex flex-wrap justify-start mt-4">
          {favorites.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 rounded-lg shadow-lg m-4 p-4 transition-transform duration-200 transform hover:scale-105"
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
  