import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Rating from "./Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./Tabs";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Handle responsiveness by checking the window width
  useEffect(() => {
    const handleResize = () => {
      // Your responsive logic here if needed
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Link className="text-white font-semibold hover:underline mb-4" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="flex flex-wrap relative items-start mt-8">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <HeartIcon product={product} />
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 pl-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="my-4 text-gray-600">{product.description}</p>
            <p className="text-5xl my-4 font-extrabold">₹{product.price}</p>
            
            <div className="flex justify-between mb-4">
              <div>
                <h1 className="flex items-center mb-2">
                  <FaStore className="mr-2" /> Brand: {product.brand}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaClock className="mr-2" /> Added: {moment(product.createdAt).fromNow()}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaStar className="mr-2" /> Reviews: {product.numReviews}
                </h1>
              </div>
              <div>
                <h1 className="flex items-center mb-2">
                  <FaStar className="mr-2" /> Ratings: {product.rating}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaBox className="mr-2" /> In Stock: {product.countInStock}
                </h1>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              {product.countInStock > 0 && (
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-2 rounded-lg text-black"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 ${
                product.countInStock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <ProductTabs
          loadingProductReview={loadingProductReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </div>
  );
};

export default Product;
