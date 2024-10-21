import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserRow = ({ user, editableUserId, setEditableUserId, setEditableUserName, setEditableUserEmail, deleteHandler, updateHandler }) => {
  const isEditing = editableUserId === user._id;

  return (
    <tr key={user._id}>
      <td className="px-4 py-2">{user._id}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editableUserName}
              onChange={(e) => setEditableUserName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              aria-label="Edit Username"
            />
            <button
              onClick={() => updateHandler(user._id)}
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
              aria-label="Save Changes"
            >
              <FaCheck />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {user.username}
            <button
              onClick={() => {
                setEditableUserId(user._id);
                setEditableUserName(user.username);
                setEditableUserEmail(user.email);
              }}
              aria-label="Edit Username"
            >
              <FaEdit className="ml-[1rem]" />
            </button>
          </div>
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editableUserEmail}
              onChange={(e) => setEditableUserEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              aria-label="Edit Email"
            />
            <button
              onClick={() => updateHandler(user._id)}
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
              aria-label="Save Changes"
            >
              <FaCheck />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <button
              onClick={() => {
                setEditableUserId(user._id);
                setEditableUserName(user.username);
                setEditableUserEmail(user.email);
              }}
              aria-label="Edit Email"
            >
              <FaEdit className="ml-[1rem]" />
            </button>
          </div>
        )}
      </td>
      <td className="px-4 py-2">
        {user.isAdmin ? (
          <FaCheck style={{ color: "green" }} />
        ) : (
          <FaTimes style={{ color: "red" }} />
        )}
      </td>
      <td className="px-4 py-2">
        {!user.isAdmin && (
          <div className="flex">
            <button
              onClick={() => deleteHandler(user._id)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              aria-label="Delete User"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap(); // unwrap to access the response directly
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({ userId: id, username: editableUserName, email: editableUserEmail }).unwrap();
      setEditableUserId(null);
      toast.success("User updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <div className="flex flex-col md:flex-row">
        <table className="w-full md:w-4/5 mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">NAME</th>
              <th className="px-4 py-2 text-left">EMAIL</th>
              <th className="px-4 py-2 text-left">ADMIN</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                editableUserId={editableUserId}
                setEditableUserId={setEditableUserId}
                setEditableUserName={setEditableUserName}
                setEditableUserEmail={setEditableUserEmail}
                deleteHandler={deleteHandler}
                updateHandler={updateHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
