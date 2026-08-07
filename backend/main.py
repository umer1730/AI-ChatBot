from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from gemini import generate_response

app = FastAPI(title="Chat Me")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str


@app.get("/")
def home():
    return {"message": "Welcome to the Backend"}


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        answer = generate_response(request.prompt)
        return {"response": answer}

    except Exception as e:
        return {
            "response": f"Error: {str(e)}"
        }