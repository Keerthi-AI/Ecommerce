const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto transform transition duration-500 hover:scale-105">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="categoryName" className="block text-lg font-semibold text-gray-800">
          Category Name
        </label>
        <input
          id="categoryName"
          type="text"
          className="py-3 px-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
