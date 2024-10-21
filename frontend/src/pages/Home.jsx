import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <Message variant="danger">
          {isError?.data?.message || "An error occurred. Please try again later."}
        </Message>
      );
    }

    return (
      <div className="flex justify-center flex-wrap mt-4">
        {data.products.length === 0 ? (
          <Message variant="info">No products found.</Message>
        ) : (
          data.products.map((product) => (
            <div key={product._id} className="m-2">
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <>
      {!keyword && <Header />}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-3xl font-bold">Special Products</h1>
          <Link
            to="/shop"
            className="bg-pink-600 text-white font-bold rounded-full py-2 px-10"
            aria-label="Go to shop"
          >
            Shop
          </Link>
        </div>

        {/* Render content based on loading and error states */}
        {renderContent()}
      </div>
    </>
  );
};

export default Home;
