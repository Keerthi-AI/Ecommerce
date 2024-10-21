import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-8 lg:block xl:block md:block">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem] mb-4"
                />

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">{name}</h2>
                    <p className="text-pink-500 font-bold text-xl mb-2">₹ {price}</p>
                    <p className="text-gray-400 mb-4">{description.substring(0, 170)}...</p>
                  </div>

                  <div className="flex justify-between mt-auto">
                    <div className="text-gray-300">
                      <h1 className="flex items-center mb-2">
                        <FaStore className="mr-2" /> Brand: <span className="text-white">{brand}</span>
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaClock className="mr-2" /> Added: <span className="text-white">{moment(createdAt).fromNow()}</span>
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2" /> Reviews: <span className="text-white">{numReviews}</span>
                      </h1>
                    </div>

                    <div className="text-gray-300">
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2" /> Ratings: <span className="text-white">{Math.round(rating)}</span>
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaShoppingCart className="mr-2" /> Quantity: <span className="text-white">{quantity}</span>
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaBox className="mr-2" /> In Stock: <span className="text-white">{countInStock}</span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
