import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConversation,getConversations,deleteConversation,renameConversation } from "../services/chatService";
import { supabase } from "../services/supabase";

import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import {Moon,Sun} from "lucide-react"
import { Menu } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode,setDarkMode] = useState(
    localStorage.getItem("theme") !== "light");
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {

  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  }, [darkMode]);

  async function loadDashboard() {
    try {
      // Current User
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      setUser(user);

      // Load Chats
      let chats = await getConversations(user.id);

      // First Chat
      if (!chats || chats.length === 0) {
        const chat = await createConversation(user.id);

        if (chat) {
          chats = [chat];
        } else {
          chats = [];
        }
      }
      setConversations(chats);

      if (chats.length > 0) {
        setCurrentConversation(chats[0]);
      }
    } 
    catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.details);
      console.log(error.code);
}
    finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  async function handleNewChat() {
  const newChat = await createConversation(user.id);

  const chats = await getConversations(user.id);

  setConversations(chats);

  setCurrentConversation(newChat);
}

  async function handleDeleteChat(chatId){
    try{
      await deleteConversation(chatId);

      const chats = await getConversations(user.id);

      if (chats.length === 0){
        const newChat = await createConversation(user.id);

        setConversations([newChat]);
        setCurrentConversation(newChat);
      }
      else{
        setConversations(chats);
        setCurrentConversation(chats[0])
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async function handleRenameChat(chatId, title) {

  if (!title.trim()) return;

  try {

    await renameConversation(chatId, title);

    const chats = await getConversations(user.id);

    setConversations(chats);

    const updated = chats.find(
      (c) => c.id === chatId
    );

    setCurrentConversation(updated);

  } 
  catch (error) {
    console.log(error);
  }

}

  async function refreshChats() {
    const chats = await getConversations(user.id)

    setConversations(chats)

    const updatedCurrent = chats.find(
      (chat) => chat.id === currentConversation.id
    )

    if(updatedCurrent){
      setCurrentConversation(updatedCurrent);
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-slate-900 text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }


  return (
    <div className={`flex h-screen ${
      darkMode
      ? "bg-slate-900 text-white"
      : "bg-gray-100 text-black"
    }`}>

    <Sidebar
        user={user}
        conversations={conversations}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
        handleLogout={handleLogout}
        handleNewChat={handleNewChat}
        handleDeleteChat ={handleDeleteChat}
        handleRenameChat = {handleRenameChat}
        darkMode = {darkMode}
        setDarkMode = {setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="absolute top-4 left-4 md:hidden z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-slate-700 text-white p-2 rounded-lg">
          <Menu size={24} />
        </button>
      </div>
      
      <ChatArea
        currentConversation={currentConversation}
        user = {user}
        refreshChats = {refreshChats}
        darkMode={darkMode}
      />
    </div>
  );
}

export default Dashboard;