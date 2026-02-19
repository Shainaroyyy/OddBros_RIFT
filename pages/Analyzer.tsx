import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import ResultsCard, { type AnalysisResult, type RiskLevel } from "@/components/ResultsCard";
import { Dna, Pill, AlertCircle, Loader2 } from "lucide-react";

const MOCK_RESULTS: Record<string, AnalysisResult> = {
  warfarin: {
    riskLevel: "Adjust Dosage",
    primaryGene: "CYP2C9",
    phenotype: "Poor Metabolizer",
    clinicalRecommendation:
      "CYP2C9 *2/*3 genotype detected. Reduce initial warfarin dose by 30–50%. Monitor INR closely every 3–5 days during initiation. Risk of bleeding significantly elevated. Consider VKORC1 co-genotyping.",
    patientSummary:
      "Your DNA shows that your body breaks down warfarin more slowly than average. This means a lower starting dose is recommended to avoid the risk of bleeding. Your doctor will monitor your blood clotting levels closely.",
    confidenceScore: 91,
    interactionDetected: true,
    interactionDetail: "affecting drug metabolism via CYP2C9 inhibition",
    drugName: "Warfarin",
    geneReasoning:
      "The patient carries CYP2C9 *2 and *3 loss-of-function alleles. This results in a poor metabolizer phenotype, leading to reduced warfarin clearance and higher plasma concentrations at standard doses.",
    biologicalMechanism:
      "CYP2C9 is the primary enzyme responsible for warfarin's S-enantiomer metabolism. Reduced CYP2C9 activity leads to accumulation of the pharmacologically active S-warfarin, intensifying anticoagulation effect and increasing hemorrhage risk.",
    interactionExplanation:
      "Concurrent use of fluconazole (a potent CYP2C9 inhibitor) was detected in the listed co-medications. This interaction further reduces warfarin clearance, compounding the effect of the genetic poor metabolizer status.",
  },
  clopidogrel: {
    riskLevel: "Ineffective",
    primaryGene: "CYP2C19",
    phenotype: "Poor Metabolizer",
    clinicalRecommendation:
      "CYP2C19 loss-of-function alleles (*2/*2) detected. Clopidogrel requires hepatic activation via CYP2C19; this genotype results in severely reduced active metabolite formation. Consider alternative antiplatelet therapy (prasugrel or ticagrelor) per ACC/AHA guidelines.",
    patientSummary:
      "Your body is unable to properly activate clopidogrel into its working form. This means the medication may not protect your heart effectively. Your doctor should consider switching to a different medication that works for your genetic profile.",
    confidenceScore: 95,
    interactionDetected: false,
    drugName: "Clopidogrel",
    geneReasoning:
      "Homozygous CYP2C19 *2 loss-of-function genotype confirmed. This allele encodes a non-functional enzyme, eliminating the majority of clopidogrel bioactivation in the liver.",
    biologicalMechanism:
      "Clopidogrel is a prodrug requiring two-step oxidation by CYP2C19 to generate its active thiol metabolite. Without functional CYP2C19, the active metabolite cannot be produced at therapeutic concentrations, resulting in inadequate P2Y12 receptor inhibition and platelet aggregation.",
  },
  codeine: {
    riskLevel: "Toxic",
    primaryGene: "CYP2D6",
    phenotype: "Ultrarapid Metabolizer",
    clinicalRecommendation:
      "CYP2D6 ultrarapid metabolizer genotype detected (*1/*2xN gene duplication). Codeine is rapidly converted to morphine at excessive rates. Contraindicated — risk of life-threatening respiratory depression. Use alternative non-opioid analgesia.",
    patientSummary:
      "Your body converts codeine to morphine far too quickly, which can lead to dangerously high morphine levels and breathing problems. This medication is not safe for you. Please inform all healthcare providers of this genetic result.",
    confidenceScore: 98,
    interactionDetected: false,
    drugName: "Codeine",
    geneReasoning:
      "CYP2D6 gene duplication (*1/*2xN) resulting in ultrarapid metabolizer status. Greater than 3 functional gene copies detected, producing excess enzyme activity beyond normal therapeutic bounds.",
    biologicalMechanism:
      "CYP2D6 converts codeine to morphine via O-demethylation. In ultrarapid metabolizers, this conversion occurs at 3–5× normal rates, producing supra-therapeutic morphine plasma levels even at standard codeine doses, with risk of fatal opioid toxicity.",
  },
  simvastatin: {
    riskLevel: "Adjust Dosage",
    primaryGene: "SLCO1B1",
    phenotype: "Decreased Function",
    clinicalRecommendation:
      "SLCO1B1 rs4149056 C allele (TC genotype) detected. Associated with impaired hepatic uptake of simvastatin, elevating plasma statin concentrations and myopathy risk. Limit dose to ≤20 mg/day or switch to pravastatin/rosuvastatin.",
    patientSummary:
      "Your genetic profile shows a higher risk of muscle side effects with this statin medication. A lower dose or a different statin that your body handles better is recommended.",
    confidenceScore: 84,
    interactionDetected: false,
    drugName: "Simvastatin",
    geneReasoning:
      "SLCO1B1 encodes the OATP1B1 transporter responsible for hepatic statin uptake. The rs4149056 TC genotype reduces transporter function, increasing systemic simvastatin exposure.",
    biologicalMechanism:
      "Reduced OATP1B1 activity impairs hepatic first-pass extraction of simvastatin acid, increasing circulating drug concentrations and skeletal muscle exposure, thereby increasing myopathy and rhabdomyolysis risk in a dose-dependent manner.",
  },
};

