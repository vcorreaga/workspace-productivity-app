import Swal from "sweetalert2";

function TaskCard({
  id,
  title,
  description,
  priority,
  dueDate,
  status,
  onComplete,
  onDelete,
  onEdit,
}) {

  const priorityStyles = {
    Alta: "bg-red-500/20 text-red-400",
    Media: "bg-yellow-500/20 text-yellow-400",
    Baja: "bg-green-500/20 text-green-400",
  };

  const today = new Date();
  const taskDate = new Date(dueDate);

  const isOverdue =
    taskDate < today &&
    status !== "Completada";

  const handleDelete = () => {

    Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#0f172a",
      color: "#ffffff",
    }).then((result) => {

      if (result.isConfirmed) {

        onDelete(id);

        Swal.fire({
          title: "Eliminada",
          text: "La tarea fue eliminada correctamente.",
          icon: "success",
          confirmButtonColor: "#84cc16",
          background: "#0f172a",
          color: "#ffffff",
        });

      }

    });

  };

  return (

    <div
      className={`border rounded-2xl p-5 transition-all ${
        status === "Completada"
          ? "bg-lime-500/10 border-lime-500"
          : "bg-slate-800 border-slate-700"
      }`}
    >

      <div className="flex items-start justify-between">

        <div>

          <h3
            className={`text-lg font-semibold ${
              status === "Completada"
                ? "line-through text-slate-500"
                : "text-white"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-sm mt-2 ${
              status === "Completada"
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            {description}
          </p>

          <div className="mt-4 space-y-2">

            <p className="text-xs text-slate-500">
              Fecha límite: {dueDate}
            </p>

            {isOverdue && (

              <div className="bg-red-500/10 border border-red-500 rounded-xl p-3">

                <p className="text-red-400 text-xs font-medium">
                  ⚠ Esta tarea está atrasada.
                </p>

                <p className="text-slate-400 text-xs mt-1">
                  ¿Qué necesitas para completarla?
                </p>

              </div>

            )}

          </div>

        </div>

        <span
          className={`${priorityStyles[priority]} text-xs px-3 py-1 rounded-full`}
        >
          {priority}
        </span>

      </div>

      <div className="flex items-center justify-between mt-6">

        <span className="text-sm text-slate-500">
          {status}
        </span>

        <div className="flex gap-4">

          <button
            onClick={() => onEdit({
              id,
              title,
              description,
              priority,
              dueDate,
              status,
            })}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Editar
          </button>

          <button
            onClick={() => onComplete(id)}
            disabled={status === "Completada"}
            className={`text-sm ${
              status === "Completada"
                ? "text-slate-500 cursor-not-allowed"
                : "text-lime-400 hover:text-lime-300"
            }`}
          >
            {status === "Completada"
              ? "Completada"
              : "Completar"}
          </button>

          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>

  );
}

export default TaskCard;