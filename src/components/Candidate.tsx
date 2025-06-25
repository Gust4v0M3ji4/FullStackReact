import type { CandidateType } from "@/types/Candidate";

import { cn } from "@/lib/utils";

type CandidateProps = {
  data: CandidateType;
};

const Candidate = (props: CandidateProps) => {
  const { name, age, experience, status, skills, working } = props.data;

  return (
    <article className="border border-gray-300 rounded-lg p-4 shadow-md   bg-white w-full max-w-md ">
      <div className="flex items-center mb-4 gap-4 justify-between">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p
          className={cn(
            "text-white text-sm font-semibold px-2 py-1 rounded-full",
            getStatusColor(status)
          )}
        >
          {status}
        </p>
      </div>
      <p className="text-gray-600 gap-2">Age: {age}</p>
      <p className="text-gray-600 gap-2">Experience: {experience} years</p>

      {working && <p className="text-green-500 gap-2">Currently working</p>}
      {!working && <p className="text-red-500 gap-2">Not currently working</p>}

      <h3 className="text-lg font-semibold text-gray-800 mt-2 ">Skills:</h3>
      <ul className="list-disc pl-5 mt-1">
        {skills.map((skill, index) => (
          <li className="text-gray-600 text-sm gap-2" key={index}>
            {skill}
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors max-w-xs"
          onClick={copyData}
        >
          Copy data
        </button>
      </div>
    </article>
  );

  function copyData() {
    const textToCopy = `Name: ${name}, Status: ${status}, Working: ${working}, Age: ${age}, Experience: ${experience}, Skills: ${skills.join(
      ", "
    )}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Data copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  }

  function getStatusColor(s: string) {
    switch (s) {
      case "Pending":
        return "bg-yellow-500";
      case "Reviewing":
        return "bg-blue-500";
      case "Accepted":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }
};

export default Candidate;
