import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h2>

        <p className="mb-2 text-gray-700">Welcome, user ID: <span className="font-medium">{user.id}</span></p>
        <p className="mb-6 text-gray-700">Your role: <span className="font-medium">{user.role}</span></p>

        <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
        >
            Logout
        </button>
    </div>
  );
}
