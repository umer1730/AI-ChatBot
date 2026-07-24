import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 w-full max-w-md rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          AI Chat Bot
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Welcome Back 
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-gray-300">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              placeholder="Enter Email"
              className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              placeholder="Enter Password"
              className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white">
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
        <p className="text-center mt-5 text-gray-400">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-500 ml-2">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;