import { useState } from "react";
import ResultsCard, { AnalysisResult } from "@/components/ResultsCard";

export default function Analyzer() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [viewMode, setViewMode] = useState<"doctor" | "patient">("doctor");

  const runDemo = () => {
    setResult({
      riskLevel: "Adjust Dosage",
      primaryGene: "CYP2C19",
      phenotype: "Poor Metabolizer",
      clinicalRecommendation:
        "Reduce dosage by 50% and monitor plasma levels.",
      confidenceScore: 88,
      interactionDetected: true,
      interactionDetail: "Interaction with Omeprazole",
      drugName: "Clopidogrel",
      patientSummary:
        "Your body may not process this drug effectively. A lower dose or alternative may be needed.",
      geneReasoning:
        "CYP2C19 poor metabolizer status reduces activation.",
      biologicalMechanism:
        "Reduced conversion to active metabolite lowers efficacy.",
      interactionExplanation:
        "Omeprazole inhibits CYP2C19, further reducing activation of clopidogrel.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* Upload / Demo Box */}
      <div className="border-2 border-dashed border-border rounded-xl p-10 text-center bg-muted/20">
        <p className="text-sm text-muted-foreground mb-4">
          Upload VCF or run demo analysis
        </p>

        <button
          onClick={runDemo}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition"
        >
          Run Demo Analysis
        </button>
      </div>

      {/* Results */}
      {result && (
        <ResultsCard
          result={result}
          viewMode={viewMode}
        />
      )}
    </div>
  );
}
