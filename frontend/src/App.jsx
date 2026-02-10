import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import IA from "./pages/IA.jsx"
import PlanningACM from "./pages/PlanningACM.jsx"
import PlanningVacances from "./pages/PlanningVacances.jsx"
import Activities from "./pages/Activities";
import Materials from "./pages/Materials.jsx";
import WeatherWidget from "./components/dashboard/WeatherWidget";
import Users from "./pages/Users";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./services/authService";
import Profile from "./pages/Profile";



export default function App() {
  return (
    <Layout>
        <Routes>
          <Route path="/profil"element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/users"element={<ProtectedRoute roles={["admin"]}><Users /></ProtectedRoute>}/>
          <Route path="/" element={ <ProtectedRoute> <DashboardAnimateur /></ProtectedRoute>} />
          <Route path="/materiel" element={ <ProtectedRoute roles={["directeur", "admin"]}><Materials /></ProtectedRoute>} />
          <Route path="/planning-acm" element={ <ProtectedRoute roles={["animateur",  "admin"]}><PlanningACM /></ProtectedRoute>} />
          <Route path="/planning-vacances" element={ <ProtectedRoute roles={["animateur", "admin"]}><PlanningVacances /></ProtectedRoute>} />
          <Route path="/ia" element={ <ProtectedRoute roles={["animateur",  "admin"]}><IA /></ProtectedRoute>} />
          <Route path="/activites" element={ <ProtectedRoute roles={["animateur", "admin"]}><Activities /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Layout>
  );
}
// Pages (provisoires pour l'instant)
function DashboardAnimateur() {
  const navigate = useNavigate();
  const user = getCurrentUser();


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Bonjour 👋</h1>

      <p className="text-gray-600">
        Bienvenue sur Acti-IA — votre assistant d’animation intelligent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 bg-white shadow-sm border rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Date</div>
          <div className="text-lg font-semibold">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>

        <div className="p-4 bg-white shadow-sm border rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Centre</div>
          <div className="text-lg font-semibold">
            {user?.center || "Non renseigné"}
          </div>
        </div>


        <div className="p-4 bg-white shadow-sm border rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Météo</div>
            <div className="text-lg font-semibold">
              <WeatherWidget />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Matériel disponible</h2>
          <p className="text-gray-600 text-sm">
            Consultez et gérez le matériel du centre.
          </p>
          <button
  onClick={() => navigate("/materiel")}
  className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Accéder
</button>

        </div>

        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Créer une activité</h2>
          <p className="text-gray-600 text-sm">
            Génération d’activités adaptée aux groupes & au matériel.
          </p>
         <button
  onClick={() => navigate("/ia")}
  className="mt-3 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
>
  Créer via IA
</button>

        </div>

      </div>
    </div>
  );
}



