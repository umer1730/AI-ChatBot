import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          AI Chat Bot
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Create your account 
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white">
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p className="text-center mt-5 text-gray-400">
          Already have an account?
          <Link
            to="/"
            className="text-blue-500 ml-2">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;