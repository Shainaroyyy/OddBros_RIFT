from fastapi import FastAPI, UploadFile, File
from backend.test_parser import run_analysis

import shutil
import os

app = FastAPI()

# Ensure upload folder exists
UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# -----------------------------
# VCF Upload Endpoint
# -----------------------------
@app.post("/analyze_vcf")
async def analyze_vcf(
    file: UploadFile = File(...),
    drug_name: str = "CODEINE"
):

    # Save uploaded file safely
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run analysis
    result = run_analysis(
        selected_drug=drug_name,
        vcf_path=file_path
    )

    # Cleanup uploaded file
    os.remove(file_path)

    return result
