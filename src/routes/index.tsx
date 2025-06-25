import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import Candidate from "../components/Candidate";
import type { CandidateType } from "@/types/candidates";

export const Route = createFileRoute("/")({
  component: App,
});

// Debe ser CandidateType[]
const candidates: CandidateType[] = [
  {
    name: "Gustavo Mejia",
    age: 19,
    experience: 1,
    skills: ["Typescript", "ReactJS", "NodeJS", "HTML", "CSS", "Unity", "SQL"],
    status: "Reviewing",
    working: true,
  },
];

function App() {
  return (
    <div className="App">
      <h1>Mi primer proyecto ReactJS</h1>
      {candidates.map((candidate) => (
        <Candidate key={candidate.name} {...candidate}>
          <p>Additional content can go here.</p>
        </Candidate>
      ))}
    </div>
  );
}
