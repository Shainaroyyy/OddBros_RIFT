from fastapi import FastAPI, UploadFile, File, Query
import shutil
import os

from backend.test_parser import run_analysis

app = FastAPI()


@app.post("/analyze_vcf")
async def analyze_vcf(
    drug_name: str = Query(...),
    file: UploadFile = File(...)
):
    try:
        # -----------------------------
        # Save uploaded file
        # -----------------------------
        upload_dir = "backend/uploads"
        os.makedirs(upload_dir, exist_ok=True)

        file_path = os.path.join(upload_dir, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # -----------------------------
        # Run analysis
        # -----------------------------
        result = run_analysis(
            selected_drug=drug_name,
            vcf_path=file_path
        )

        return result

    except Exception as e:
        return {"error": str(e)}
