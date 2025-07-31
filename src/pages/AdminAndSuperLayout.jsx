import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminAndSuperNavbar from "../components/AdminAndSuperNavbar";

export function AdminAndSuperLayout() {
  return (
    <>
      <AdminAndSuperNavbar />
      <div className="p-4">
        <ProtectedRoute
          allowedRoles={["superAdmin","admin"]}
        >
          <Outlet /> {/* This will render nested routes */}
        </ProtectedRoute>
      </div>
    </>
  );
}
