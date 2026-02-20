# 🧬 PharmaGuard — Pharmacogenomic Clinical Decision Support
### OddBros_RIFT | RIFT 2026 Hackathon

PharmaGuard is a clinical decision support web application that analyzes patient genomic data (VCF files) to predict drug response risks and guide safer prescribing.

It transforms raw genetic variants into clinically interpretable drug safety insights aligned with pharmacogenomic prescribing principles.

---

## 🌐 Live Application

### 🔗 Web App (Frontend)
https://oddbrosrift.vercel.app

### 🔗 Backend API
https://oddbros-rift.onrender.com

### 🔗 API Docs
https://oddbros-rift.onrender.com/docs

### 🔗 Health Check
https://oddbros-rift.onrender.com/health

---

## 🎯 Problem

Drug response varies significantly due to genetic variation.

Without pharmacogenomic insights:

- medications may be ineffective  
- toxicity risks increase  
- adverse drug reactions rise  
- trial-and-error prescribing delays treatment  

PharmaGuard bridges genomic data with pharmacogenomic intelligence to support precision medicine.

---

## 💡 Solution

PharmaGuard provides an end-to-end workflow:

1. Upload genomic VCF file  
2. Enter prescribed drug  
3. Detect pharmacogenomic variants  
4. Predict drug safety & effectiveness  
5. Generate clinician & patient insights  

---

## 🔬 Key Features

### 🧬 Genotypic Analysis
- VCF file parsing
- Variant extraction
- Gene identification

### 💊 Pharmacogenomic Intelligence
- Gene → phenotype interpretation
- Drug–gene interaction rules
- Drug–drug interaction detection

### ⚕️ Clinical Decision Support
- Risk classification (Safe / Adjust / Toxic / Ineffective)
- Evidence-based recommendations
- Confidence scoring

### 👩‍⚕️ Dual Clinical Views
- **Doctor View** → technical reasoning & clinical detail  
- **Patient View** → simplified explanation  

### 📊 Explainability
- Biological mechanism insights
- Gene reasoning transparency
- Interaction explanations

---

## 🖥️ How It Works


User uploads VCF + drug name (Frontend UI)
↓
React Frontend sends file to FastAPI
↓
VCF Parsing Engine (vcfpy)
↓
Variant → Gene Mapping
↓
Pharmacogenomic Rules Engine
↓
Risk Classification & Recommendations
↓
JSON Response
↓
Clinical Results Dashboard


---

## 🏗️ System Architecture

### Frontend
- React + Vite
- Tailwind CSS
- Drag & drop VCF upload
- Clinical results dashboard

### Backend
- FastAPI
- vcfpy parser
- pharmacogenomic rule engine
- structured JSON output

---

## ⚙️ Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React + Vite |
| UI | Tailwind CSS |
| Backend | FastAPI |
| Parsing Engine | vcfpy |
| Language | Python |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |
| API Docs | Swagger/OpenAPI |
| Data Format | JSON |

---

## 📂 Repository Structure


backend/
app.py
parser.py
sample.vcf

frontend/
src/
components/
pages/

requirements.txt
package.json
README.md


---

## 🧪 Usage Flow

1️⃣ Open the web app  
2️⃣ Upload a VCF file  
3️⃣ Enter drug name (e.g. Warfarin)  
4️⃣ Click **Analyze**  
5️⃣ View risk classification & recommendations  

---

## 🧪 Sample Drugs for Demo

- Warfarin  
- Clopidogrel  
- Codeine  
- Simvastatin  

---

## 🔌 API Endpoint

### POST `/analyze`

**Form Data**

| Field | Type | Required |
|------|------|---------|
| file | VCF | Yes |
| drug | string | Yes |
| interactions | string | Optional |

---

## 📄 Example Response

```json
{
  "drugName": "Warfarin",
  "riskLevel": "Adjust Dosage",
  "primaryGene": "CYP2C9",
  "phenotype": "Poor Metabolizer",
  "clinicalRecommendation": "Reduce dose by 30–50%. Monitor INR."
}
🧬 Clinical Alignment

PharmaGuard follows pharmacogenomic principles inspired by:

CPIC (Clinical Pharmacogenetics Implementation Consortium)

genotype → phenotype translation

evidence-based dosing guidance

🎥 Demo Video

📌 LinkedIn Demo: (Add after upload)

Demo should include:

architecture walkthrough

live deployment demo

VCF upload workflow

risk output interpretation

🛠️ Local Setup
Backend
pip install -r requirements.txt
uvicorn app:app --reload
Frontend
npm install
npm run dev

```

📦 Deployment

Frontend hosted on Vercel

Backend hosted on Render

Public API access enabled

GitHub integrated deployment

🔮 Future Enhancements

Expanded CPIC gene coverage

Multi-drug therapy risk modeling

Clinical PDF report export

EHR system integration

AI-powered clinical reasoning layer

👥 Team

OddBros_RIFT
RIFT 2026 Hackathon

📜 License

Developed for RIFT 2026 Hackathon.
For academic and demonstration purposes.


---
