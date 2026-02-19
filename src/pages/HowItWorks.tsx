export default function HowItWorks() {
  const steps = [
    {
      title: "Upload VCF",
      text: "Patient's genetic variant data is uploaded securely.",
    },
    {
      title: "Detect Variants",
      text: "Clinically relevant SNPs and alleles are identified.",
    },
    {
      title: "Evaluate Gene Impact",
      text: "Phenotype classification is assigned per gene.",
    },
    {
      title: "Check Interactions",
      text: "Co-medication risks are cross-referenced.",
    },
    {
      title: "Generate Recommendations",
      text: "Clinical guidance is produced per CPIC guidelines.",
    },
  ];

  const genes = [
    ["CYP2D6", "Metabolizes ~25% of all drugs including opioids & antidepressants"],
    ["CYP2C19", "Key enzyme for antiplatelet drugs & PPIs"],
    ["CYP2C9", "Metabolizes warfarin, NSAIDs, antiepileptics"],
    ["SLCO1B1", "Transporter affecting statin metabolism"],
    ["TPMT", "Determines safe dosing for thiopurines"],
    ["DPYD", "Critical for fluoropyrimidine safety"],
  ];

  const risks = [
    ["Safe", "Standard dosing is appropriate."],
    ["Adjust Dosage", "Dose modification recommended."],
    ["Toxic", "High risk of adverse drug reaction."],
    ["Ineffective", "Poor therapeutic response predicted."],
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">

      {/* Intro */}
      <div>
        <h1 className="text-2xl font-bold">How It Works</h1>
        <p className="text-muted-foreground mt-1">
          Understanding the science behind PharmaGuard.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="border rounded-xl p-5 bg-white shadow-sm">
            <span className="text-sm font-semibold text-primary">0{i+1}</span>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>

      {/* Genes */}
      <div>
        <h2 className="font-semibold mb-4">Genes Analyzed</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {genes.map(([g, d]) => (
            <div key={g} className="border rounded-lg p-4 bg-white shadow-sm">
              <span className="font-mono text-primary font-semibold">{g}</span>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Categories */}
       (
  <div className="space-y-10">

    {/* Risk Categories */}
    <div>
      <h2 className="font-semibold mb-4">Risk Categories</h2>

      <div className="grid sm:grid-cols-2 gap-4">

        <div className="border rounded-lg p-4 shadow-sm bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-700">Safe</h4>
          <p className="text-sm text-green-800">
            Standard dosing is appropriate.
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm bg-yellow-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-700">Adjust Dosage</h4>
          <p className="text-sm text-yellow-800">
            Dose modification recommended.
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm bg-red-50 border-red-200">
          <h4 className="font-semibold text-red-700">Toxic</h4>
          <p className="text-sm text-red-800">
            High risk of adverse drug reaction.
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-700">Ineffective</h4>
          <p className="text-sm text-blue-800">
            Poor therapeutic response predicted.
          </p>
        </div>

      </div>
    </div>

  </div>
   </div>
  );
}