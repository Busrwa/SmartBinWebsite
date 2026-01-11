import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, loading, children }) {
  if (loading) return <div>Loading...</div>; // auth yüklenene kadar bekle
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
