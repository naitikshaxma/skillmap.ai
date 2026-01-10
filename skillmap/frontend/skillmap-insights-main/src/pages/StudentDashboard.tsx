import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeshGradient from "@/components/MeshGradient";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  Target,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

const jobRoles = [
  'Backend Developer',
'Data Analyst',
'Frontend Developer',
'ML Engineer',
'Software Engineer',
'Backend Developer',
'Data Analyst',
'Frontend Developer',
'ML Engineer',
'Software Engineer',
'Backend Developer',
'Data Analyst',
'Frontend Developer',
'ML Engineer',
'Software Engineer',
'Backend Developer',
'Data Analyst',
'Frontend Developer',
'ML Engineer',
'Software Engineer'
];
const uniqueJobRoles = Array.from(new Set(jobRoles));


type ResultType = {
  skill_gap_score: number;
  matched_skills?: string[];
  missing_skills?: string[];
};

const StudentDashboard = () => {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

  const handleAnalyze = async () => {
    if (!file || !selectedRole) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_role", selectedRole);

    try {
      const res = await fetch("http://localhost:8000/skill-gap/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      setIsAnalyzed(true);
    } catch (err) {
      console.error("Analysis failed:", err);
      alert("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <MeshGradient />
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Skill Gap Analysis
            </h1>
          </div>

          {!isAnalyzed ? (
            <div className="mx-auto max-w-2xl">
              <div className="card-elevated rounded-xl border-2 border-dashed border-primary/30 bg-card p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>

                <input
                  type="file"
                  id="resumeInput"
                  accept=".pdf,.docx"
                  hidden
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />

                <Button
                  size="lg"
                  type="button"
                  onClick={() =>
                    document.getElementById("resumeInput")?.click()
                  }
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {file ? file.name : "Select Resume"}
                </Button>
              </div>

              <div className="mt-6 card-elevated rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Select Job Role
                  </h3>
                </div>

                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Select a job role..." />
                  </SelectTrigger>
                  <SelectContent>
  {uniqueJobRoles.map((role) => (
    <SelectItem key={role} value={role}>
      {role}
    </SelectItem>
  ))}
</SelectContent>

                </Select>
              </div>

              <div className="mt-6 text-center">
                <Button
                  size="lg"
                  disabled={!file || !selectedRole || loading}
                  onClick={handleAnalyze}
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </div>
          ) : (
            isAnalyzed &&
            result && (
              <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">
                    Skill Gap Analysis Results
                  </h2>
                  <p className="mt-2 text-lg text-primary font-medium">
                    for {selectedRole}
                  </p>
                </div>

                <div className="mb-8 card-elevated rounded-xl border border-border bg-card p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Target className="h-7 w-7 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">
                        Skill Match Score
                      </h3>
                    </div>
                    <div className="text-5xl font-bold text-primary">
                      {result.skill_gap_score ?? 0}%
                    </div>
                  </div>
                  <Progress value={result.skill_gap_score ?? 0} className="h-3" />
                </div>

                <div className="card-elevated rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Missing Skills
                    </h3>
                  </div>

                  {result.missing_skills && result.missing_skills.length > 0 ? (
                    result.missing_skills.map((s, i) => (
                      <div key={i} className="p-2">
                        {s}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No missing skills found 🎉
                    </p>
                  )}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAnalyzed(false);
                      setResult(null);
                      setFile(null);
                      setSelectedRole("");
                    }}
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentDashboard;


