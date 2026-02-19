export default function SafetyLimitations() {
  const items = [
    {
      title: "Clinical Safety Notice",
      text: "PharmaGuard is intended for use by licensed healthcare professionals and carries limitations inherent to pharmacogenomic science.",
    },
    {
      title: "For Clinical Decision Support Only",
      text: "Designed to assist — not replace — clinical judgment.",
    },
    {
      title: "Not a Substitute for Medical Advice",
      text: "Patients must consult physicians before altering medication.",
    },
    {
      title: "Based on Pharmacogenomic Guidelines",
      text: "Recommendations follow CPIC, DPWG, and FDA biomarker guidance.",
    },
    {
      title: "Interaction Detection Limitations",
      text: "Analysis is limited to curated gene–drug interaction datasets.",
    },
    {
      title: "Results Require Professional Review",
      text: "Results should be reviewed by qualified pharmacogenomics specialists.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">Safety & Limitations</h1>
        <p className="text-muted-foreground">
          Important notices for healthcare professionals and patients.
        </p>
      </div>

      {items.map((item, i) => (
        <div key={i} className="border rounded-xl p-5 bg-white shadow-sm">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
        </div>
      ))}

      <div className="bg-muted p-4 rounded-lg text-xs text-muted-foreground">
        PharmaGuard Demo Build — simulated analysis for demonstration only.
      </div>
    </div>
  );
}
