import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const { _id, image, name, price, description } = product;

  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative shadow-md rounded-lg transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-[20rem] object-cover rounded-lg"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${_id}`}>
          <h2 className="flex justify-between items-center mb-2">
            <div className="text-lg font-semibold">{name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹ {price}
            </span>
          </h2>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      </div>
    </div>
  );
};

export default Product;
