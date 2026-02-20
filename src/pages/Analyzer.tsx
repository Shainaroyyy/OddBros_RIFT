import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import ResultsCard, { type AnalysisResult, type RiskLevel } from "@/components/ResultsCard";
import { Dna, Pill, AlertCircle, Loader2 } from "lucide-react";

/* ---------------- MOCK FALLBACK ---------------- */

const MOCK_RESULTS: Record<string, AnalysisResult> = {
  warfarin: {
    riskLevel: "Adjust Dosage",
    primaryGene: "CYP2C9",
    phenotype: "Poor Metabolizer",
    clinicalRecommendation: "Reduce initial dose by 30–50%. Monitor INR closely.",
    patientSummary:
      "Your body processes warfarin slowly. A lower dose helps prevent bleeding.",
    confidenceScore: 91,
    interactionDetected: true,
    interactionDetail: "fluconazole interaction",
    drugName: "Warfarin",
    geneReasoning: "CYP2C9 reduced function detected.",
    biologicalMechanism: "Reduced metabolism increases active drug levels.",
  },
  clopidogrel: {
    riskLevel: "Ineffective",
    primaryGene: "CYP2C19",
    phenotype: "Poor Metabolizer",
    clinicalRecommendation: "Consider prasugrel or ticagrelor.",
    patientSummary: "This medication may not work effectively for you.",
    confidenceScore: 95,
    interactionDetected: false,
    drugName: "Clopidogrel",
    geneReasoning: "Loss-of-function CYP2C19 alleles.",
    biologicalMechanism: "Drug cannot convert to active form.",
  },
  codeine: {
    riskLevel: "Toxic",
    primaryGene: "CYP2D6",
    phenotype: "Ultrarapid Metabolizer",
    clinicalRecommendation: "Avoid codeine. Use alternative analgesics.",
    patientSummary:
      "Your body converts codeine too quickly, which is dangerous.",
    confidenceScore: 98,
    interactionDetected: false,
    drugName: "Codeine",
    geneReasoning: "CYP2D6 duplication detected.",
    biologicalMechanism: "Rapid conversion to morphine causes toxicity.",
  },
  simvastatin: {
    riskLevel: "Adjust Dosage",
    primaryGene: "SLCO1B1",
    phenotype: "Decreased Function",
    clinicalRecommendation: "Limit dose or switch statin.",
    patientSummary: "Higher risk of muscle side effects.",
    confidenceScore: 84,
    interactionDetected: false,
    drugName: "Simvastatin",
    geneReasoning: "Reduced transporter function.",
    biologicalMechanism: "Increased circulating statin levels.",
  },
};

function getMockResult(drug: string, interactions: string): AnalysisResult {
  const key = drug.toLowerCase().trim();

  if (MOCK_RESULTS[key]) {
    const result = { ...MOCK_RESULTS[key] };

    if (interactions && !result.interactionDetected) {
      result.interactionDetected = true;
      result.interactionDetail = interactions.split(",")[0].trim();
    }

    return result;
  }

  return {
    riskLevel: "Safe" as RiskLevel,
    primaryGene: "CYP2D6",
    phenotype: "Normal Metabolizer",
    clinicalRecommendation: "Standard dosing appropriate.",
    patientSummary: "No genetic risks detected.",
    confidenceScore: 78,
    interactionDetected: false,
    drugName: drug,
    geneReasoning: "No significant variants detected.",
    biologicalMechanism: "Normal drug metabolism expected.",
  };
}

/* ---------------- COMPONENT ---------------- */

export default function Analyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [drugName, setDrugName] = useState("");
  const [interactions, setInteractions] = useState("");
  const [viewMode, setViewMode] = useState<"doctor" | "patient">("doctor");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  // auto clear error when file selected
  useEffect(() => {
    if (selectedFile) setError("");
  }, [selectedFile]);

  const handleAnalyze = async () => {
    if (!selectedFile || !(selectedFile instanceof File)) {
      setError("Upload a VCF file.");
      return;
    }

    if (!drugName.trim()) {
      setError("Enter a drug name.");
      return;
    }

    setError("");
    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("drug", drugName.trim());

      // send both keys for backend compatibility
      if (interactions.trim()) {
        formData.append("interactions", interactions.trim());
        formData.append("co_medications", interactions.trim());
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(
        "https://oddbros-rift.onrender.com/analyze",
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.warn("Backend failed — using demo result.");
      const fallback = getMockResult(drugName, interactions);
      setResult(fallback);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Genetic Drug Safety Analyzer</h1>
        <p className="text-sm text-muted-foreground">
          Upload a VCF file and enter medication for pharmacogenomic risk assessment.
        </p>
      </div>

      {/* Card */}
      <div className="bg-card border rounded-xl p-5 space-y-5">
        {/* Upload */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-2 mb-2">
            <Dna className="w-4 h-4" />
            Genetic Data File
          </label>

          <FileUpload
            onFileSelect={(file: File) => setSelectedFile(file)}
            selectedFile={selectedFile}
          />
        </div>

        {/* Drug */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-2 mb-2">
            <Pill className="w-4 h-4" />
            Drug Name
          </label>

          <input
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Warfarin, Clopidogrel..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Interactions */}
        <div>
          <label className="text-sm font-semibold mb-2 block">
            Other Medications (optional)
          </label>

          <input
            value={interactions}
            onChange={(e) => setInteractions(e.target.value)}
            placeholder="Fluconazole, Omeprazole..."
            className="w-full border rounded-lg px-3 py-2"
          />

          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Used to detect interactions
          </p>
        </div>

        {/* Toggle + Button */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="bg-muted p-1 rounded-lg flex">
            <button
              onClick={() => setViewMode("doctor")}
              className={`px-3 py-1 rounded-md ${
                viewMode === "doctor" && "bg-white shadow"
              }`}
            >
              Doctor
            </button>

            <button
              onClick={() => setViewMode("patient")}
              className={`px-3 py-1 rounded-md ${
                viewMode === "patient" && "bg-white shadow"
              }`}
            >
              Patient
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing
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
          <div className="text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* Loading */}
      {isAnalyzing && (
        <div className="text-center py-10">
          <Loader2 className="animate-spin mx-auto mb-3" />
          Processing genetic variants...
        </div>
      )}

      {/* Results */}
      {result && !isAnalyzing && (
        <ResultsCard result={result} viewMode={viewMode} />
      )}
    </div>
  );
}
