from fastapi import FastAPI, UploadFile, File, Query
from openai import OpenAI
import shutil
import os

from backend.test_parser import run_analysis


# -----------------------------
# App Init
# -----------------------------
app = FastAPI()


# -----------------------------
# OpenAI Client Init
# -----------------------------
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)
else:
    client = None


# -----------------------------
# Root Route (Deploy check)
# -----------------------------
@app.get("/")
def root():
    return {"message": "PharmaGuard API is live 🚀"}


# -----------------------------
# Health Check Route
# -----------------------------
@app.get("/health")
def health_check():
    return {"status": "ok"}


# -----------------------------
# Analyze VCF Route
# -----------------------------
@app.post("/analyze_vcf")
async def analyze_vcf(
    drug_name: str = Query(...),
    file: UploadFile = File(...)
):
    try:
        # Save uploaded file
        upload_dir = "backend/uploads"
        os.makedirs(upload_dir, exist_ok=True)

        file_path = os.path.join(upload_dir, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run rule-based analysis
        result = run_analysis(
            selected_drug=drug_name,
            vcf_path=file_path
        )

        return result

    except Exception as e:
        return {"error": str(e)}


# -----------------------------
# Explain Result Route (LLM)
# -----------------------------
@app.post("/explain")
async def explain_result(result: dict):

    if not client:
        return {"error": "OPENAI_API_KEY not configured"}

    if not result:
        return {"error": "No analysis result provided"}

    prompt = f"""
You are a healthcare AI assistant.

Explain the following genetic analysis result in simple,
non-technical language for a normal person.

Include:
• What the risk level means
• What it implies for health
• General preventive advice (not medical diagnosis)

Keep it under 200 words.

Result:
{result}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )

        explanation = response.choices[0].message.content

        return {"explanation": explanation}

    except Exception as e:
        return {"error": str(e)}