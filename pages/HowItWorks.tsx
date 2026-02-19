import { ArrowRight, Dna, Search, FlaskConical, Pill, ClipboardList, CheckCircle, AlertTriangle, XCircle, TrendingDown } from "lucide-react";

const genes = [
  { name: "CYP2D6", desc: "Metabolizes ~25% of all drugs including opioids, antidepressants, antipsychotics" },
  { name: "CYP2C19", desc: "Key enzyme for antiplatelet drugs, PPIs, and antidepressants" },
  { name: "CYP2C9", desc: "Metabolizes warfarin, NSAIDs, and several antiepileptics" },
  { name: "SLCO1B1", desc: "Hepatic statin transporter; variants linked to myopathy risk" },
  { name: "TPMT", desc: "Thiopurine methyltransferase; determines safe dosing for azathioprine" },
  { name: "DPYD", desc: "Dihydropyrimidine dehydrogenase; critical for fluoropyrimidine safety" },
];

const steps = [
  { icon: ArrowRight, step: "01", label: "Upload VCF", desc: "Patient's genetic variant data is uploaded securely." },
  { icon: Search, step: "02", label: "Detect Variants", desc: "Clinically relevant SNPs and alleles are identified." },
  { icon: Dna, step: "03", label: "Evaluate Gene Impact", desc: "Phenotype classification is assigned per gene." },
  { icon: FlaskConical, step: "04", label: "Check Interactions", desc: "Co-medication risks are cross-referenced." },
  { icon: ClipboardList, step: "05", label: "Generate Recommendations", desc: "Clinical guidance is produced per CPIC guidelines." },
];

const riskCategories = [
  {
    icon: CheckCircle,
    label: "Safe",
    color: "text-clinical-safe",
    bg: "bg-clinical-safe-bg border-clinical-safe-border",
    desc: "Standard dosing is appropriate. No significant pharmacogenomic risk detected.",
  },
  {
    icon: AlertTriangle,
    label: "Adjust Dosage",
    color: "text-clinical-warning",
    bg: "bg-clinical-warning-bg border-clinical-warning-border",
    desc: "Genetic variant affects drug metabolism. Dose modification is recommended.",
  },
  {
    icon: XCircle,
    label: "Toxic",
    color: "text-clinical-toxic",
    bg: "bg-clinical-toxic-bg border-clinical-toxic-border",
    desc: "High risk of adverse drug reaction at standard dosing. Drug may be contraindicated.",
  },
  {
    icon: TrendingDown,
    label: "Ineffective",
    color: "text-clinical-ineffective",
    bg: "bg-clinical-ineffective-bg border-clinical-ineffective-border",
    desc: "Genetic profile predicts poor therapeutic response. Alternative therapy recommended.",
  },
];

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">How It Works</h1>
        <p className="text-sm text-muted-foreground">
          Understanding the science and methodology behind PharmaGuard.
        </p>
      </div>

      {/* What is Pharmacogenomics */}
      <div className="bg-card rounded-xl border border-border shadow-card p-6 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
            <Dna className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-semibold text-foreground">What is Pharmacogenomics?</h2>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          Pharmacogenomics is the study of how an individual's genetic makeup affects their response
          to medications. Genetic variants in drug-metabolizing enzymes, transporters, and receptors
          can significantly alter a drug's efficacy or safety profile — causing some patients to
          experience toxicity while others receive no therapeutic benefit from the same standard dose.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          PharmaGuard analyzes Variant Call Format (VCF) files — a standardized genomic data format
          — to identify clinically actionable pharmacogenomic variants and translate them into
          concrete, guideline-based clinical recommendations.
        </p>
      </div>

      {/* Workflow */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">How PharmaGuard Works</h2>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-5 top-10 bottom-10 w-px bg-border hidden sm:block" />
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-card rounded-xl border border-border shadow-card p-4 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-light border border-primary-muted flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-primary">{step.step}</span>
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Genes Analyzed */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Genes Analyzed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {genes.map((gene) => (
            <div
              key={gene.name}
              className="flex items-start gap-3 bg-card rounded-xl border border-border p-4 shadow-sm-clinical"
            >
              <div className="flex-shrink-0 px-2 py-0.5 bg-primary-light rounded text-xs font-bold font-mono text-primary border border-primary-muted">
                {gene.name}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">{gene.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Categories */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Risk Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {riskCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.label}
                className={`flex items-start gap-3 rounded-xl border p-4 ${cat.bg}`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${cat.color}`} />
                <div>
                  <p className={`text-sm font-semibold ${cat.color}`}>{cat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
