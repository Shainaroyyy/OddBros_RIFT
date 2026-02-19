import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingDown,
} from "lucide-react";

export type RiskLevel = "Safe" | "Adjust Dosage" | "Toxic" | "Ineffective";

export interface AnalysisResult {
  riskLevel: RiskLevel;
  primaryGene: string;
  phenotype: string;
  clinicalRecommendation: string;
  confidenceScore: number;
  interactionDetected: boolean;
  interactionDetail?: string;
  drugName: string;
  patientSummary: string;
  geneReasoning: string;
  biologicalMechanism: string;
  interactionExplanation?: string;
}

const riskConfig = {
  Safe: { icon: CheckCircle, color: "bg-green-500" },
  "Adjust Dosage": { icon: AlertTriangle, color: "bg-yellow-500" },
  Toxic: { icon: XCircle, color: "bg-red-500" },
  Ineffective: { icon: TrendingDown, color: "bg-blue-500" },
};

interface Props {
  result: AnalysisResult;
  viewMode: "doctor" | "patient";
}

export default function ResultsCard({ result, viewMode }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const Icon = riskConfig[result.riskLevel].icon;
  const badgeColor = riskConfig[result.riskLevel].color;
  const isDoctor = viewMode === "doctor";

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.json";
    a.click();
  };

  return (
    <div className="space-y-4 animate-fade-in">

      {/* MAIN CARD */}
      <div className="border rounded-xl p-6 space-y-4 bg-white shadow-sm">

        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-bold">{result.drugName}</h3>

            {/* ⭐ subtitle line */}
            <p className="text-sm text-gray-600">
              Genetic variation detected affecting drug metabolism.
            </p>
          </div>

          {/* Risk Badge */}
          <span className={`px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 ${badgeColor}`}>
            <Icon className="w-4 h-4" />
            {result.riskLevel}
          </span>
        </div>

        {/* Interaction Warning */}
        {result.interactionDetected && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded text-sm">
            ⚠ Interaction detected — {result.interactionDetail}
          </div>
        )}

        {/* Gene + Phenotype */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Primary Gene</p>
            <p className="font-semibold">{result.primaryGene}</p>
          </div>

          <div>
            <p className="text-gray-500">
              {isDoctor ? "Phenotype" : "Metabolizer Type"}
            </p>
            <p className="font-semibold">{result.phenotype}</p>
          </div>
        </div>

        {/* Confidence */}
        <div className="text-sm">
          <p className="text-gray-500">Confidence Score</p>
          <p className="font-semibold">{result.confidenceScore}%</p>

          <p className="text-xs text-gray-500">
            {result.confidenceScore >= 90 && "High clinical evidence"}
            {result.confidenceScore >= 70 &&
              result.confidenceScore < 90 &&
              "Moderate clinical evidence"}
            {result.confidenceScore < 70 &&
              "Limited evidence — clinical judgment advised"}
          </p>
        </div>

        {/* Recommendation */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <p className="font-semibold mb-1">
            {isDoctor ? "Clinical Recommendation" : "What this means"}
          </p>
          {isDoctor
            ? result.clinicalRecommendation
            : result.patientSummary}
        </div>
      </div>

      {/* EXPLAIN SECTION */}
      <div className="border rounded-xl bg-white shadow-sm">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-4"
        >
          <span className="font-semibold">Why this decision?</span>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>

        {open && (
          <div className="p-4 space-y-3 text-sm border-t">
            <div>
              <b>Gene reasoning:</b>
              <p>{result.geneReasoning}</p>
            </div>

            <div>
              <b>Biological mechanism:</b>
              <p>{result.biologicalMechanism}</p>
            </div>

            {result.interactionExplanation && (
              <div>
                <b>Interaction:</b>
                <p>{result.interactionExplanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button onClick={handleDownload} className="border px-4 py-2 rounded-lg">
          <Download className="inline w-4 h-4 mr-1" />
          Download
        </button>

        <button onClick={handleCopy} className="border px-4 py-2 rounded-lg">
          <Copy className="inline w-4 h-4 mr-1" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Safety Disclaimer */}
      <p className="text-xs text-gray-500 text-center">
        ⚠ For clinical decision support only. Not a substitute for professional medical judgment.
      </p>
    </div>
  );
}
 