import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo, loading } = useSelector((state) => state.auth);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Or a custom spinner component
  }

  // Redirect to login if user is not an admin
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
