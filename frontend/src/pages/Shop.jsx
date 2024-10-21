import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import Message from "../components/Message";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (categoriesQuery.isSuccess) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (filteredProductsQuery.isSuccess) {
        const filteredProducts = filteredProductsQuery.data.filter((product) => {
          const priceMatch = product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10);
          return priceMatch;
        });
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand);
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = Array.from(new Set(filteredProductsQuery.data?.map((product) => product.brand).filter(Boolean)));

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleResetFilters = () => {
    setPriceFilter("");
    dispatch(setChecked([]));
    dispatch(setProducts(filteredProductsQuery.data)); // Reset to all products
  };

  if (categoriesQuery.isLoading || filteredProductsQuery.isLoading) {
    return <Loader />;
  }

  if (categoriesQuery.isError || filteredProductsQuery.isError) {
    return (
      <Message variant="danger">
        {categoriesQuery.error?.data?.message || "Error loading categories."}
        {filteredProductsQuery.error?.data?.message || "Error loading products."}
      </Message>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <aside className="bg-[#151515] p-3 mt-2 mb-2 w-full md:w-1/4">
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter by Categories</h2>
          <div className="p-5">
            {categories?.map((category) => (
              <div key={category._id} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category._id}`}
                  onChange={(e) => handleCheck(e.target.checked, category._id)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor={`category-${category._id}`} className="ml-2 text-sm font-medium text-white">
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter by Brands</h2>
          <div className="p-5">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center mb-5">
                <input
                  type="radio"
                  id={`brand-${brand}`}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500"
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm font-medium text-white">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter by Price</h2>
          <div className="p-5">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
            />
          </div>

          <div className="p-5 pt-0">
            <button className="w-full border my-4" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </aside>

        <main className="p-3 md:w-3/4">
          <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
          <div className="flex flex-wrap">
            {products.length === 0 ? (
              <Message variant="info">No products found.</Message>
            ) : (
              products?.map((product) => (
                <div className="p-3" key={product._id}>
                  <ProductCard p={product} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
