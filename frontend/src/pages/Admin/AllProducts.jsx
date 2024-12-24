import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 p-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">All Products ({products.length})</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block bg-white shadow-lg hover:shadow-2xl rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                      <h5 className="text-lg font-bold text-gray-900 mb-2">
                        {product.name}
                      </h5>
                      <p className="text-gray-500 text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between items-center">
                        <p className="text-gray-700 font-semibold">₹ {product.price}</p>
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg text-sm px-3 py-2 inline-flex items-center"
                        >
                          Update Product
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14M12 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:w-1/4 p-3 mt-6 md:mt-0">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
