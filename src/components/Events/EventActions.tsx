import { useNavigate } from "@tanstack/react-router";
import { Trash2, Pencil } from "lucide-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import type { EventType } from "@/types/event";

interface EventActionsProps {
  event: EventType;
  onDelete: (id: string) => void;
}

export const EventActions = ({ event, onDelete }: EventActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center">
      <Tooltip>
        <div className="group relative flex items-center justify-center">
          <button
            className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600 transition"
            onClick={() =>
              navigate({ to: "/form/$id", params: { id: event.id } })
            }
          >
            <Pencil size={18} />
          </button>
          <div className="absolute bottom-full mb-1 text-xs text-white bg-indigo-600 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Editar
          </div>
        </div>
      </Tooltip>

      <Tooltip>
        <div className="group relative flex items-center justify-center">
          <button
            className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
            onClick={() => onDelete(event.id)}
          >
            <Trash2 size={18} />
          </button>
          <div className="absolute bottom-full mb-1 text-xs text-white bg-red-600 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Eliminar
          </div>
        </div>
      </Tooltip>
    </div>
  );
};
