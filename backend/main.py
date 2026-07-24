from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from gemini import generate_response

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str


@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        answer = generate_response(request.prompt)
        return {"response": answer}

    except Exception as e:
        return {
            "response": f"Error: {str(e)}"
        }