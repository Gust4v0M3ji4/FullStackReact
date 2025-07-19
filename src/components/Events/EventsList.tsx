// EventList.tsx
import { cn } from "@/lib/utils";
import type { EventType } from "@/types/event";
import { useNavigate } from "@tanstack/react-router";
import { Tooltip } from "react-tooltip";
import { FaEdit } from "react-icons/fa";

type EventProps = {
  data: EventType;
  onDelete?: (id: string) => void;
};

function getAmoutColor(s: string) {
  switch (s) {
    case "Ingreso":
      return "text-green-500";
    case "Egreso":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export const EventList = (props: EventProps) => {
  const { id, name, description, amount, date, type, image, category } =
    props.data;

  const tooltipId = `event-description-${id}`;
  const navigate = useNavigate();

  return (
    <div>
      <div
        id={tooltipId}
        className="p-[0.5rem] rounded-md flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-700 "
      >
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm text-gray-700">{name}</span>
          <span className="text-xs text-gray-500">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className={cn("text-sm", getAmoutColor(type))}>${amount}</span>

          <button
            onClick={() => navigate({ to: "/form/$id", params: { id } })}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            aria-label="Editar"
          >
            <FaEdit />
          </button>
        </div>
      </div>

      <Tooltip
        anchorSelect={`#${tooltipId}`}
        place="bottom-start"
        render={() => (
          <div className="max-w-[250px] space-y-2 p-2">
            <p className="text-sm font-semibold">{description}</p>
            {category && (
              <p className="text-xs text-gray-500">
                Categoría: <span className="italic">{category}</span>
              </p>
            )}
            {image && (
              <img
                src={image}
                alt="Event"
                className="w-full h-auto rounded shadow-md mt-2"
              />
            )}
          </div>
        )}
      />
    </div>
  );
};
