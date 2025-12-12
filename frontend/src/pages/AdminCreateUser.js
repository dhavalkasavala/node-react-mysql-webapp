import { useState } from "react";
import api from "../api/axios";

export default function AdminCreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const submit = async () => {
    await api.post("/auth/create-user", form);
    alert("User created successfully");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Admin: Create User</h2>

        <input
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
            type="password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>

        <button
            onClick={submit}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold"
        >
            Create
        </button>
    </div>
  );
}
