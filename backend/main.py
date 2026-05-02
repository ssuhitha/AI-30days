from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class TextInput(BaseModel):
    text: str

@app.post("/summarize")
def summarize(input: TextInput):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that summarizes text into clear, concise bullet points. Always return the summary as bullet points starting with •"
            },
            {
                "role": "user",
                "content": f"Summarize the following text:\n\n{input.text}"
            }
        ]
    )
    summary = response.choices[0].message.content
    return {"summary": summary}