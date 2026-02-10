import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

/**
 * @param {ReactNode} children
 * @param {Array<string>} roles (optionnel)
 */
export default function ProtectedRoute({ children, roles }) {
  const user = getCurrentUser();

  // ❌ Pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Pas de restriction de rôle
  if (!roles || roles.length === 0) {
    return children;
  }

  // ❌ Rôle interdit
  if (!roles.includes(user.role)) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-600">Accès refusé</h1>
        <p className="text-gray-600 mt-2">
          Vous n’avez pas les droits nécessaires pour accéder à cette page.
        </p>
      </div>
    );
  }

  // ✅ Autorisé
  return children;
}
