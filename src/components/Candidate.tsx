import type { CandidateType } from "@/types/candidates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

type CandidateProps = CandidateType & {
  children?: React.ReactNode;
};

const Candidate = (props: CandidateProps) => {
  const { name, age, experience, skills, status, working } = props;

  return (
    <div>
      <h2>Nombre: {name.toUpperCase() || "John Doe"}</h2>
      <p>Age: {age}</p>
      <p>Experience: {experience} years</p>
      <p>Skills: {skills.join(", ")}</p>
      <p>Status: {status}</p>
      <p>
        Working:{" "}
        {working ? (
          <>
            <FontAwesomeIcon icon={faCheckCircle} color="green" /> Sí
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faTimesCircle} color="red" /> No
          </>
        )}
        {/* // Use FontAwesome icons para simular lo de los mensajes de acuerdo al
        working, la imagen de check o no check */}
      </p>
      <p>Random Number: {randomNumber()}</p>
      {props.children}
    </div>
  );
  function randomNumber() {
    return Math.floor(Math.random() * 100);
  }
};

export default Candidate;
