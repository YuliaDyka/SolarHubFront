import { useState } from "react";
import { useNavigate } from "react-router";
import { login,  } from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password }); // виклик бекенду
      navigate("/home");
    } catch (err: any){
      setError(err?.message || err?.details?.message || "Невірний email або пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-4">
        
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Вхід у систему
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Введіть свої облікові дані
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label> */}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="email..."
            />
          </div>

          {/* Password */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label> */}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="password..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white
                       hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Вхід..." : "Увійти"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SolarHub
        </div>
      </div>
    </div>
  );
}
