import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
        await api.post("/auth/signup", form);
        alert("Signup successful!");
        navigate("/login");
    } catch (err) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Signup</h2>

        <input
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
            type="password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
            type="submit"
            onClick={submit}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
            Signup
        </button>
    </div>
  );
}




