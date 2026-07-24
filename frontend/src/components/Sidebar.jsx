import { Plus, MessageSquare, LogOut,Trash2,Pencil,Sun,Moon } from "lucide-react";
import { useState } from "react";
import {Menu, X} from "lucide-react" 

function Sidebar({
  conversations,
  currentConversation,
  setCurrentConversation,
  handleLogout,
  handleNewChat,
  handleDeleteChat,
  handleRenameChat,
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
}) {

  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [search,setSearch] = useState("");

  const filteredChats = conversations.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div
    className={`fixed md:relative z-50 h-screen w-72 transform transition-transform duration-300
    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
    ${
      darkMode
        ? "bg-slate-800 text-white"
        : "bg-white text-black border-r"
    }
    flex flex-col`}>

      <div className="md:hidden flex justify-end p-4">
        <button onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <div className="p-4 border-b border-slate-700">
        <button onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 transition">
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div>
        <input 
        type = "text"
        placeholder="Search Chats"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center justify-between rounded-lg px-3 py-2 mb-2 cursor-pointer ${
              currentConversation?.id === chat.id ? "bg-slate-700" : "hover:bg-slate-700"}`}>
            <div
              onClick={() => setCurrentConversation(chat)}
              className="flex items-center gap-2 flex-1">
              <MessageSquare size={18} />
              {editingId === chat.id ? (
          <input
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRenameChat(chat.id, newTitle);
                setEditingId(null);
              }

              if (e.key === "Escape") {
                setEditingId(null);
              }
            }}
            className="bg-slate-600 px-2 rounded w-full outline-none"
          />
        ) : (
          <span className="truncate">{chat.title}</span>
        )}
      </div>
      
      <div className="flex items-center gap-2">

        <Pencil
          size={16}
          className="text-slate-400 hover:text-yellow-400 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setEditingId(chat.id);
            setNewTitle(chat.title);
          }}
        />

        <Trash2
          size={16}
          className="text-slate-400 hover:text-red-500 cursor-pointer"
          onClick={() => handleDeleteChat(chat.id)}
        />

      </div>
    
    </div>
  ))}
    </div>
    
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 rounded-lg py-3 transition">
        {darkMode ? (
        <>
          <Sun size={18} />
          Light Mode
        </>
        ) : (
        <>
          <Moon size={18} />
          Dark Mode
        </>
        )}
        </button>
      </div>

      <div className="p-4">
        <button onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;