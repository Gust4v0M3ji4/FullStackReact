import { createFileRoute } from "@tanstack/react-router";

import "../App.css";
import Candidate from "@/components/Candidate";

export const Route = createFileRoute("/")({
  component: App,
});
type Status = "Pending" | "Reviewing" | "Interviewing" | "Hired" | "Refused";

interface CandidateData {
  name: string;
  age: number;
  experience: number;
  status: Status;
  skills: string[];
  working: boolean;
}

// ...existing code...
interface CandidateData {
  name: string;
  age: number;
  experience: number;
  status: Status;
  skills: string[];
  working: boolean;
}
function App() {
  const candidate1: CandidateData = {
    name: "Gustavo Mejia",
    age: 19,
    experience: 1,
    status: "Pending",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "HTML",
      "CSS",
      "Unity",
      "SQL",
      "Python",
    ],
    working: true,
  };

  const candidate2: CandidateData = {
    name: "Jane Smith",
    age: 28,
    experience: 3,
    status: "Reviewing",
    skills: ["TypeScript", "Vue", "CSS"],
    working: false,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-6">
      <Candidate data={candidate1} />
      <Candidate data={candidate2} />
    </div>
  );
}
