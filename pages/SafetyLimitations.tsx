import { ShieldAlert, AlertTriangle, BookOpen, Users, Database, Stethoscope } from "lucide-react";

const notices = [
  {
    icon: Stethoscope,
    title: "For Clinical Decision Support Only",
    body: "PharmaGuard is designed to assist — not replace — clinical judgment. All pharmacogenomic findings must be interpreted within the context of the patient's full clinical picture by a qualified healthcare professional.",
  },
  {
    icon: Users,
    title: "Not a Substitute for Professional Medical Advice",
    body: "This tool does not constitute medical advice, diagnosis, or treatment. Patients should not alter their medication regimen based on PharmaGuard output without consulting their physician or pharmacist.",
  },
  {
    icon: BookOpen,
    title: "Based on Pharmacogenomic Guidelines",
    body: "Recommendations are generated using published guidelines from CPIC (Clinical Pharmacogenomics Implementation Consortium), DPWG, and FDA pharmacogenomic biomarker labeling. Guideline evidence levels vary by gene-drug pair.",
  },
  {
    icon: Database,
    title: "Interaction Detection Limited to Supported Dataset",
    body: "Drug interaction analysis is limited to the current curated gene-drug interaction database. Novel variants of uncertain significance (VUS), rare alleles, and off-label interactions may not be captured.",
  },
  {
    icon: AlertTriangle,
    title: "Results Require Professional Review",
    body: "Pharmacogenomic results can be influenced by ethnicity, gene-gene interactions, epigenetic factors, and comorbidities. All results should be reviewed by a clinical pharmacogenomics specialist or a board-certified pharmacist.",
  },
];

export default function SafetyLimitations() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Safety & Limitations</h1>
        <p className="text-sm text-muted-foreground">
          Important notices for healthcare professionals and patients using PharmaGuard.
        </p>
      </div>

      {/* Main safety banner */}
      <div className="flex items-start gap-4 px-5 py-4 bg-clinical-warning-bg border border-clinical-warning-border rounded-xl">
        <ShieldAlert className="w-6 h-6 text-clinical-warning flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Clinical Safety Notice</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            PharmaGuard is intended for use by licensed healthcare professionals in a clinical
            setting. This tool is a decision support aid and carries all the limitations inherent to
            current pharmacogenomic science and data coverage.
          </p>
        </div>
      </div>

      {/* Notices */}
      <div className="space-y-3">
        {notices.map((notice, i) => {
          const Icon = notice.icon;
          return (
            <div
              key={i}
              className="bg-card rounded-xl border border-border shadow-card p-5 space-y-2 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <h2 className="text-sm font-semibold text-foreground">{notice.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-9">{notice.body}</p>
            </div>
          );
        })}
      </div>

      {/* Version notice */}
      <div className="px-5 py-4 bg-muted/50 rounded-xl border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">PharmaGuard v1.0 · Demo Build</span> ·
          This interface uses simulated analysis for demonstration purposes only. In a production
          clinical deployment, VCF analysis would be performed server-side using validated
          bioinformatics pipelines against a certified pharmacogenomic knowledge base. No patient
          data is transmitted or stored in this demo.
        </p>
      </div>
    </div>
  );
}
