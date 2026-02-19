import vcfpy
import json
from datetime import datetime


def run_analysis(selected_drug: str, current_meds=None, vcf_path="backend/sample.vcf"):

    # ------------------------------
    # Input Handling
    # ------------------------------

    if current_meds is None:
        current_meds = []

    selected_drug = selected_drug.upper()
    current_meds = [med.upper() for med in current_meds]

    # ------------------------------
    # Step 1: Read VCF (FIXED)
    # ------------------------------

    reader = vcfpy.Reader.from_path(vcf_path)

    variant_list = []

    for record in reader:
        if record.ID:
            variant_list.append(record.ID)

    # ------------------------------
    # Step 2: Variant Mapping
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

    # ------------------------------
    # Step 3: Drug Risk Rules
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

    # ------------------------------
    # Step 4: Drug Interaction DB
    # ------------------------------

    drug_interactions = {
        "CYP2D6": {
            "inhibitors": [
                "FLUOXETINE",
                "PAROXETINE",
                "BUPROPION"
            ]
        },
        "SLCO1B1": {
            "inhibitors": [
                "CYCLOSPORINE"
            ]
        }
    }

    # ------------------------------
    # Step 4B: Interaction Detection
    # ------------------------------

    interaction_result = {
        "interactions_detected": False,
        "interacting_medications": []
    }

    if selected_drug in drug_rules:

        drug_gene = drug_rules[selected_drug]["gene"]

        if drug_gene in drug_interactions:

            inhibitors = drug_interactions[drug_gene]["inhibitors"]

            for med in current_meds:
                if med in inhibitors:
                    interaction_result["interactions_detected"] = True
                    interaction_result["interacting_medications"].append(med)

    # ------------------------------
    # Step 5: Risk Assessment
    # ------------------------------

    risk_result = "Unknown"

    for variant in mapped_results:

        gene = variant["gene"]
        phenotype = variant["phenotype"]

        if selected_drug in drug_rules:

            rule = drug_rules[selected_drug]

            if gene == rule["gene"]:
                if phenotype in rule:
                    risk_result = rule[phenotype]

    # ------------------------------
    # Step 6: Recommendation
    # ------------------------------

    recommendation = "No pharmacogenomic guidance available."

    if selected_drug == "CODEINE" and risk_result == "Ineffective":
        recommendation = "Avoid Codeine. Consider Morphine or non-opioid alternatives."

    elif selected_drug == "SIMVASTATIN" and risk_result == "Toxicity Risk":
        recommendation = "Reduce dose or consider alternative statin."

    # ------------------------------
    # Step 7: Confidence
    # ------------------------------

    confidence_score = 0.3

    if risk_result == "Ineffective":
        confidence_score = 0.92

    elif risk_result == "Toxicity Risk":
        confidence_score = 0.89

    elif risk_result == "Safe":
        confidence_score = 0.75

    # ------------------------------
    # Step 8: Severity
    # ------------------------------

    severity = "Low"

    if risk_result in ["Ineffective", "Toxicity Risk"]:
        severity = "High"

    elif risk_result == "Unknown":
        severity = "Uncertain"

    # ------------------------------
    # Metadata
    # ------------------------------

    patient_id = "PATIENT_001"
    timestamp = datetime.utcnow().isoformat()

    # ------------------------------
    # Explanation Layer
    # ------------------------------

    explanation = "No significant pharmacogenomic risk detected."

    if selected_drug == "CODEINE" and risk_result == "Ineffective":
        explanation = (
            "Patient has CYP2D6 Poor Metabolizer phenotype. "
            "Codeine requires CYP2D6 activation to convert into morphine. "
            "Reduced enzyme activity may lead to ineffective pain relief."
        )

    elif selected_drug == "SIMVASTATIN" and risk_result == "Toxicity Risk":
        explanation = (
            "SLCO1B1 transporter function is reduced. "
            "Simvastatin clearance is impaired, increasing risk of muscle toxicity."
        )

    patient_explanation = explanation

    # ------------------------------
    # Final JSON
    # ------------------------------

    final_output = {
        "patient_id": patient_id,
        "drug": selected_drug,
        "timestamp": timestamp,

        "risk_assessment": {
            "risk_label": risk_result,
            "confidence_score": confidence_score,
            "severity": severity.lower()
        },

        "pharmacogenomic_profile": {
            "primary_gene": mapped_results[0]["gene"] if mapped_results else "Unknown",
            "diplotype": "Unknown",
            "phenotype": mapped_results[0]["phenotype"] if mapped_results else "Unknown",
            "detected_variants": [
                {"rsid": var} for var in variant_list
            ]
        },

        "clinical_recommendation": recommendation,

        "llm_generated_explanation": {
            "summary": patient_explanation,
            "mechanism": explanation
        },

        "quality_metrics": {
            "vcf_parsing_success": True if variant_list else False
        }
    }

    return final_output

