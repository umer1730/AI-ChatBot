import { supabase } from "./supabase";

// Create New Conversation
export async function createConversation(userId) {
  const { data, error } = await supabase
    .from("conversations")
    .insert([
      {
        user_id: userId,
        title: "New Chat",
      },
    ])
    .select()
    .single();

  console.log("CREATE DATA:", data);
  console.log("CREATE ERROR:", error);

  if (error) throw error;

  return data;
}

// Get All Conversations
export async function getConversations(userId) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) throw error;

  return data;
}

/* update conversation */
export async function updateConversationTitle(id,title){
  const {data,error} = await supabase
    .from("conversations")
    .update({
      title,
    })
    .eq("id",id)
    .select()
    .single()
  
    if (error) throw error;
    return data;
}
// Delete Conversation
export async function deleteConversation(id) {
  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Save Message
export async function saveMessage(conversationId, role, content) {

  console.log("Conversation ID:", conversationId);
  console.log("Role:", role);
  console.log("Content:", content);

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        conversation_id: conversationId,
        role,
        content,
      },
    ])
    .select();

  console.log("SAVE DATA:", data);
  console.log("SAVE ERROR:", error);

  if (error) throw error;

  return data;
}

// Get Messages
export async function getMessages(conversationId) {

  console.log("Loading Messages For:", conversationId);

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at");

  console.log("MESSAGES:", data);
  console.log("MESSAGES ERROR:", error);

  if (error) throw error;

  return data;
}

export async function renameConversation(id, title){
  const {dataa, error} = await supabase
    .from("conversations")
    .update({title})
    .eq("id", id)
    .select()
    .single();

    if (error) throw error;
    return data;
}