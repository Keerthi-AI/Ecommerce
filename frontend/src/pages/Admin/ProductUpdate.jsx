import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  
  const { data: productData } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    stock: "",
  });

  // Update form fields when product data changes
  useEffect(() => {
    if (productData) {
      setFormData({
        image: productData.image || "",
        name: productData.name || "",
        description: productData.description || "",
        price: productData.price || "",
        category: productData.category?._id || "",
        quantity: productData.quantity || "",
        brand: productData.brand || "",
        stock: productData.countInStock || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setFormData((prev) => ({ ...prev, image: res.image }));
      toast.success("Image uploaded successfully", { autoClose: 2000 });
    } catch (err) {
      toast.error("Image upload failed. Please try again.", { autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image, name, description, price, category, quantity, brand, stock } = formData;

    try {
      const data = await updateProduct({ productId: params._id, formData }).unwrap();
      toast.success(`Product successfully updated: ${data.name}`, { autoClose: 2000 });
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Product update failed. Try again.", { autoClose: 2000 });
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const { data } = await deleteProduct(params._id).unwrap();
      toast.success(`"${data.name}" is deleted`, { autoClose: 2000 });
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.", { autoClose: 2000 });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h2 className="h-12">Update / Delete Product</h2>

          {formData.image && (
            <div className="text-center">
              <img
                src={formData.image}
                alt="Product"
                className="block mx-auto w-full h-[40%] object-contain"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold">
              {formData.image ? formData.image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
                aria-label="Upload product image"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="two">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label htmlFor="description" className="my-5">
                Description
              </label>
              <textarea
                name="description"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                value={formData.description}
                onChange={handleChange}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="stock">Count In Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
