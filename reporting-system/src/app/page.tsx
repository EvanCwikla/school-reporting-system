import ReportForm from '@/components/ReportForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-blue-900">
          SafeSchool Reporting
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto text-balance">
          Your safety is our priority. Use this secure, confidential system to 
          report concerns directly to school administration.
        </p>
      </div>

      {/* This pulls in the form we created earlier */}
      <ReportForm />

      <footer className="mt-16 text-center text-slate-500 text-sm border-t border-slate-200 pt-8 max-w-2xl mx-auto">
        <p className="font-medium">© 2026 SafeSchool Initiative</p>
        <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 inline-block shadow-sm">
          <p className="text-red-600 font-bold uppercase tracking-wide text-xs mb-1">Emergency</p>
          <p className="text-slate-700">If there is immediate danger, call <strong>911</strong> or local emergency services.</p>
        </div>
      </footer>
    </main>
  );
}