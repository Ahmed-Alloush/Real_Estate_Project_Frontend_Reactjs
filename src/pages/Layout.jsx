import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

export function Layout() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <ProtectedRoute
          allowedRoles={["user", "officeManager"]}
        >
          <Outlet /> {/* This will render nested routes */}
        </ProtectedRoute>
      </div>
    </>
  );
}
