import { useNavigate } from "@tanstack/react-router";

export const AddEventButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate({ to: "/form/$id", params: { id: "new" } })}
      className="ml-4 py-[0.5rem] px-[1rem] bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600"
    >
      Add Event
    </button>
  );
};