function getMockResult(drugName: string, interactions: string): AnalysisResult {
  const key = drugName.toLowerCase().trim();
  if (MOCK_RESULTS[key]) {
    const result = { ...MOCK_RESULTS[key] };
    if (interactions && !result.interactionDetected) {
      result.interactionDetected = true;
      result.interactionDetail = `affecting drug metabolism via co-medication interaction with ${interactions.split(",")[0].trim()}`;
      result.interactionExplanation = `The listed co-medication (${interactions.split(",")[0].trim()}) may affect the enzymatic pathway responsible for ${drugName} metabolism, potentially altering plasma drug levels and clinical response.`;
    }
    return result;
  }
  // Generic safe result for unknown drugs
  return {
    riskLevel: "Safe" as RiskLevel,
    primaryGene: "CYP2D6",
    phenotype: "Normal Metabolizer",
    clinicalRecommendation: `No clinically significant pharmacogenomic variants detected for ${drugName}. Standard dosing is appropriate. Continue routine monitoring.`,
    patientSummary: `Your genetic profile does not indicate any known risks with ${drugName}. You can take this medication at the standard dose. Continue to follow your doctor's instructions.`,
    confidenceScore: 78,
    interactionDetected: !!interactions,
    interactionDetail: interactions ? `potential interaction with ${interactions.split(",")[0].trim()}` : undefined,
    drugName,
    geneReasoning: `No loss-of-function or gain-of-function variants detected in primary pharmacogenes relevant to ${drugName} metabolism or transport.`,
    biologicalMechanism: `Standard enzymatic activity predicted across CYP2D6, CYP2C19, and CYP2C9 pathways. Drug exposure is expected to remain within the therapeutic window at guideline-recommended doses.`,
    interactionExplanation: interactions
      ? `The co-medication may share metabolic pathways with ${drugName}. Clinical monitoring is advised, though the genetic profile does not amplify this risk.`
      : undefined,
  };
}

export default function Analyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [drugName, setDrugName] = useState("");
  const [interactions, setInteractions] = useState("");
  const [viewMode, setViewMode] = useState<"doctor" | "patient">("doctor");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload a VCF file to proceed.");
      return;
    }
    if (!drugName.trim()) {
      setError("Please enter the drug name.");
      return;
    }
    setError("");
    setIsAnalyzing(true);
    setResult(null);

    // Simulate analysis delay
    await new Promise((r) => setTimeout(r, 2200));

    const analysisResult = getMockResult(drugName, interactions);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Genetic Drug Safety Analyzer</h1>
        <p className="text-sm text-muted-foreground">
          Upload a VCF file and enter a medication to receive a pharmacogenomic risk assessment.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-card rounded-xl border border-border shadow-card p-5 space-y-5">
        {/* VCF Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Dna className="w-4 h-4 text-primary" />
            Genetic Data File (VCF)
          </label>
          <FileUpload onFileSelect={setSelectedFile} selectedFile={selectedFile} />
        </div>

        {/* Drug Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Pill className="w-4 h-4 text-primary" />
            Drug Name
          </label>
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="e.g. Warfarin, Clopidogrel, Codeine..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
          <p className="text-xs text-muted-foreground">
            Try: Warfarin, Clopidogrel, Codeine, or Simvastatin for a demo result.
          </p>
        </div>

        {/* Co-medications */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Other Medications{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            type="text"
            value={interactions}
            onChange={(e) => setInteractions(e.target.value)}
            placeholder="e.g. Fluconazole, Omeprazole..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Used to detect drug interaction risks.
          </p>
        </div>

        {/* View Mode Toggle + Analyze */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode("doctor")}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "doctor"
                  ? "bg-card text-foreground shadow-sm-clinical"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Doctor View
            </button>
            <button
              onClick={() => setViewMode("patient")}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "patient"
                  ? "bg-card text-foreground shadow-sm-clinical"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Patient View
            </button>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm-clinical"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Dna className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-clinical-toxic-bg border border-clinical-toxic-border rounded-lg animate-fade-in">
            <AlertCircle className="w-4 h-4 text-clinical-toxic flex-shrink-0" />
            <p className="text-sm text-clinical-toxic">{error}</p>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="bg-card rounded-xl border border-border shadow-card p-8 flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
            <Dna className="w-6 h-6 text-primary animate-pulse-slow" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-foreground">Processing genetic variants...</p>
            <p className="text-xs text-muted-foreground">
              Detecting alleles · Evaluating phenotype · Checking interactions
            </p>
          </div>
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-[slide-in_2.2s_ease-in-out]" style={{ width: "100%" }} />
          </div>
        </div>
      )}

      {/* Results */}
      {result && !isAnalyzing && (
        <ResultsCard result={result} viewMode={viewMode} />
      )}
    </div>
  );
}
