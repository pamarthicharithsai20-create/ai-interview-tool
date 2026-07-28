from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalysisRequest(BaseModel):
    question: str = ""
    answer: str


@app.get("/")
def health_check():
    return {"status": "AI Interview Tool backend is running"}


@app.post("/analyze-answer")
def analyze_answer(payload: AnalysisRequest):
    answer = payload.answer.strip()

    if not answer:
        raise HTTPException(status_code=400, detail="Answer is required.")

    word_count = len(answer.split())
    score = min(100, max(35, 35 + word_count * 2))

    if word_count < 20:
        feedback = "Your answer is quite short. Explain the concept and include an example."
    elif word_count < 50:
        feedback = "Good start. Add more technical detail, a real example, and explain the trade-offs."
    else:
        feedback = "Strong, detailed answer. Keep it structured and include practical examples where relevant."

    return {
        "score": score,
        "feedback": feedback,
        "question": payload.question,
    }
