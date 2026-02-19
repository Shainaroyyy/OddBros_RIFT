import vcf
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
    # Step 1: Read VCF
    # ------------------------------

    vcf_reader = vcf.Reader(open(vcf_path, "r"))


    variant_list = []

    for record in vcf_reader:
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
# Step 4B: Drug Interaction Detection
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
                med_upper = med.upper()

                if med_upper in inhibitors:
                    interaction_result["interactions_detected"] = True
                    interaction_result["interacting_medications"].append(med_upper)


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
    # Step 6: Clinical Recommendation
    # ------------------------------

    recommendation = "No pharmacogenomic guidance available."

    if selected_drug == "CODEINE" and risk_result == "Ineffective":
        recommendation = "Avoid Codeine. Consider Morphine or non-opioid alternatives."

    elif selected_drug == "SIMVASTATIN" and risk_result == "Toxicity Risk":
        recommendation = "Reduce dose or consider alternative statin."

    # ------------------------------
    # Step 7: Confidence Score
    # ------------------------------

    confidence_score = 0.3

    if risk_result == "Ineffective":
        confidence_score = 0.92

    elif risk_result == "Toxicity Risk":
        confidence_score = 0.89

    elif risk_result == "Safe":
        confidence_score = 0.75

    # ------------------------------
    # Step 8: Severity Classification
    # ------------------------------

    severity = "Low"

    if risk_result in ["Ineffective", "Toxicity Risk"]:
        severity = "High"

    elif risk_result == "Unknown":
        severity = "Uncertain"

    # ------------------------------
    # Step 9: Metadata
    # ------------------------------

    patient_id = "PATIENT_001"
    timestamp = datetime.utcnow().isoformat()

    # ------------------------------
    # Step 10: Explanation Layer
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


    # ------------------------------
    # Step 10B: Patient-Friendly Explanation
    # ------------------------------

    patient_explanation = "No genetic issues affecting this medication were detected."

    if selected_drug == "CODEINE" and risk_result == "Ineffective":
        patient_explanation = (
            "Your body may not convert Codeine into its active pain-relief form effectively. "
            "This means the medication may not work well for pain management."
       )

    elif selected_drug == "SIMVASTATIN" and risk_result == "Toxicity Risk":
        patient_explanation = (
            "Your body may process Simvastatin more slowly, which could increase the risk "
            "of side effects like muscle pain."
       )


    # ------------------------------
    # Step 11: Safety Flags
    # ------------------------------

    analysis_flags = {
        "unsupported_drug": False,
        "variants_missing": False,
        "partial_analysis": False
    }

    if selected_drug not in drug_rules:
        analysis_flags["unsupported_drug"] = True

    if len(mapped_results) == 0:
        analysis_flags["variants_missing"] = True

    if analysis_flags["unsupported_drug"] or analysis_flags["variants_missing"]:
        analysis_flags["partial_analysis"] = True

    # ------------------------------
    # Final JSON Output
    # ------------------------------
    final_output = {
        "patient_id": patient_id,
        "timestamp": timestamp,

        "drug": selected_drug,

        "detected_variants": variant_list,
        "mapped_variants": mapped_results,

        "drug_interactions": interaction_result,

        "risk_assessment": {
            "risk_label": risk_result,
            "confidence_score": confidence_score,
            "severity": severity
       },

        "clinical_recommendation": recommendation,
        "explanation": explanation,
        "patient_explanation": patient_explanation,

        "analysis_flags": analysis_flags
   }

    return final_output
