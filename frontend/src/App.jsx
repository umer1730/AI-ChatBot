import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState,useEffect } from "react";
import { supabase } from "./services/supabase";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  const [session,setSession] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(() =>{
    async function getCurrentSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);
    }

    getCurrentSession();

    const{
      data: {subscription},
     } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  },[])

  if(loading) {
    return(
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white text-2x1">
        Loading...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" 
        element={<ProtectedRoute session={session} loading={loading}>
          <Dashboard />
        </ProtectedRoute>
  }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;