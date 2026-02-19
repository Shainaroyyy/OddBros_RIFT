# OddBros_RIFT

# PharmaGuard — AI-Driven Pharmacogenomic Risk Engine

## 🧬 Overview

**PharmaGuard** is an AI-assisted pharmacogenomic decision engine that analyzes patient VCF genomic data to predict drug response risk, therapeutic effectiveness, and clinical recommendations.

It transforms raw genomic variants into clinically interpretable drug safety insights aligned with CPIC pharmacogenomic guidelines.

---

## 🚀 Live Deployment

🔗 **Live API URL**
[https://oddbros-rift.onrender.com](https://oddbros-rift.onrender.com)

🔗 **Swagger Docs**
[https://oddbros-rift.onrender.com/docs](https://oddbros-rift.onrender.com/docs)

🔗 **Health Check**
[https://oddbros-rift.onrender.com/health](https://oddbros-rift.onrender.com/health)

---

## 🎯 Problem Statement Alignment

Healthcare providers lack real-time genomic interpretation tools for drug prescribing.

PharmaGuard solves:

* Pharmacogenomic risk detection
* Drug metabolism phenotype prediction
* Clinical recommendation generation
* Variant explainability mapping

---

## 🧠 Solution Capabilities

* Parses patient VCF genomic files
* Detects pharmacogenomic variants
* Maps variants to CPIC gene-drug interactions
* Predicts therapeutic effectiveness
* Generates AI clinical explanations
* Outputs structured medical JSON reports

---

## 🏗️ Architecture Overview

```
User Uploads VCF
        ↓
FastAPI Backend
        ↓
VCF Parsing Engine (vcfpy)
        ↓
Variant → Gene Mapping
        ↓
Drug Risk Assessment Logic
        ↓
LLM Explanation Layer
        ↓
Structured JSON Response
```

---

## ⚙️ Tech Stack

| Layer           | Technology      |
| --------------- | --------------- |
| Backend         | FastAPI         |
| VCF Parsing     | vcfpy           |
| Language        | Python 3.13     |
| Deployment      | Render          |
| API Docs        | Swagger/OpenAPI |
| Data Format     | JSON            |
| Version Control | GitHub          |

---

## 📂 Repository Structure

```
backend/
 ├── app.py              # FastAPI routes
 ├── test_parser.py     # VCF analysis engine
 ├── uploads/           # Uploaded files
 └── sample.vcf         # Test VCF

requirements.txt
README.md
```

---

## 🔌 API Documentation

### POST `/analyze_vcf`

Analyzes patient genomic file.

**Parameters**

| Name      | Type         | Required |
| --------- | ------------ | -------- |
| drug_name | Query String | Yes      |
| file      | VCF Upload   | Yes      |

---

### Example Request

Upload VCF + drug name via Swagger or CURL.

---

### Example Response

```json
{
  "patient_id": "PATIENT_001",
  "drug": "CODEINE",
  "risk_assessment": {
    "risk_label": "Ineffective",
    "confidence_score": 0.92,
    "severity": "high"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "SLCO1B1",
    "phenotype": "Poor Transporter"
  },
  "clinical_recommendation": "Avoid Codeine. Consider Morphine alternatives."
}
```

---

## 🧪 Test Case Validation

System validated using provided hackathon VCF files.

* Field-by-field JSON matching
* Variant detection verified
* Risk prediction accuracy tested
* Parsing success logged

---

## 📊 Evaluation Criteria Alignment

| Criterion         | How PharmaGuard Meets It           |
| ----------------- | ---------------------------------- |
| Problem Clarity   | Targets pharmacogenomics drug risk |
| Solution Accuracy | Valid JSON schema + risk logic     |
| Technical Depth   | VCF parsing + gene mapping         |
| Innovation        | AI explainability layer            |
| Presentation      | Swagger live demo ready            |
| Test Cases        | Validated on real VCF              |
| Documentation     | Full README + API docs             |

---

## 🎥 Demo Video

LinkedIn demo video link: *(Add after recording)*

Must include:

* Architecture walkthrough
* Live file upload
* Risk output explanation

---

## 🧩 Features

* Real-time genomic interpretation
* CPIC-aligned drug recommendations
* Variant explainability
* Clinical phenotype prediction
* LLM-generated reasoning layer
* REST API ready for frontend integration

---

## 🛠️ Local Setup

```bash
git clone <repo_url>
cd backend
pip install -r requirements.txt
uvicorn backend.app:app --reload
```

Access docs:

```
http://localhost:8000/docs
```

---

## 📦 Deployment

Deployed on Render Web Service.

Auto-deploy via GitHub integration.

---

