# OddBros_RIFT

# 🧬 PharmaGuard — AI-Driven Pharmacogenomic Risk Engine

### OddBros_RIFT | RIFT 2026

---

## 🧠 Overview

**PharmaGuard** is an AI-assisted pharmacogenomic decision support engine that analyzes patient VCF genomic data to predict drug response risks, therapeutic effectiveness, and clinical recommendations.

It transforms raw genomic variants into clinically interpretable drug safety insights aligned with pharmacogenomic prescribing principles.

The system enables clinicians and researchers to evaluate genomic drug response risks in real time.

---

## 🚀 Live Deployment

🔗 **API Base URL**
[https://oddbros-rift.onrender.com](https://oddbros-rift.onrender.com)

🔗 **Swagger API Docs**
[https://oddbros-rift.onrender.com/docs](https://oddbros-rift.onrender.com/docs)

🔗 **Health Check**
[https://oddbros-rift.onrender.com/health](https://oddbros-rift.onrender.com/health)

---

## 🎯 Problem Context

Drug response varies significantly based on genetic makeup. Without genomic analysis:

* Prescriptions may be ineffective
* Patients may face toxicity risks
* Adverse drug reactions increase

PharmaGuard bridges genomic data with pharmacogenomic drug intelligence to support precision prescribing.

---

## 🧠 Solution Capabilities

* Parses patient VCF genomic files
* Detects pharmacogenomic variants
* Maps variants → genes → phenotypes
* Applies drug-gene interaction rules
* Predicts therapeutic effectiveness
* Generates clinical recommendations
* Provides explainability for risk outcomes
* Outputs structured JSON medical reports

---

## 🏗️ System Architecture

```
Patient Uploads VCF
        ↓
FastAPI Backend API
        ↓
VCF Parsing Engine (vcfpy)
        ↓
Variant Extraction
        ↓
Gene Mapping Engine
        ↓
Drug Risk Rules Engine
        ↓
Clinical Recommendation Layer
        ↓
Explainability Generator
        ↓
Structured JSON Output
```

---

## ⚙️ Tech Stack

| Layer           | Technology        |
| --------------- | ----------------- |
| Backend         | FastAPI           |
| Parsing Engine  | vcfpy             |
| Language        | Python 3          |
| Deployment      | Render            |
| API Docs        | Swagger / OpenAPI |
| Data Format     | JSON              |
| Version Control | GitHub            |

---

## 📂 Repository Structure

```
backend/
 ├── app.py              # FastAPI routes & file upload handling
 ├── test_parser.py     # Genomic analysis engine
 ├── uploads/           # Temporary uploaded VCF files
 └── sample.vcf         # Sample test file

requirements.txt
README.md
```

---

## 🔌 API Documentation

### POST `/analyze_vcf`

Analyzes patient genomic data for pharmacogenomic drug risk.

---

### Parameters

| Name      | Type         | Required |
| --------- | ------------ | -------- |
| drug_name | Query String | Yes      |
| file      | VCF Upload   | Yes      |

---

### Example Request

Upload:

* Drug Name → `CODEINE`
* File → `.vcf`

Via Swagger UI or Postman.

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

System validated using pharmacogenomic VCF test datasets.

Testing ensured:

* Variant extraction accuracy
* Gene mapping correctness
* Drug risk rule triggering
* JSON schema compliance
* Parsing success validation

---

## 🖥️ Frontend Integration Ready

Backend supports seamless frontend integration via:

* Multipart file upload
* Query parameter drug input
* Structured JSON responses
* Auto-generated API docs

Frontend analyzer dashboard can visualize:

* Risk classification
* Clinical recommendations
* Variant profiles
* Explainability insights

---

## 🎥 Demo Video

LinkedIn demo link: *(Add after recording)*

Demo should include:

* Architecture walkthrough
* Live deployment testing
* File upload workflow
* Risk output interpretation

---

## 🛠️ Local Setup

Clone repository:

```bash
git clone <repo_url>
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run server:

```bash
uvicorn backend.app:app --reload
```

Access docs locally:

```
http://localhost:8000/docs
```

---

## 📦 Deployment Details

* Hosted on Render Web Service
* ASGI server: Uvicorn
* Public API deployment
* GitHub integrated

---

## 🔮 Future Scope

* Expanded CPIC gene coverage
* Multi-drug interaction modeling
* Clinical decision dashboards
* EHR system integration
* LLM-driven clinical reasoning

---

## 📜 License

Developed for RIFT 2026 Hackathon.
For academic and demonstration purposes.

