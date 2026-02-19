import { AnalysisResult } from "./ResultsCard";

interface Props {
  onResult: (result: AnalysisResult) => void;
}

export default function FileUpload({ onResult }: Props) {
  const runMockAnalysis = () => {
    const fake: AnalysisResult = {
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
        "Your body processes this drug slowly. Lower doses may work better.",
      geneReasoning:
        "Variant CYP2C19*2 reduces enzyme activity.",
      biologicalMechanism:
        "Reduced metabolism increases drug concentration.",
      interactionExplanation:
        "Omeprazole inhibits CYP2C19 further.",
    };

    onResult(fake);
  };

  return (
    <div className="border-2 border-dashed p-8 rounded-xl text-center">
      <p className="mb-4">Upload VCF or run demo analysis</p>

      <button
        onClick={runMockAnalysis}
        className="bg-black text-white px-5 py-2 rounded-lg"
      >
        Run Demo Analysis
      </button>
    </div>
  );
}
