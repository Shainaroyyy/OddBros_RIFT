import os
import vcfpy
from datetime import datetime
import google.generativeai as genai


# ------------------------------
# Gemini Configuration
# ------------------------------

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash-latest")
else:
    model = None


# ------------------------------
# LLM Explanation Generator (Gemini)
# ------------------------------

def generate_llm_explanation(drug, gene, phenotype):

    if not model:
        return "AI explanation not available (Gemini API key missing)."

    prompt = f"""
Patient pharmacogenomic profile:

Drug: {drug}
Gene: {gene}
Phenotype: {phenotype}

Explain in simple clinical language:

• Drug metabolism impact  
• Clinical risk  
• Treatment recommendation  

Keep it concise and medically accurate.
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"Gemini Error: {str(e)}"


# ------------------------------
# MAIN ANALYSIS FUNCTION
# ------------------------------

def run_analysis(selected_drug: str, current_meds=None, vcf_path="backend/sample.vcf"):

    if current_meds is None:
        current_meds = []

    selected_drug = selected_drug.upper()
    current_meds = [med.upper() for med in current_meds]

    # ------------------------------
    # Step 1 — Read VCF
    # ------------------------------

    reader = vcfpy.Reader.from_path(vcf_path)
    variant_list = []

    for record in reader:
        if record.ID:
            if isinstance(record.ID, list):
                for rid in record.ID:
                    if rid:
                        variant_list.append(str(rid))
            else:
                variant_list.append(str(record.ID))

    # ------------------------------
    # Step 2 — Variant Mapping
    # ------------------------------

    variant_lookup = {
        "rs3892097": {
            "gene": "CYP2D6",
            "phenotype": "Poor Metabolizer"
        },
        "rs4149056": {
            "gene": "SLCO1B1",
            "phenotype": "Poor Transporter"
        }
    }

    mapped_results = []

    for variant in variant_list:
        if variant in variant_lookup:
            mapped_results.append({
                "rsid": variant,
                "gene": variant_lookup[variant]["gene"],
                "phenotype": variant_lookup[variant]["phenotype"]
            })

    primary_gene = mapped_results[0]["gene"] if mapped_results else "Unknown"
    phenotype = mapped_results[0]["phenotype"] if mapped_results else "Unknown"

    # ------------------------------
    # Step 3 — Drug Rules
    # ------------------------------

    drug_rules = {
        "CODEINE": {
            "gene": "CYP2D6",
            "Poor Metabolizer": "Ineffective"
        },
        "SIMVASTATIN": {
            "gene": "SLCO1B1",
            "Poor Transporter": "Toxicity Risk"
        }
    }

    risk_result = "Unknown"

    for variant in mapped_results:
        gene = variant["gene"]
        pheno = variant["phenotype"]

        if selected_drug in drug_rules:
            rule = drug_rules[selected_drug]

            if gene == rule["gene"] and pheno in rule:
                risk_result = rule[pheno]

    # ------------------------------
    # Step 4 — Recommendation
    # ------------------------------

    recommendation = "No pharmacogenomic guidance available."

    if selected_drug == "CODEINE" and risk_result == "Ineffective":
        recommendation = "Avoid Codeine. Consider Morphine or non-opioid alternatives."

    elif selected_drug == "SIMVASTATIN" and risk_result == "Toxicity Risk":
        recommendation = "Reduce dose or consider alternative statin."

    # ------------------------------
    # Confidence + Severity
    # ------------------------------

    confidence_score = 0.3

    if risk_result == "Ineffective":
        confidence_score = 0.92
    elif risk_result == "Toxicity Risk":
        confidence_score = 0.89

    severity = "low"

    if risk_result in ["Ineffective", "Toxicity Risk"]:
        severity = "high"
    elif risk_result == "Unknown":
        severity = "uncertain"

    # ------------------------------
    # Metadata
    # ------------------------------

    patient_id = "PATIENT_001"
    timestamp = datetime.utcnow().isoformat()

    # ------------------------------
    # Gemini LLM Call
    # ------------------------------

    llm_text = generate_llm_explanation(
        drug=selected_drug,
        gene=primary_gene,
        phenotype=phenotype
    )

    # ------------------------------
    # Final Output
    # ------------------------------

    final_output = {
        "patient_id": patient_id,
        "drug": selected_drug,
        "timestamp": timestamp,

        "risk_assessment": {
            "risk_label": risk_result,
            "confidence_score": confidence_score,
            "severity": severity
        },

        "pharmacogenomic_profile": {
            "primary_gene": primary_gene,
            "diplotype": "Unknown",
            "phenotype": phenotype,
            "detected_variants": [
                {"rsid": var} for var in variant_list
            ]
        },

        "clinical_recommendation": recommendation,

        "llm_generated_explanation": llm_text,

        "quality_metrics": {
            "vcf_parsing_success": True if variant_list else False
        }
    }

    return final_output