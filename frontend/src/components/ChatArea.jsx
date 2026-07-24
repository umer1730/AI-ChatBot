import ChatBox from "./ChatBox";

function ChatArea({ currentConversation, user,refreshChats,darkMode }) {
  return (
    <div className={`flex-1 h-screen flex flex-col ${
      darkMode
        ? "bg-slate-900 text-white"
        : "bg-gray-100 text-black"
    }`}>

      <div className="border-b border-slate-700 p-5">
        <h1 className="text-3xl font-bold">
          AI Chat Bot
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <ChatBox
          currentConversation={currentConversation}
          user={user}
          refreshChats = {refreshChats}
          darkMode = {darkMode}
        />
      </div>

    </div>
  );
}

export default ChatArea;